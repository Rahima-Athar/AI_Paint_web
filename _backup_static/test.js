/**
 * WALLORA AI — COMPREHENSIVE AUTOMATED VERIFICATION SUITE
 * Validates file structure, Lavender Dream tokens, schema, and provider adapter.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Wallora AI Verification Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
  }
}

// 1. File Structure Verification
test('File Structure: Core application files exist', () => {
  const files = [
    'index.html',
    'style.css',
    'script.js',
    'package.json',
    '.env.example',
    'server.js',
    'src/types/index.ts',
    'src/services/imageEditingProvider.js',
    'api/generate.js',
    'supabase/migrations/20261103000000_wallora_schema.sql',
    'assets/presets/room_living_before.svg',
    'assets/presets/room_living_after.svg',
    'assets/presets/room_bedroom_before.svg',
    'assets/presets/room_dining_before.svg',
    'assets/presets/room_study_before.svg'
  ];

  files.forEach(f => {
    assert(fs.existsSync(path.join(__dirname, f)), `File ${f} must exist`);
    const stat = fs.statSync(path.join(__dirname, f));
    assert(stat.size > 0, `File ${f} must not be empty`);
  });
});

// 2. Lavender Dream Brand Tokens Verification in CSS
test('Brand Tokens: style.css contains exact Lavender Dream palette', () => {
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
  const tokens = ['#74608F', '#B7A1CF', '#D9B8CE', '#E9D9E9', '#F7F0EB', '#C3A77D'];
  tokens.forEach(token => {
    assert(css.toLowerCase().includes(token.toLowerCase()), `CSS must include token ${token}`);
  });
  assert(css.includes('Playfair Display'), 'CSS must specify Playfair Display font');
  assert(css.includes('Poppins'), 'CSS must specify Poppins font');
});

// 3. HTML Structure & Core Features Verification
test('HTML Structure: index.html contains all core architectural visualizer features', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert(html.includes('id="room-dropzone"'), 'Must have room photo dropzone');
  assert(html.includes('id="matter-canvas"'), 'Must have Anti-Gravity Matter.js physics canvas');
  assert(html.includes('id="comparison-viewport"'), 'Must have before/after comparison viewport');
  assert(html.includes('id="split-divider"'), 'Must have draggable split slider');
  assert(html.includes('id="lighting-mode-buttons"'), 'Must have lighting simulator bar');
  assert(html.includes('Morning Sun') && html.includes('Warm Evening') && html.includes('Studio Neutral'), 'Must have all 3 lighting modes');
  assert(html.includes('id="active-color-lrv"'), 'Must display LRV metric');
  assert(html.includes('id="dual-swatch-bar"'), 'Must have dual-tone accent wall bar');
  assert(html.includes('id="calculator-modal"'), 'Must have paint volume & budget calculator modal');
  assert(html.includes('id="brand-sw-code"'), 'Must display commercial paint manufacturer codes');
  assert(html.includes('id="print-spec-sheet"'), 'Must have printable client architectural spec sheet');
});

// 4. Provider Adapter Verification
test('Provider Adapter: DemoSimulationProvider executes cleanly with structured metadata', async () => {
  const { getImageEditingProvider } = require('./src/services/imageEditingProvider.js');
  const provider = getImageEditingProvider('demo');
  assert(provider.isConfigured() === true, 'Demo provider must always report configured');

  const result = await provider.generateWallRecolor({
    imageBufferOrUrl: 'data:image/svg+xml;base64,sample',
    colorName: 'Royal Lavender',
    colorHex: '#74608F',
    roomType: 'Living Room'
  });

  assert.strictEqual(result.provider, 'demo');
  assert.strictEqual(result.status, 'completed');
  assert(result.variantId.startsWith('var-demo-'));
});

// 5. Database Schema & RLS Policies Verification
test('Database Schema: Supabase migration contains all 6 required tables and RLS', () => {
  const sql = fs.readFileSync(path.join(__dirname, 'supabase/migrations/20261103000000_wallora_schema.sql'), 'utf8');
  const tables = ['profiles', 'projects', 'design_variants', 'palettes', 'palette_colors', 'favorites'];
  tables.forEach(t => {
    assert(sql.includes(`CREATE TABLE IF NOT EXISTS public.${t}`), `Schema must define ${t} table`);
  });
  assert(sql.includes('ENABLE ROW LEVEL SECURITY'), 'Schema must enable RLS');
  assert(sql.includes('#74608F'), 'Schema must seed Lavender Dream token');
});

console.log(`\nVerification Complete: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('🎉 ALL SYSTEM CHECKS PASSED SUCCESSFULLY!\n');
} else {
  process.exit(1);
}

