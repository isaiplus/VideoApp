const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleAIFileManager } = require('@google/generative-ai/server');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

// Get MIME type from file extension
const getMimeType = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  const mimeTypes = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo'
  };
  return mimeTypes[ext] || 'video/mp4';
};

// Wait for file to finish processing in the File API
const waitForFileActive = async (file) => {
  while (file.state === 'PROCESSING') {
    await new Promise(resolve => setTimeout(resolve, 2000));
    file = await fileManager.getFile(file.name);
  }
  if (file.state !== 'ACTIVE') {
    throw new Error(`File processing failed with state: ${file.state}`);
  }
  return file;
};

const analyzeVideo = async (videoPath, fileName) => {
  let uploadedFile = null;
  try {
    console.log(`Uploading video to Gemini File API: ${fileName}`);
    const mimeType = getMimeType(fileName);

    const uploadResult = await fileManager.uploadFile(videoPath, {
      mimeType,
      displayName: fileName
    });

    uploadedFile = uploadResult.file;
    console.log(`Upload complete, waiting for processing...`);
    uploadedFile = await waitForFileActive(uploadedFile);
    console.log(`File ready, running analysis...`);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert sports analyst specializing in video analysis. Analyze this video and provide:

1. SUMMARY: A brief overview of what's happening in the video
2. SUGGESTIONS: Specific, actionable improvement suggestions for the athletes/performers
3. KEY POINTS: The most important observations from the video
4. DETAILED ANALYSIS: An in-depth analysis of techniques, form, positioning, and performance metrics

Format your response with clear sections using these headers:
SUMMARY:
SUGGESTIONS:
KEY POINTS:
DETAILED ANALYSIS:

Be specific and technical in your analysis.`;

    const response = await model.generateContent([
      {
        fileData: {
          mimeType: uploadedFile.mimeType,
          fileUri: uploadedFile.uri
        }
      },
      prompt
    ]);

    const analysisText = response.response.text();

    // Delete the file from File API after analysis
    await fileManager.deleteFile(uploadedFile.name).catch(() => {});

    return {
      summary: extractSection(analysisText, 'SUMMARY'),
      suggestions: extractSection(analysisText, 'SUGGESTIONS'),
      keyPoints: extractSection(analysisText, 'KEY POINTS'),
      detailedAnalysis: extractSection(analysisText, 'DETAILED ANALYSIS')
    };

  } catch (error) {
    if (uploadedFile) {
      await fileManager.deleteFile(uploadedFile.name).catch(() => {});
    }
    console.error('Gemini API error:', error);
    throw new Error(`Video analysis failed: ${error.message}`);
  }
};

const getCustomAnalysis = async (userInput, previousAnalysis) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Based on this previous video analysis:

SUMMARY: ${previousAnalysis.summary || 'Not provided'}
SUGGESTIONS: ${previousAnalysis.suggestions || 'Not provided'}
KEY POINTS: ${previousAnalysis.keyPoints || 'Not provided'}
DETAILED ANALYSIS: ${previousAnalysis.detailedAnalysis || 'Not provided'}

The user is asking: "${userInput}"

Provide a detailed response that addresses their specific question or request. Be specific and actionable.`;

    const response = await model.generateContent(prompt);
    return response.response.text();

  } catch (error) {
    console.error('Custom analysis error:', error);
    throw new Error(`Custom analysis failed: ${error.message}`);
  }
};

// Helper function to extract sections from response
const extractSection = (text, sectionName) => {
  const regex = new RegExp(`${sectionName}:(.+?)(?=(?:SUMMARY:|SUGGESTIONS:|KEY POINTS:|DETAILED ANALYSIS:|$))`, 's');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

module.exports = {
  analyzeVideo,
  getCustomAnalysis
};
