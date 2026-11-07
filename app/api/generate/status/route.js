import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing prediction id.' }, { status: 400 });

  const provider = process.env.IMAGE_EDITING_PROVIDER || 'demo';
  if (provider !== 'replicate') {
    return NextResponse.json({ success: true, status: 'completed', provider, message: 'Status polling applies to async Replicate predictions.' });
  }

  const apiKey = process.env.IMAGE_EDITING_API_KEY;
  if (!apiKey) return NextResponse.json({ success: false, error: 'Server provider key is not configured.' }, { status: 500 });

  try {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ success: false, error: 'Provider status request failed.', detail: err.slice(0, 200) }, { status: 502 });
    }
    const prediction = await res.json();
    const output = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output || null;
    return NextResponse.json({
      success: true,
      id: prediction.id,
      status: prediction.status,
      provider: 'replicate',
      resultImageUrl: prediction.status === 'succeeded' ? output : null,
      error: prediction.error || null,
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Unable to fetch prediction status.' }, { status: 500 });
  }
}
