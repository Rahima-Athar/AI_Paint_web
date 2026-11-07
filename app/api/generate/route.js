import { NextResponse } from 'next/server';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { getImageEditingProvider } = require('../../../src/services/imageEditingProvider');

export const maxDuration = 120;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { imageBufferOrUrl, colorName, colorHex, roomType, mood, finish, lightingMode } = body || {};

    if (!imageBufferOrUrl) {
      return NextResponse.json({ success: false, error: 'Missing required room image.' }, { status: 400 });
    }
    if (!colorHex || !/^#[0-9A-Fa-f]{6}$/.test(colorHex)) {
      return NextResponse.json({ success: false, error: 'Invalid HEX color format. Expected #RRGGBB.' }, { status: 400 });
    }
    if (!colorName) {
      return NextResponse.json({ success: false, error: 'Missing color name.' }, { status: 400 });
    }

    const providerChoice = process.env.IMAGE_EDITING_PROVIDER || 'demo';
    // API key is read server-side only; never accept it from the client.
    const provider = getImageEditingProvider(providerChoice, process.env.IMAGE_EDITING_API_KEY);

    const result = await provider.generateWallRecolor({
      imageBufferOrUrl,
      colorName,
      colorHex,
      roomType: roomType || 'Living Room',
      mood: mood || 'Luxury',
      finish: finish || 'Eggshell',
      lightingMode: lightingMode || 'morning',
    });

    return NextResponse.json({ success: true, variant: result, provider: result.provider, status: result.status });
  } catch (error) {
    console.error('Server Inpainting Error:', error?.message || error);
    return NextResponse.json(
      { success: false, error: 'AI wall inpainting encountered a processing error. Demo mode remains available.', code: 'PROVIDER_ERROR' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/generate', provider: process.env.IMAGE_EDITING_PROVIDER || 'demo' });
}
