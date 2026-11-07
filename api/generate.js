/**
 * WALLORA AI — SERVERLESS INPAINTING API ROUTE CONTRACT
 * Handles: POST /api/generate
 * Conforms to Master Brief (Section 8)
 */

const { getImageEditingProvider } = require('../src/services/imageEditingProvider');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { 
      projectId, 
      imageBufferOrUrl, 
      colorName, 
      colorHex, 
      roomType, 
      mood, 
      finish, 
      lightingMode 
    } = req.body;

    // 1. Strict Input Validation (Section 7.1 & 8)
    if (!imageBufferOrUrl) {
      return res.status(400).json({ error: 'Missing required room image.' });
    }
    if (!colorHex || !/^#[0-9A-Fa-f]{6}$/.test(colorHex)) {
      return res.status(400).json({ error: 'Invalid HEX color format. Expected #RRGGBB.' });
    }
    if (!colorName) {
      return res.status(400).json({ error: 'Missing color name.' });
    }

    const providerChoice = process.env.IMAGE_EDITING_PROVIDER || 'demo';
    const apiKey = process.env.IMAGE_EDITING_API_KEY;

    // 2. Obtain Provider Adapter
    const provider = getImageEditingProvider(providerChoice, apiKey);

    // 3. Execute Recolor Inpainting
    const result = await provider.generateWallRecolor({
      imageBufferOrUrl,
      colorName,
      colorHex,
      roomType: roomType || 'Living Room',
      mood: mood || 'Luxury',
      finish: finish || 'Eggshell',
      lightingMode: lightingMode || 'morning'
    });

    return res.status(200).json({
      success: true,
      variant: result
    });
  } catch (error) {
    console.error('Server Inpainting Error:', error.message);
    // Never expose API secrets or internal traces (Section 8.1 & 9)
    return res.status(500).json({
      success: false,
      error: 'AI wall inpainting encountered a transient processing error.',
      code: 'PROVIDER_ERROR'
    });
  }
};

