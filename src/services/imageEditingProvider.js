/**
 * WALLORA AI — AI IMAGE EDITING PROVIDER ADAPTER
 * Demo mode is an explicit client-safe simulation contract; remote providers use server-side API keys only.
 */

class DemoSimulationProvider {
  constructor() {
    this.name = 'demo';
    this.label = 'Interactive Studio Simulation Adapter (Demo Mode)';
  }

  isConfigured() {
    return true;
  }

  async generateWallRecolor(request) {
    const startTime = Date.now();
    return {
      variantId: 'var-demo-' + Date.now(),
      resultImageUrl: request.imageBufferOrUrl || null,
      provider: 'demo',
      status: 'completed',
      metadata: {
        latencyMs: Date.now() - startTime,
        model: 'ClientLuminosityShader-v1',
        notice: 'Demo Mode simulation. No external AI image was generated; the client applies a luminance-preserving recolor preview.',
      },
    };
  }
}

async function pollReplicatePrediction({ id, apiKey, timeoutMs = 90000, intervalMs = 1500 }) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Replicate polling error: ${err}`);
    }
    const prediction = await res.json();
    if (prediction.status === 'succeeded') return prediction;
    if (prediction.status === 'failed' || prediction.status === 'canceled') {
      throw new Error(prediction.error || `Replicate prediction ${prediction.status}`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error('Replicate prediction timed out.');
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
      throw new Error('Replicate API key is missing on the server. Set IMAGE_EDITING_API_KEY.');
    }

    const prompt = `A realistic interior photograph of a ${request.roomType || 'room'}. Visible walls are repainted in ${request.colorName}, paint hex code ${request.colorHex}. Preserve architectural depth, crown moldings, floors, furniture, windows, shadows, and natural lighting. High-end architectural interior photography.`;
    const negativePrompt = 'blurry, distorted furniture, altered room layout, changing windows, unrealistic lighting, cartoon, illustration, text artifacts';

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        input: {
          image: request.imageBufferOrUrl,
          prompt,
          negative_prompt: negativePrompt,
          prompt_strength: 0.65,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Replicate API Error: ${err}`);
    }

    let prediction = await response.json();
    if (prediction.status !== 'succeeded') {
      prediction = await pollReplicatePrediction({ id: prediction.id, apiKey: this.apiKey });
    }

    const output = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
    if (!output) throw new Error('Replicate returned no output image.');

    return {
      variantId: prediction.id,
      resultImageUrl: output,
      provider: 'replicate',
      status: 'completed',
      metadata: { predictionId: prediction.id, model: prediction.version },
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
      throw new Error('Stability AI API key is missing on the server. Set IMAGE_EDITING_API_KEY.');
    }
    const prompt = `Repaint visible walls to ${request.colorName} ${request.colorHex}. Preserve floors, furniture, windows, shadows, and lighting.`;
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/inpaint', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt, weight: 1.0 }, { text: 'blurry, deformed, cartoon', weight: -1.0 }],
        init_image: request.imageBufferOrUrl,
      }),
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Stability AI Error: ${err}`);
    }
    const data = await response.json();
    const base64Image = data?.artifacts?.[0]?.base64;
    if (!base64Image) throw new Error('Stability AI returned no image artifact.');
    return {
      variantId: 'stab-' + Date.now(),
      resultImageUrl: `data:image/png;base64,${base64Image}`,
      provider: 'stability',
      status: 'completed',
      metadata: { seed: data.artifacts[0].seed },
    };
  }
}

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
    StabilityAIProvider,
    pollReplicatePrediction,
  };
}
