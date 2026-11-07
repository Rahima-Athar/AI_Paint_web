/**
 * WALLORA AI — AI IMAGE EDITING PROVIDER ADAPTER
 * Supports Demo Studio Simulation, Replicate (SDXL Inpainting), and Stability AI.
 * Follows Wallora AI Master Brief (Sections 3, 6, 8, 20).
 */

class DemoSimulationProvider {
  constructor() {
    this.name = 'demo';
    this.label = 'Interactive Studio Simulation Adapter (Client-Side)';
  }

  isConfigured() {
    return true; // Always available as graceful offline fallback
  }

  async generateWallRecolor(request) {
    // Return structured response with honest demo metadata
    const startTime = Date.now();
    // Simulate natural processing delay for tactile feel
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      variantId: 'var-demo-' + Date.now(),
      resultImageUrl: request.imageBufferOrUrl, // Client canvas shader applies luminance blend
      provider: 'demo',
      status: 'completed',
      metadata: {
        latencyMs: Date.now() - startTime,
        model: 'ClientLuminosityShader-v1',
        notice: 'Rendered via non-destructive client luminance shader.'
      }
    };
  }
}

class ReplicateInpaintingProvider {
  constructor(apiKey) {
    this.name = 'replicate';
    this.label = 'Replicate SDXL Inpainting Provider';
    this.apiKey = apiKey || process.env.IMAGE_EDITING_API_KEY;
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  async generateWallRecolor(request) {
    if (!this.isConfigured()) {
      throw new Error('Replicate API key is missing. Falling back to Demo Studio mode.');
    }

    const prompt = `A realistic interior photograph of a ${request.roomType || 'room'}. Visible walls are repainted in ${request.colorName}, paint hex code ${request.colorHex}. Architectural depth, crown moldings, wood floors, furniture, shadows, natural window lighting preserved precisely. High-end luxury architectural interior photography, 8k.`;
    const negativePrompt = 'blurry, distorted furniture, altered room layout, changing windows, unrealistic lighting, cartoon, illustration';

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        input: {
          image: request.imageBufferOrUrl,
          prompt: prompt,
          negative_prompt: negativePrompt,
          prompt_strength: 0.65
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Replicate API Error: ${err}`);
    }

    const prediction = await response.json();
    return {
      variantId: prediction.id,
      resultImageUrl: prediction.output ? prediction.output[0] : null,
      provider: 'replicate',
      status: prediction.status === 'succeeded' ? 'completed' : 'processing',
      metadata: { predictionId: prediction.id }
    };
  }
}

class StabilityAIProvider {
  constructor(apiKey) {
    this.name = 'stability';
    this.label = 'Stability AI Inpainting Engine';
    this.apiKey = apiKey || process.env.IMAGE_EDITING_API_KEY;
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  async generateWallRecolor(request) {
    if (!this.isConfigured()) {
      throw new Error('Stability AI API key is missing.');
    }

    const prompt = `Repaint visible walls to ${request.colorName} ${request.colorHex}. Architectural photo, preserve floor, furniture, lighting.`;

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/inpaint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          { text: prompt, weight: 1.0 },
          { text: 'blurry, deformed, cartoon', weight: -1.0 }
        ],
        init_image: request.imageBufferOrUrl
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Stability AI Error: ${err}`);
    }

    const data = await response.json();
    const base64Image = data.artifacts[0].base64;

    return {
      variantId: 'stab-' + Date.now(),
      resultImageUrl: `data:image/png;base64,${base64Image}`,
      provider: 'stability',
      status: 'completed',
      metadata: { seed: data.artifacts[0].seed }
    };
  }
}

/**
 * Factory to get active provider adapter
 */
function getImageEditingProvider(providerName = 'demo', apiKey = null) {
  switch (providerName) {
    case 'replicate':
      return new ReplicateInpaintingProvider(apiKey);
    case 'stability':
      return new StabilityAIProvider(apiKey);
    case 'demo':
    default:
      return new DemoSimulationProvider();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getImageEditingProvider,
    DemoSimulationProvider,
    ReplicateInpaintingProvider,
    StabilityAIProvider
  };
}

