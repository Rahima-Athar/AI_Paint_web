/**
 * WALLORA AI — LUXURY ARCHITECTURAL ROOM PAINT VISUALIZER
 * Enhanced Script Engine:
 * - Spatial Web Audio Synthesizer (Crystal Chimes & Haptic Clicks)
 * - Dual-Tone Accent Wall & Feature Wall Engine
 * - Real-World Manufacturer Paint Codes (Sherwin-Williams, Benjamin Moore, Dulux, Farrow & Ball)
 * - Architectural Paint Volume & Budget Estimator
 * - Client Presentation Spec Sheet Generator (Printable to PDF)
 * - Mobile Gyroscope Zero-G Physics Interaction
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. ARCHITECTURAL COLOR CATALOG WITH REAL-WORLD MANUFACTURER MATCHES
  // =========================================================================
  const CURATED_COLORS = [
    // Lavender Dream Signature Collection
    { 
      id: 'c1', name: 'Royal Lavender', hex: '#74608F', rgb: '116, 96, 143', lrv: 28, mood: 'Luxury', category: 'Pastel', undertone: 'Cool Plum', desc: 'Introspective depth for statement feature walls and salons.',
      brands: { sw: 'SW 6544 Soulmate', bm: 'BM 1406 Lavender Mist', dulux: '30RB 16/144', fb: 'No. 270 Calluna' }
    },
    { 
      id: 'c2', name: 'Soft Lilac', hex: '#B7A1CF', rgb: '183, 161, 207', lrv: 52, mood: 'Calm', category: 'Pastel', undertone: 'Silken Violet', desc: 'Airy, meditative ambiance ideal for master suites and reading nooks.',
      brands: { sw: 'SW 6554 Respite', bm: 'BM 2116-40 Violet Mist', dulux: '50RB 34/153', fb: 'No. 286 Peignoir' }
    },
    { 
      id: 'c3', name: 'Dusty Rose', hex: '#D9B8CE', rgb: '217, 184, 206', lrv: 61, mood: 'Cozy', category: 'Warm', undertone: 'Warm Blush', desc: 'Romantic undertones that soften morning sunlight into an amber glow.',
      brands: { sw: 'SW 6023 Inspiring', bm: 'BM 1262 Cashmere Pink', dulux: '70RR 54/153', fb: 'No. 295 Sulking Room Pink' }
    },
    { 
      id: 'c4', name: 'Blush Pink', hex: '#E9D9E9', rgb: '233, 217, 233', lrv: 78, mood: 'Calm', category: 'Pastel', undertone: 'Luminous Pearl', desc: 'Delicate, expansive backdrop expanding room volume and tranquility.',
      brands: { sw: 'SW 6301 Charming Pink', bm: 'BM 2083-70 Bashful', dulux: '90RR 64/036', fb: 'No. 274 Ammonite' }
    },
    { 
      id: 'c5', name: 'Soft Gold Accent', hex: '#C3A77D', rgb: '195, 167, 125', lrv: 47, mood: 'Luxury', category: 'Warm', undertone: 'Brushed Brass', desc: 'Opulent, grounding tone inspired by Parisian architectural details.',
      brands: { sw: 'SW 6116 Tatami Tan', bm: 'BM 2154-30 Golden Bark', dulux: '30YY 33/249', fb: 'No. 310 Sudbury Yellow' }
    },

    // Nordic Tranquility Collection
    { 
      id: 'c6', name: 'Fjord Slate', hex: '#5E6F74', rgb: '94, 111, 116', lrv: 25, mood: 'Calm', category: 'Cool', undertone: 'Nordic Blue-Grey', desc: 'Steely Scandinavian depth framing minimalist oak furnishings.',
      brands: { sw: 'SW 6235 Foggy Day', bm: 'BM 2134-30 Iron Mountain', dulux: '10BB 17/090', fb: 'No. 26 Down Pipe' }
    },
    { 
      id: 'c7', name: 'Morning Mist', hex: '#98A8A9', rgb: '152, 168, 169', lrv: 49, mood: 'Calm', category: 'Cool', undertone: 'Frosted Mineral', desc: 'Diffuses harsh western sun into balanced, architectural light.',
      brands: { sw: 'SW 7654 Lattice', bm: 'BM 1598 Silver Lake', dulux: '30BB 33/050', fb: 'No. 235 Borrowed Light' }
    },
    { 
      id: 'c8', name: 'Glacier Silk', hex: '#C7D1D0', rgb: '199, 209, 208', lrv: 68, mood: 'Modern', category: 'Neutral', undertone: 'Silver Ice', desc: 'Clean, contemporary neutral maximizing natural light bounces.',
      brands: { sw: 'SW 7651 Front Porch', bm: 'BM 2125-60 Marilyn\'s Dress', dulux: '50BG 64/028', fb: 'No. 201 Blackened' }
    },
    { 
      id: 'c9', name: 'Arctic Chalk', hex: '#EBF0EF', rgb: '235, 240, 239', lrv: 88, mood: 'Modern', category: 'Neutral', undertone: 'Pure Alabaster', desc: 'Crisp architectural gallery white with high light reflection.',
      brands: { sw: 'SW 7005 Pure White', bm: 'BM OC-151 White Heron', dulux: '00NN 83/000', fb: 'No. 239 Wimborne White' }
    },

    // Emerald Estate Collection
    { 
      id: 'c10', name: 'Imperial Emerald', hex: '#283E38', rgb: '40, 62, 56', lrv: 14, mood: 'Luxury', category: 'Bold', undertone: 'Deep Pine', desc: 'Dramatic sanctuary hue for high-ceiling dining rooms and libraries.',
      brands: { sw: 'SW 6208 Pewter Green', bm: 'BM 2041-10 Hunter Green', dulux: '30GG 10/111', fb: 'No. 292 Treron' }
    },
    { 
      id: 'c11', name: 'Deep Sage', hex: '#4A655C', rgb: '74, 101, 92', lrv: 31, mood: 'Cozy', category: 'Cool', undertone: 'Earthy Botanical', desc: 'Earthy and restorative; anchors open-plan rooms with organic elegance.',
      brands: { sw: 'SW 6199 Rare Gray', bm: 'BM 2140-40 Herb Garden', dulux: '50GG 23/123', fb: 'No. 288 Bancha' }
    },
    { 
      id: 'c12', name: 'Eucalyptus Mist', hex: '#8FA59B', rgb: '143, 165, 155', lrv: 55, mood: 'Calm', category: 'Cool', undertone: 'Silver Sage', desc: 'Calming green with grey undertones for light-filled kitchens.',
      brands: { sw: 'SW 6185 Escape Gray', bm: 'BM 2141-50 Gray Cashmere', dulux: '70GG 39/098', fb: 'No. 287 French Gray' }
    },
    { 
      id: 'c13', name: 'Pale Lichen', hex: '#DCE4DF', rgb: '220, 228, 223', lrv: 80, mood: 'Modern', category: 'Neutral', undertone: 'Muted Celadon', desc: 'Soft whisper of herbal sage across expansive living spaces.',
      brands: { sw: 'SW 6182 Ethereal White', bm: 'BM OC-48 Hazy Skies', dulux: '90GG 74/057', fb: 'No. 2005 All White' }
    },

    // Warm Cashmere & Architectural Earth
    { 
      id: 'c14', name: 'Tuscan Ochre', hex: '#C68B59', rgb: '198, 139, 89', lrv: 36, mood: 'Cozy', category: 'Warm', undertone: 'Sunbaked Terracotta', desc: 'Warm Mediterranean vibrancy casting welcoming twilight hues.',
      brands: { sw: 'SW 6360 Cavern Clay', bm: 'BM 1215 Spiced Pumpkin', dulux: '60YR 33/400', fb: 'No. 282 Red Earth' }
    },
    { 
      id: 'c15', name: 'Warm Cashmere', hex: '#D8C6B6', rgb: '216, 198, 182', lrv: 63, mood: 'Cozy', category: 'Warm', undertone: 'Velvet Camel', desc: 'Cozy, tactile neutral that wraps bedroom walls in subtle comfort.',
      brands: { sw: 'SW 9109 Natural Linen', bm: 'BM 1037 Muslin', dulux: '20YY 53/124', fb: 'No. 275 Estate Emulsion' }
    },
    { 
      id: 'c16', name: 'Almond Plaster', hex: '#EFE7DC', rgb: '239, 231, 220', lrv: 81, mood: 'Calm', category: 'Neutral', undertone: 'Warm Biscuit', desc: 'Classic limestone finish reflecting morning light softly.',
      brands: { sw: 'SW 7566 Westhighland White', bm: 'BM OC-130 Cloud White', dulux: '40YY 77/086', fb: 'No. 2003 Pointing' }
    },
    { 
      id: 'c17', name: 'Espresso Velvet', hex: '#3C2F2F', rgb: '60, 47, 47', lrv: 11, mood: 'Luxury', category: 'Bold', undertone: 'Dark Mocha', desc: 'Seductive, enveloping depth for private cinema or lounge rooms.',
      brands: { sw: 'SW 6006 Black Bean', bm: 'BM 2115-10 Bitter Chocolate', dulux: '70YR 08/040', fb: 'No. 256 Pitch Black' }
    },

    // Modernist Monochromes & Hues
    { 
      id: 'c18', name: 'Midnight Charcoal', hex: '#1E2024', rgb: '30, 32, 36', lrv: 8, mood: 'Modern', category: 'Bold', undertone: 'Obsidian Slate', desc: 'Contemporary minimalist black with subtle undertones of midnight blue.',
      brands: { sw: 'SW 6258 Tricorn Black', bm: 'BM 2124-10 Wrought Iron', dulux: '00NN 05/000', fb: 'No. 57 Off-Black' }
    },
    { 
      id: 'c19', name: 'Pewter Ash', hex: '#63686E', rgb: '99, 104, 110', lrv: 33, mood: 'Modern', category: 'Cool', undertone: 'Industrial Steel', desc: 'Sleek metropolitan grey that elevates marble and brass accents.',
      brands: { sw: 'SW 7067 Cityscape', bm: 'BM 1606 Shadow Gray', dulux: '00NN 25/000', fb: 'No. 237 Manor House Gray' }
    },
    { 
      id: 'c20', name: 'Chiffon Greige', hex: '#DDD9D2', rgb: '221, 217, 210', lrv: 74, mood: 'Modern', category: 'Neutral', undertone: 'Warm Linen', desc: 'Architectural staple blending cool grey clarity with warm beige comfort.',
      brands: { sw: 'SW 7015 Repose Gray', bm: 'BM HC-172 Revere Pewter', dulux: '30YY 67/084', fb: 'No. 242 Skimming Stone' }
    }
  ];

  const ROOM_PRESETS = {
    living: {
      name: 'Nordic Living Salon',
      type: 'Living Room',
      beforeSrc: 'assets/presets/room_living_before.svg',
      afterSrc: 'assets/presets/room_living_after.svg'
    },
    bedroom: {
      name: 'Parisian Master Suite',
      type: 'Master Bedroom',
      beforeSrc: 'assets/presets/room_bedroom_before.svg',
      afterSrc: 'assets/presets/room_bedroom_before.svg'
    },
    dining: {
      name: 'Minimalist Dining Hall',
      type: 'Dining Room',
      beforeSrc: 'assets/presets/room_dining_before.svg',
      afterSrc: 'assets/presets/room_dining_before.svg'
    },
    study: {
      name: 'Warm Oak Library',
      type: 'Study',
      beforeSrc: 'assets/presets/room_study_before.svg',
      afterSrc: 'assets/presets/room_study_before.svg'
    }
  };

  // =========================================================================
  // 2. APPLICATION STATE
  // =========================================================================
  const state = {
    view: 'landing',          // 'landing' | 'studio' | 'library' | 'designs'
    studioStep: 1,            // 1: Upload, 2: Colors, 3: Visualizer
    roomType: 'Living Room',
    roomName: 'Nordic Living Salon',
    roomImageSrc: 'assets/presets/room_living_before.svg',
    customImageUploaded: false,
    
    // Color & Wall Application State
    wallMode: 'all',          // 'all' | 'accent'
    activeMood: 'Luxury',
    activeCategory: 'All',
    activeSwatchTarget: 'main', // 'main' | 'accent'
    activeColor: CURATED_COLORS[0], // Royal Lavender
    activeMainColor: CURATED_COLORS[0], // Royal Lavender
    activeAccentColor: CURATED_COLORS[3], // Blush Pink
    activeFinish: 'Eggshell',
    
    lightingMode: 'morning',  // 'morning' (5500K), 'evening' (2700K), 'neutral' (4000K)
    viewMode: 'slider',       // 'slider' | 'side-by-side'
    sliderPos: 50,            // percentage (0 - 100)
    isGenerating: false,
    soundEnabled: true,       // Audio FX toggle
    
    // Architectural Estimator Parameters
    calculator: {
      length: 14,
      width: 12,
      height: 9,
      coats: 2,
      openings: 0.15,
      pricePerGallon: 65,
      grossArea: 468,
      netArea: 398,
      gallons: 2.3,
      liters: 8.7,
      totalBudget: 149.50
    },

    savedDesigns: [],
    settings: {
      provider: 'demo',       // 'demo' | 'replicate' | 'stability'
      apiKey: '',
      supabaseUrl: '',
      supabaseKey: ''
    },
    projectToDeleteId: null,
    projectToRenameId: null
  };

  // =========================================================================
  // 3. SPATIAL WEB AUDIO SYNTHESIZER
  // =========================================================================
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playLuxuryChime(freq = 659.25) { // E5 crystalline chime
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const gain2 = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.99, now + 0.5);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.76, now); // Metallic crystal harmonic

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(0.05, now + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(filter);
      gain2.connect(filter);
      filter.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.7);
      osc2.stop(now + 0.4);
    } catch (e) {
      // Audio fallback safe
    }
  }

  function playTactileClick() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  function playHarmonicChord() {
    if (!state.soundEnabled) return;
    [523.25, 659.25, 783.99].forEach((freq, i) => { // C5, E5, G5 triad
      setTimeout(() => playLuxuryChime(freq), i * 80);
    });
  }

  // =========================================================================
  // 4. DOM CACHE
  // =========================================================================
  const DOM = {};

  function cacheDOMElements() {
    // Navigation
    DOM.navLinks = document.querySelectorAll('.nav-link, .drawer-link, .footer-link');
    DOM.desktopNav = document.getElementById('desktop-nav');
    DOM.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    DOM.mobileDrawer = document.getElementById('mobile-drawer');
    DOM.navBrandBtn = document.getElementById('nav-brand-btn');
    DOM.startVisualizingBtn = document.getElementById('start-visualizing-btn');
    DOM.heroCtaBtn = document.getElementById('hero-cta-btn');
    DOM.heroBrowsePalettes = document.getElementById('hero-browse-palettes');
    DOM.navSavedCount = document.getElementById('nav-saved-count');
    DOM.openSettingsBtn = document.getElementById('open-settings-btn');
    DOM.mobileSettingsBtn = document.getElementById('mobile-settings-btn');
    DOM.soundToggleBtn = document.getElementById('sound-toggle-btn');
    DOM.soundIcon = document.getElementById('sound-icon');

    // Views
    DOM.views = {
      landing: document.getElementById('view-landing'),
      studio: document.getElementById('view-studio'),
      library: document.getElementById('view-library'),
      designs: document.getElementById('view-designs'),
      profile: document.getElementById('view-profile'),
      statistics: document.getElementById('view-statistics')
    };

    // Hero teaser slider
    DOM.heroDemoComparison = document.getElementById('hero-demo-comparison');
    DOM.heroBeforeLayer = document.getElementById('hero-before-layer');
    DOM.heroSliderDivider = document.getElementById('hero-slider-divider');

    // Studio Stepper
    DOM.stepNavBtns = document.querySelectorAll('.step-nav-btn');
    DOM.stepPanels = {
      1: document.getElementById('step-panel-1'),
      2: document.getElementById('step-panel-2'),
      3: document.getElementById('step-panel-3')
    };
    DOM.studioStepHeading = document.getElementById('studio-step-heading');
    DOM.studioStepSubtext = document.getElementById('studio-step-subtext');

    // Step 1: Upload
    DOM.roomDropzone = document.getElementById('room-dropzone');
    DOM.roomFileInput = document.getElementById('room-file-input');
    DOM.browseFilesBtn = document.getElementById('browse-files-btn');
    DOM.dropzoneEmptyState = document.getElementById('dropzone-empty-state');
    DOM.dropzonePreviewState = document.getElementById('dropzone-preview-state');
    DOM.uploadPreviewImg = document.getElementById('upload-preview-img');
    DOM.replaceUploadBtn = document.getElementById('replace-upload-btn');
    DOM.roomTypeChips = document.getElementById('room-type-chips');
    DOM.presetRoomCards = document.querySelectorAll('.preset-room-card');
    DOM.confirmUploadBtn = document.getElementById('confirm-upload-btn');

    // Step 2: Colors & Anti-Gravity
    DOM.moodPills = document.querySelectorAll('.mood-pill');
    DOM.familyPills = document.querySelectorAll('.family-pill');
    DOM.matterCanvas = document.getElementById('matter-canvas');
    DOM.resetGravityBtn = document.getElementById('reset-gravity-btn');
    DOM.pulseGravityBtn = document.getElementById('pulse-gravity-btn');
    DOM.activeSwatchPreview = document.getElementById('active-swatch-preview');
    DOM.activeColorName = document.getElementById('active-color-name');
    DOM.activeColorHex = document.getElementById('active-color-hex');
    DOM.activeColorRgb = document.getElementById('active-color-rgb');
    DOM.activeColorLrv = document.getElementById('active-color-lrv');
    DOM.nativeColorPicker = document.getElementById('native-color-picker');
    DOM.hexTextInput = document.getElementById('hex-text-input');
    DOM.finishPills = document.querySelectorAll('.finish-pill');
    DOM.backToStep1Btn = document.getElementById('back-to-step1-btn');
    DOM.proceedToVisualizerBtn = document.getElementById('proceed-to-visualizer-btn');

    // Wall Application Mode (All Walls vs Accent Feature Wall)
    DOM.wallModePills = document.querySelectorAll('.wall-mode-pill');
    DOM.dualSwatchBar = document.getElementById('dual-swatch-bar');
    DOM.targetMainBtn = document.getElementById('target-main-btn');
    DOM.targetAccentBtn = document.getElementById('target-accent-btn');
    DOM.targetMainDot = document.getElementById('target-main-dot');
    DOM.targetAccentDot = document.getElementById('target-accent-dot');
    DOM.targetMainName = document.getElementById('target-main-name');
    DOM.targetAccentName = document.getElementById('target-accent-name');

    // Step 3: Visualizer
    DOM.comparisonViewport = document.getElementById('comparison-viewport');
    DOM.splitDivider = document.getElementById('split-divider');
    DOM.splitHandle = document.getElementById('split-handle');
    DOM.layerBefore = document.getElementById('layer-before');
    DOM.originalRoomImg = document.getElementById('original-room-img');
    DOM.recolorCanvas = document.getElementById('recolor-canvas');
    DOM.sideRecolorCanvas = document.getElementById('side-recolor-canvas');
    DOM.sideBeforeImg = document.getElementById('side-before-img');
    DOM.sideBySideContainer = document.getElementById('side-by-side-container');
    DOM.lightingFilterOverlay = document.getElementById('lighting-filter-overlay');
    DOM.lightingModeButtons = document.querySelectorAll('.lighting-mode-btn');
    DOM.btnModeSlider = document.getElementById('btn-mode-slider');
    DOM.btnModeSide = document.getElementById('btn-mode-side');
    DOM.resetViewBtn = document.getElementById('reset-view-btn');
    DOM.openCalculatorBtn = document.getElementById('open-calculator-btn');
    DOM.generationLoader = document.getElementById('generation-loader');
    DOM.loaderStepText = document.getElementById('loader-step-text');
    DOM.progressBarFill = document.getElementById('progress-bar-fill');
    DOM.loaderPercentage = document.getElementById('loader-percentage');
    DOM.visualizerRoomName = document.getElementById('visualizer-room-name');
    DOM.vizChip = document.getElementById('viz-chip');
    DOM.vizShadeName = document.getElementById('viz-shade-name');
    DOM.afterTagLabel = document.getElementById('after-tag-label');

    // Shade details in Step 3
    DOM.detailSwatchSample = document.getElementById('detail-swatch-sample');
    DOM.detailSheenLabel = document.getElementById('detail-sheen-label');
    DOM.detailColorTitle = document.getElementById('detail-color-title');
    DOM.detailFormulaCode = document.getElementById('detail-formula-code');
    DOM.specValHex = document.getElementById('spec-val-hex');
    DOM.specValRgb = document.getElementById('spec-val-rgb');
    DOM.specValLrv = document.getElementById('spec-val-lrv');
    DOM.specValUndertone = document.getElementById('spec-val-undertone');

    // Real Brand Codes in Specs Card
    DOM.brandSwCode = document.getElementById('brand-sw-code');
    DOM.brandBmCode = document.getElementById('brand-bm-code');
    DOM.brandDuluxCode = document.getElementById('brand-dulux-code');
    DOM.brandFbCode = document.getElementById('brand-fb-code');

    // Visualizer Actions
    DOM.saveDesignBtn = document.getElementById('save-design-btn');
    DOM.downloadPreviewBtn = document.getElementById('download-preview-btn');
    DOM.exportPdfBtn = document.getElementById('export-pdf-btn');
    DOM.regenerateBtn = document.getElementById('regenerate-btn');
    DOM.tryAnotherColorBtn = document.getElementById('try-another-color-btn');

    // Paint Calculator Modal & Fields
    DOM.calculatorModal = document.getElementById('calculator-modal');
    DOM.closeCalculatorModalBtn = document.getElementById('close-calculator-modal-btn');
    DOM.applyCalcBtn = document.getElementById('apply-calc-btn');
    DOM.calcLength = document.getElementById('calc-length');
    DOM.calcWidth = document.getElementById('calc-width');
    DOM.calcHeight = document.getElementById('calc-height');
    DOM.calcCoats = document.getElementById('calc-coats');
    DOM.calcOpenings = document.getElementById('calc-openings');
    DOM.calcPrice = document.getElementById('calc-price');
    DOM.calcGrossArea = document.getElementById('calc-gross-area');
    DOM.calcNetArea = document.getElementById('calc-net-area');
    DOM.calcGallons = document.getElementById('calc-gallons');
    DOM.calcLiters = document.getElementById('calc-liters');
    DOM.calcBudget = document.getElementById('calc-budget');

    // Printable Spec Sheet
    DOM.printSpecSheet = document.getElementById('print-spec-sheet');
    DOM.printProjectName = document.getElementById('print-project-name');
    DOM.printDate = document.getElementById('print-date');
    DOM.printBeforeImg = document.getElementById('print-before-img');
    DOM.printAfterImg = document.getElementById('print-after-img');
    DOM.printShadeName = document.getElementById('print-shade-name');
    DOM.printHexCode = document.getElementById('print-hex-code');
    DOM.printLrvVal = document.getElementById('print-lrv-val');
    DOM.printSheenVal = document.getElementById('print-sheen-val');
    DOM.printSwVal = document.getElementById('print-sw-val');
    DOM.printBmVal = document.getElementById('print-bm-val');
    DOM.printNetArea = document.getElementById('print-net-area');
    DOM.printCoats = document.getElementById('print-coats');
    DOM.printVolume = document.getElementById('print-volume');
    DOM.printCost = document.getElementById('print-cost');

    // Library View
    DOM.librarySearchInput = document.getElementById('library-search-input');
    DOM.libMoodPills = document.querySelectorAll('.lib-mood-pill');
    DOM.librarySwatchesGrid = document.getElementById('library-swatches-grid');

    // My Designs View
    DOM.savedDesignsGrid = document.getElementById('saved-designs-grid');
    DOM.emptyDesignsState = document.getElementById('empty-designs-state');
    DOM.designsCreateNewBtn = document.getElementById('designs-create-new-btn');
    DOM.emptyCreateBtn = document.getElementById('empty-create-btn');

    // Settings Modal
    DOM.settingsModal = document.getElementById('settings-modal');
    DOM.closeSettingsModalBtn = document.getElementById('close-settings-modal-btn');
    DOM.saveSettingsBtn = document.getElementById('save-settings-btn');
    DOM.settingProviderSelect = document.getElementById('setting-provider-select');
    DOM.settingApiKey = document.getElementById('setting-api-key');
    DOM.settingSupabaseUrl = document.getElementById('setting-supabase-url');
    DOM.settingSupabaseKey = document.getElementById('setting-supabase-key');
    DOM.settingsTabs = document.querySelectorAll('.settings-tabs .tab-btn');
    DOM.bannerSettingsLink = document.getElementById('banner-settings-link');

    // Rename & Delete Modals
    DOM.renameModal = document.getElementById('rename-modal');
    DOM.renameInput = document.getElementById('rename-input');
    DOM.cancelRenameBtn = document.getElementById('cancel-rename-btn');
    DOM.confirmRenameBtn = document.getElementById('confirm-rename-btn');
    DOM.closeRenameModalBtn = document.getElementById('close-rename-modal-btn');

    DOM.deleteModal = document.getElementById('delete-modal');
    DOM.deleteProjectTitle = document.getElementById('delete-project-title');
    DOM.cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    DOM.confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    DOM.closeDeleteModalBtn = document.getElementById('close-delete-modal-btn');

    DOM.toastContainer = document.getElementById('toast-container');
    DOM.themeToggleBtn = document.getElementById('theme-toggle-btn');
    DOM.themeIcon = document.getElementById('theme-icon');

    // Profile / Auth
    DOM.profileBtn = document.getElementById('profile-btn');
    DOM.profileStatusDot = document.getElementById('profile-status-dot');
    DOM.navUserName = document.getElementById('nav-user-name');
    DOM.navUserChip = document.getElementById('nav-user-chip');
    DOM.navUserAvatar = document.getElementById('nav-user-avatar');
    DOM.profileModal = document.getElementById('profile-modal');
    DOM.closeProfileModalBtn = document.getElementById('close-profile-modal-btn');
    DOM.profileSignedOut = document.getElementById('profile-signed-out');
    DOM.profileSignedIn = document.getElementById('profile-signed-in');
    DOM.profileUnconfigured = document.getElementById('profile-unconfigured');
    DOM.authNameInput = document.getElementById('auth-name-input');
    DOM.authEmailInput = document.getElementById('auth-email-input');
    DOM.authPasswordInput = document.getElementById('auth-password-input');
    DOM.signinBtn = document.getElementById('signin-btn');
    DOM.signupBtn = document.getElementById('signup-btn');
    DOM.googleSigninBtn = document.getElementById('google-signin-btn');
    DOM.profileSignoutBtn = document.getElementById('profile-signout-btn');
    DOM.profileName = document.getElementById('profile-name');
    DOM.profileEmail = document.getElementById('profile-email');
    DOM.profileAvatar = document.getElementById('profile-avatar');
    DOM.profileDesignCount = document.getElementById('profile-design-count');
    DOM.profileFavCount = document.getElementById('profile-fav-count');
    DOM.profileNameInput = document.getElementById('profile-name-input');
    DOM.profileAvatarInput = document.getElementById('profile-avatar-input');
    DOM.profileAvatarFile = document.getElementById('profile-avatar-file');
    DOM.profileUploadAvatarBtn = document.getElementById('profile-upload-avatar-btn');
    DOM.profileCreatedAt = document.getElementById('profile-created-at');
    DOM.profileUpdatedAt = document.getElementById('profile-updated-at');
    DOM.profileSaveBtn = document.getElementById('profile-save-btn');
    DOM.profileDesignsList = document.getElementById('profile-designs-list');
    DOM.profilePrefSound = document.getElementById('profile-pref-sound');
    DOM.profilePrefTheme = document.getElementById('profile-pref-theme');
    DOM.profileLocationInput = document.getElementById('profile-location-input');
    DOM.profileBioInput = document.getElementById('profile-bio-input');
    DOM.profileExportBtn = document.getElementById('profile-export-btn');
  }

  // =========================================================================
  // 5. VIEW ROUTING & NAVIGATION
  // =========================================================================
  const LOCAL_PROFILE_KEY = 'wallora_local_profile_v1';

  function readLocalProfile() {
    try {
      const raw = localStorage.getItem(LOCAL_PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function writeLocalProfile(profile) {
    try {
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.warn('Local profile save failed:', e.message || e);
      return false;
    }
  }

  function buildProjectProfile(user, overrides = {}) {
    const existing = readLocalProfile() || {};
    const now = new Date().toISOString();
    const baseId = user?.id || existing.id || 'local-user';
    return {
      id: baseId,
      email: user?.email || existing.email || '',
      display_name: overrides.display_name ?? existing.display_name ?? user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? 'Wallora User',
      avatar_url: overrides.avatar_url ?? existing.avatar_url ?? user?.user_metadata?.avatar_url ?? '',
      location: overrides.location ?? existing.location ?? '',
      bio: overrides.bio ?? existing.bio ?? '',
      preferences: overrides.preferences ?? existing.preferences ?? { sound: state.soundEnabled ? 'on' : 'off', theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light' },
      source: user ? 'supabase+local' : 'local',
      created_at: existing.created_at || user?.created_at || now,
      updated_at: now
    };
  }

  function applyLocalProfile(profile) {
    if (!profile) return;
    if (DOM.profileNameInput && profile.display_name) DOM.profileNameInput.value = profile.display_name;
    if (DOM.profileAvatarInput && profile.avatar_url !== undefined) DOM.profileAvatarInput.value = profile.avatar_url || '';
    if (DOM.profileLocationInput && profile.location !== undefined) DOM.profileLocationInput.value = profile.location || '';
    if (DOM.profileBioInput && profile.bio !== undefined) DOM.profileBioInput.value = profile.bio || '';
  }

  function setView(viewName) {
    if (!DOM.views[viewName]) viewName = 'landing';

    const db = window.wallora && window.wallora.db;
    playTactileClick();
    state.view = viewName;

    Object.keys(DOM.views).forEach(key => {
      if (key === viewName) DOM.views[key].classList.add('active-view');
      else DOM.views[key].classList.remove('active-view');
    });

    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) link.classList.add('active');
      else link.classList.remove('active');
    });

    if (DOM.mobileDrawer) DOM.mobileDrawer.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewName === 'statistics') {
      (async () => {
        try {
          const user = await (db && db.getUser ? db.getUser() : Promise.resolve(null));
          await loadStatisticsPage(user || { id: 'local-user' });
        } catch (e) {
          console.warn('Statistics load failed:', e.message || e);
          showToast('Could not load Statistics right now.', 'error');
        }
      })();
    } else if (viewName === 'profile') {
      (async () => {
        try {
          const user = await (db && db.getUser ? db.getUser() : Promise.resolve(null));
          if (user) {
            await ensureProfile(user);
            await refreshProfileUI(user);
            await loadProfilePage(user);
          } else {
            await refreshProfileUI(null);
            if (db && db.client) {
              showToast('Please sign in to access your synced Profile.', 'info');
              const m = document.getElementById('profile-modal');
              if (m) m.classList.remove('hidden');
            }
            await loadProfilePage({ id: 'local-user', email: '', user_metadata: {} });
          }
        } catch (e) {
          console.warn('Profile load failed:', e.message || e);
          await loadProfilePage({ id: 'local-user', email: '', user_metadata: {} });
        }
      })();
    }

    if (viewName === 'studio') goToStudioStep(state.studioStep);
    else if (viewName === 'library') renderLibraryGrid();
    else if (viewName === 'designs') renderSavedDesigns();
  }

  function goToStudioStep(stepNum) {
    playTactileClick();
    state.studioStep = stepNum;

    const headings = {
      1: { title: 'Step 1: Upload Room Photography', sub: 'Drop your space photo or select one of our curated architectural rooms.' },
      2: { title: 'Step 2: Curate Palette & Swatches', sub: 'Interact with zero-gravity floating swatches and configure Main vs Accent wall tones.' },
      3: { title: 'Step 3: AI Room Visualizer', sub: 'Compare before and after, adjust lighting temperature, and review LRV paint specs.' }
    };
    DOM.studioStepHeading.textContent = headings[stepNum].title;
    DOM.studioStepSubtext.textContent = headings[stepNum].sub;

    DOM.stepNavBtns.forEach(btn => {
      const step = parseInt(btn.getAttribute('data-step'), 10);
      if (step === stepNum) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    Object.keys(DOM.stepPanels).forEach(step => {
      if (parseInt(step, 10) === stepNum) {
        DOM.stepPanels[step].classList.remove('hidden');
        DOM.stepPanels[step].classList.add('active-step');
      } else {
        DOM.stepPanels[step].classList.add('hidden');
        DOM.stepPanels[step].classList.remove('active-step');
      }
    });

    if (stepNum === 2) {
      setTimeout(() => initPhysicsSwatches(), 100);
    }

    if (stepNum === 3) {
      updateVisualizerDetails();
      renderRoomVisualization();
    }
  }

  // =========================================================================
  // 6. TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast-pill toast-${type}`;
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';

    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // 7. HERO TEASER COMPARISON SLIDER
  // =========================================================================
  function initHeroTeaserSlider() {
    if (!DOM.heroDemoComparison) return;
    let isDragging = false;

    function updateHeroSplit(clientX) {
      const rect = DOM.heroDemoComparison.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const pct = (offsetX / rect.width) * 100;
      DOM.heroBeforeLayer.style.width = `${pct}%`;
      DOM.heroSliderDivider.style.left = `${pct}%`;
    }

    DOM.heroDemoComparison.addEventListener('mousedown', (e) => {
      isDragging = true;
      playTactileClick();
      updateHeroSplit(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateHeroSplit(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    DOM.heroDemoComparison.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateHeroSplit(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateHeroSplit(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // =========================================================================
  // 8. STEP 1: ROOM UPLOAD & PRESET SELECTION
  // =========================================================================
  function initRoomUploadHandlers() {
    const dropzone = DOM.roomDropzone;
    if (!dropzone || !DOM.roomFileInput) return;

    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length > 0) handleImageUpload(files[0]);
    });

    if (DOM.browseFilesBtn) {
      DOM.browseFilesBtn.addEventListener('click', () => {
        playTactileClick();
        DOM.roomFileInput.click();
      });
    }

    DOM.roomFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) handleImageUpload(e.target.files[0]);
      e.target.value = '';
    });

    if (DOM.replaceUploadBtn) {
      DOM.replaceUploadBtn.addEventListener('click', () => {
        playTactileClick();
        DOM.roomFileInput.click();
      });
    }

    if (DOM.roomTypeChips) {
      DOM.roomTypeChips.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          playTactileClick();
          DOM.roomTypeChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          state.roomType = chip.getAttribute('data-room-type') || state.roomType;
        });
      });
    }

    if (DOM.presetRoomCards) {
      DOM.presetRoomCards.forEach(card => {
        card.addEventListener('click', () => {
          playLuxuryChime(523.25);
          DOM.presetRoomCards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const presetId = card.getAttribute('data-preset-id');
          const preset = ROOM_PRESETS[presetId];
          if (preset) {
            state.roomName = preset.name;
            state.roomType = preset.type;
            state.roomImageSrc = preset.beforeSrc;
            state.customImageUploaded = false;
            if (DOM.roomTypeChips) {
              DOM.roomTypeChips.querySelectorAll('.chip').forEach(c => {
                c.classList.toggle('active', c.getAttribute('data-room-type') === preset.type);
              });
            }
            if (DOM.dropzoneEmptyState) DOM.dropzoneEmptyState.classList.remove('hidden');
            if (DOM.dropzonePreviewState) DOM.dropzonePreviewState.classList.add('hidden');
            if (DOM.uploadPreviewImg) DOM.uploadPreviewImg.src = '';
            showToast(`Selected ${preset.name}`, 'info');
          }
        });
      });
    }

    if (DOM.confirmUploadBtn) {
      DOM.confirmUploadBtn.addEventListener('click', () => { goToStudioStep(2); });
    }
  }

  function handleImageUpload(file) {
    try {
      if (!file) { showToast('No file selected.', 'error'); return; }
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      const ext = (file.name || '').toLowerCase().split('.').pop();
      if (!(validTypes.includes(file.type) || ['jpg','jpeg','png','webp'].includes(ext))) {
        showToast('Unsupported format. Please upload JPEG, PNG, or WebP.', 'error');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast('File exceeds 10 MB limit. Please compress your photograph.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e && e.target ? e.target.result : null;
        if (!dataUrl) { showToast(`Could not load "${file.name || 'image'}".`, 'error'); return; }
        state.roomImageSrc = dataUrl;
        state.customImageUploaded = true;
        state.roomName = (file.name || 'Room').replace(/\.[^/.]+$/, '') || 'Uploaded Room';
        if (DOM.uploadPreviewImg) DOM.uploadPreviewImg.src = dataUrl;
        if (DOM.dropzoneEmptyState) DOM.dropzoneEmptyState.classList.add('hidden');
        if (DOM.dropzonePreviewState) DOM.dropzonePreviewState.classList.remove('hidden');
        if (DOM.presetRoomCards) DOM.presetRoomCards.forEach(c => c.classList.remove('active'));
        playHarmonicChord();
        showToast(`Photograph uploaded successfully (${(file.size / 1024 / 1024).toFixed(1)} MB)`, 'success');
      };
      reader.onerror = () => {
        showToast(`Could not read "${file.name || 'image'}". Please try a different PNG/JPEG/WebP file.`, 'error');
        if (DOM.roomFileInput) DOM.roomFileInput.value = '';
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Image upload failed:', err);
      showToast(`Could not read "${(file && file.name) || 'image'}". Please try another image file.`, 'error');
      if (DOM.roomFileInput) DOM.roomFileInput.value = '';
    }
  }

  // =========================================================================
  // 9. STEP 2: ANTI-GRAVITY PHYSICS SWATCH VISUALIZER & GYROSCOPE
  // =========================================================================
  let physicsEngine = null;
  let physicsRunner = null;
  let physicsBalls = [];
  let customCanvasAnimFrame = null;

  function initPhysicsSwatches() {
    const canvas = DOM.matterCanvas;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container.clientWidth || 800;
    const height = 290;

    canvas.width = width;
    canvas.height = height;

    if (window.Matter && window.Matter.Engine) {
      initMatterJsPhysics(width, height);
    } else {
      initFallbackSpringPhysics(width, height);
    }

    // Attach mobile orientation gyroscope tilt
    if (window.DeviceOrientationEvent && !window._gyroAttached) {
      window.addEventListener('deviceorientation', (e) => {
        if (!physicsEngine || !physicsEngine.world) return;
        const gamma = e.gamma || 0; // Left to right tilt [-90, 90]
        const beta = e.beta || 0;   // Front to back tilt [-180, 180]
        // Scale gentle gravity
        physicsEngine.world.gravity.x = Math.max(-0.25, Math.min(0.25, gamma / 120));
        physicsEngine.world.gravity.y = Math.max(-0.25, Math.min(0.25, beta / 120));
      });
      window._gyroAttached = true;
    }
  }

  function initMatterJsPhysics(width, height) {
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = window.Matter;

    if (physicsRunner) Runner.stop(physicsRunner);
    if (physicsEngine) Composite.clear(physicsEngine.world, false);

    physicsEngine = Engine.create({
      gravity: { x: 0, y: 0.05, scale: 0.001 }
    });

    const canvas = DOM.matterCanvas;
    const ctx = canvas.getContext('2d');

    const wallThick = 50;
    const ground = Bodies.rectangle(width / 2, height + wallThick / 2 - 5, width * 2, wallThick, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -wallThick / 2, width * 2, wallThick, { isStatic: true });
    const leftWall = Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 2, { isStatic: true });

    Composite.add(physicsEngine.world, [ground, ceiling, leftWall, rightWall]);

    physicsBalls = [];
    const colorsToDisplay = CURATED_COLORS.slice(0, 14);

    colorsToDisplay.forEach((color, i) => {
      const radius = 28 + (i % 3) * 4;
      const x = 50 + (i * ((width - 100) / colorsToDisplay.length)) + (Math.random() * 20 - 10);
      const y = 50 + Math.random() * (height - 120);

      const ball = Bodies.circle(x, y, radius, {
        restitution: 0.88,
        frictionAir: 0.02,
        friction: 0.05,
        render: { visible: false }
      });
      ball.colorData = color;
      ball.targetRadius = radius;
      physicsBalls.push(ball);
    });

    Composite.add(physicsEngine.world, physicsBalls);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(physicsEngine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false }
      }
    });
    Composite.add(physicsEngine.world, mouseConstraint);

    function renderLoop() {
      Engine.update(physicsEngine, 1000 / 60);

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(183, 161, 207, 0.04)';
      ctx.fillRect(0, 0, width, height);

      physicsBalls.forEach(ball => {
        const { x, y } = ball.position;
        const color = ball.colorData;
        const currentTargetColor = (state.activeSwatchTarget === 'accent') ? state.activeAccentColor : state.activeMainColor;
        const isSelected = (currentTargetColor.hex.toLowerCase() === color.hex.toLowerCase());

        ctx.save();
        ctx.translate(x, y);

        ctx.shadowColor = 'rgba(26, 21, 35, 0.2)';
        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.shadowOffsetY = 4;

        ctx.beginPath();
        ctx.arc(0, 0, ball.circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = color.hex;
        ctx.fill();

        ctx.shadowColor = 'transparent';
        if (isSelected) {
          ctx.strokeStyle = '#C3A77D';
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, ball.circleRadius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(195, 167, 125, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        const grad = ctx.createLinearGradient(-ball.circleRadius, -ball.circleRadius, ball.circleRadius, ball.circleRadius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        grad.addColorStop(0.5, 'transparent');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, ball.circleRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = (color.lrv > 50) ? '#1A1523' : '#FFFFFF';
        ctx.font = '600 9px "Poppins", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const shortName = color.name.split(' ')[0];
        ctx.fillText(shortName, 0, -3);

        ctx.font = '500 7.5px "Poppins", sans-serif';
        ctx.fillText(`${color.lrv}%`, 0, 7);

        ctx.restore();
      });

      customCanvasAnimFrame = requestAnimationFrame(renderLoop);
    }

    if (customCanvasAnimFrame) cancelAnimationFrame(customCanvasAnimFrame);
    customCanvasAnimFrame = requestAnimationFrame(renderLoop);

    Events.on(mouseConstraint, 'startdrag', (event) => {
      const clickedBody = event.body;
      if (clickedBody && clickedBody.colorData) {
        selectActiveColor(clickedBody.colorData);
        Body.applyForce(clickedBody, clickedBody.position, { x: 0, y: -0.012 });
      }
    });

    DOM.resetGravityBtn.onclick = () => {
      playTactileClick();
      physicsBalls.forEach(ball => {
        const forceX = (Math.random() - 0.5) * 0.04;
        const forceY = -0.02 - Math.random() * 0.03;
        Body.applyForce(ball, ball.position, { x: forceX, y: forceY });
      });
      showToast('Swatches scattered in zero gravity', 'info');
    };

    DOM.pulseGravityBtn.onclick = () => {
      playLuxuryChime(783.99);
      const centerX = width / 2;
      const centerY = height / 2;
      physicsBalls.forEach(ball => {
        const dx = centerX - ball.position.x;
        const dy = centerY - ball.position.y;
        Body.applyForce(ball, ball.position, { x: dx * 0.0001, y: dy * 0.0001 });
      });
      showToast('Magnetic convergence activated', 'info');
    };
  }

  function initFallbackSpringPhysics(width, height) {
    const canvas = DOM.matterCanvas;
    const ctx = canvas.getContext('2d');
    const colorsToDisplay = CURATED_COLORS.slice(0, 14);

    const particles = colorsToDisplay.map((color, i) => ({
      x: 60 + i * ((width - 120) / colorsToDisplay.length),
      y: 80 + (i % 2) * 80,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 28,
      color: color
    }));

    let mousePos = { x: -100, y: -100 };

    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };

    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particles.forEach(p => {
        const dist = Math.hypot(p.x - clickX, p.y - clickY);
        if (dist <= p.radius) {
          selectActiveColor(p.color);
        }
      });
    };

    function drawFallback() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < p.radius) { p.x = p.radius; p.vx *= -1; }
        if (p.x > width - p.radius) { p.x = width - p.radius; p.vx *= -1; }
        if (p.y < p.radius) { p.y = p.radius; p.vy *= -1; }
        if (p.y > height - p.radius) { p.y = height - p.radius; p.vy *= -1; }

        const currentTarget = (state.activeSwatchTarget === 'accent') ? state.activeAccentColor : state.activeMainColor;
        const isSelected = currentTarget.hex.toLowerCase() === p.color.hex.toLowerCase();

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.hex;
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#C3A77D' : '#FFFFFF';
        ctx.lineWidth = isSelected ? 4 : 2;
        ctx.stroke();

        ctx.fillStyle = (p.color.lrv > 50) ? '#1A1523' : '#FFFFFF';
        ctx.font = '600 9px "Poppins", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.color.name.split(' ')[0], p.x, p.y + 3);
        ctx.restore();
      });

      requestAnimationFrame(drawFallback);
    }
    requestAnimationFrame(drawFallback);
  }

  // =========================================================================
  // 10. COLOR SELECTION, LRV & REAL BRAND CODES
  // =========================================================================
  function calculateLRV(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 50;
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    // Architectural LRV per Wallora AI specification (CIE luminance, gamma 2.2)
    const Y = 0.2126 * Math.pow(r, 2.2) + 0.7152 * Math.pow(g, 2.2) + 0.0722 * Math.pow(b, 2.2);
    return Math.round(Y * 100);
  }

  function hexToRgb(hex) {
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return null;
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function selectActiveColor(color) {
    playLuxuryChime(587.33);

    // Apply color to target (Main wall vs Feature Accent wall)
    if (state.activeSwatchTarget === 'accent') {
      state.activeAccentColor = { ...color };
      DOM.targetAccentDot.style.backgroundColor = color.hex;
      DOM.targetAccentName.textContent = `${color.name} (${color.hex})`;
    } else {
      state.activeMainColor = { ...color };
      DOM.targetMainDot.style.backgroundColor = color.hex;
      DOM.targetMainName.textContent = `${color.name} (${color.hex})`;
    }
    state.activeColor = { ...color };

    // Update active swatch preview in Step 2
    DOM.activeSwatchPreview.style.backgroundColor = color.hex;
    DOM.activeColorName.textContent = color.name;
    DOM.activeColorHex.textContent = color.hex.toUpperCase();
    DOM.activeColorRgb.textContent = `RGB: ${color.rgb || Object.values(hexToRgb(color.hex)).join(', ')}`;
    DOM.activeColorLrv.textContent = `LRV: ${color.lrv}%`;

    DOM.nativeColorPicker.value = color.hex;
    DOM.hexTextInput.value = color.hex.replace('#', '').toUpperCase();

    // Sync curated palettes row swatches
    document.querySelectorAll('.palette-swatch-item').forEach(sw => {
      const swHex = sw.getAttribute('data-hex');
      if (swHex && swHex.toLowerCase() === color.hex.toLowerCase()) {
        sw.classList.add('active');
      } else {
        sw.classList.remove('active');
      }
    });

    updateBrandCodes(color);
    showToast(`Active Shade: ${color.name} (${color.hex})`, 'info', 1800);
  }

  function updateBrandCodes(color) {
    const brands = color.brands || {
      sw: 'SW Custom Formula',
      bm: 'BM Architectural Match',
      dulux: 'Heritage Equivalent',
      fb: 'Bespoke Blend'
    };
    if (DOM.brandSwCode) DOM.brandSwCode.textContent = brands.sw;
    if (DOM.brandBmCode) DOM.brandBmCode.textContent = brands.bm;
    if (DOM.brandDuluxCode) DOM.brandDuluxCode.textContent = brands.dulux;
    if (DOM.brandFbCode) DOM.brandFbCode.textContent = brands.fb;
  }

  function initColorControls() {
    // Mood selection pills
    DOM.moodPills.forEach(pill => {
      pill.addEventListener('click', () => {
        playTactileClick();
        DOM.moodPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeMood = pill.getAttribute('data-mood');
      });
    });

    // Color Family pills
    DOM.familyPills.forEach(pill => {
      pill.addEventListener('click', () => {
        playTactileClick();
        DOM.familyPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = pill.getAttribute('data-category');
      });
    });

    // Wall Application Mode (All Walls vs Accent Feature Wall)
    DOM.wallModePills.forEach(pill => {
      pill.addEventListener('click', () => {
        playTactileClick();
        DOM.wallModePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const mode = pill.getAttribute('data-wall-mode');
        state.wallMode = mode;

        if (mode === 'accent') {
          DOM.dualSwatchBar.classList.remove('hidden');
          showToast('Dual-Tone Accent Wall Mode enabled', 'info');
        } else {
          DOM.dualSwatchBar.classList.add('hidden');
          state.activeSwatchTarget = 'main';
          showToast('All Walls Mode active', 'info');
        }
      });
    });

    DOM.targetMainBtn.addEventListener('click', () => {
      playTactileClick();
      state.activeSwatchTarget = 'main';
      DOM.targetMainBtn.classList.add('active');
      DOM.targetAccentBtn.classList.remove('active');
      showToast('Selecting color for Surrounding Walls', 'info');
    });

    DOM.targetAccentBtn.addEventListener('click', () => {
      playTactileClick();
      state.activeSwatchTarget = 'accent';
      DOM.targetAccentBtn.classList.add('active');
      DOM.targetMainBtn.classList.remove('active');
      showToast('Selecting color for Feature Accent Wall', 'info');
    });

    // Native color picker
    DOM.nativeColorPicker.addEventListener('input', (e) => {
      const hex = e.target.value;
      const lrv = calculateLRV(hex);
      const rgbObj = hexToRgb(hex);
      const rgbStr = rgbObj ? `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}` : '128, 128, 128';

      selectActiveColor({
        id: 'custom-' + Date.now(),
        name: 'Bespoke Custom Shade',
        hex: hex,
        rgb: rgbStr,
        lrv: lrv,
        mood: 'Modern',
        category: 'Custom',
        undertone: 'Custom Pigment'
      });
    });

    // HEX field input
    DOM.hexTextInput.addEventListener('change', (e) => {
      let val = e.target.value.trim().replace('#', '');
      if (val.length === 3) val = val.split('').map(c => c + c).join('');
      if (/^[0-9A-Fa-f]{6}$/.test(val)) {
        const hex = '#' + val.toUpperCase();
        const lrv = calculateLRV(hex);
        const rgbObj = hexToRgb(hex);
        selectActiveColor({
          id: 'custom-' + Date.now(),
          name: 'Bespoke Custom Shade',
          hex: hex,
          rgb: `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`,
          lrv: lrv,
          mood: 'Modern',
          category: 'Custom',
          undertone: 'Architectural Formula'
        });
      } else {
        showToast('Invalid HEX format. Use 6 characters (e.g. 74608F).', 'error');
        DOM.hexTextInput.value = state.activeColor.hex.replace('#', '');
      }
    });

    // Finish sheen pills
    DOM.finishPills.forEach(pill => {
      pill.addEventListener('click', () => {
        playTactileClick();
        DOM.finishPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeFinish = pill.getAttribute('data-finish');
        updateSheenPreview(state.activeFinish);
      });
    });

    // Curated palette swatch clicks
    document.querySelectorAll('.palette-swatch-item').forEach(item => {
      item.addEventListener('click', () => {
        const hex = item.getAttribute('data-hex');
        const name = item.getAttribute('data-name');
        const found = CURATED_COLORS.find(c => c.hex.toLowerCase() === hex.toLowerCase());
        if (found) {
          selectActiveColor(found);
        } else {
          selectActiveColor({
            id: 'preset-' + hex,
            name: name,
            hex: hex,
            rgb: Object.values(hexToRgb(hex)).join(', '),
            lrv: calculateLRV(hex),
            mood: 'Luxury',
            category: 'Curated'
          });
        }
      });
    });

    DOM.backToStep1Btn.addEventListener('click', () => goToStudioStep(1));
    DOM.proceedToVisualizerBtn.addEventListener('click', () => goToStudioStep(3));
  }

  function updateSheenPreview(finish) {
    const sheenBox = DOM.activeSwatchPreview.querySelector('.finish-sheen-preview');
    if (!sheenBox) return;
    sheenBox.className = 'finish-sheen-preview';
    if (finish === 'Matte') sheenBox.classList.add('sheen-matte');
    else if (finish === 'Eggshell') sheenBox.classList.add('sheen-eggshell');
    else if (finish === 'Satin') sheenBox.classList.add('sheen-satin');
    else if (finish === 'Semi-Gloss') sheenBox.classList.add('sheen-semi-gloss');
  }

  // =========================================================================
  // 11. STEP 3: DUAL-TONE WALL RECOLORING & SIMULATION
  // =========================================================================
  function renderRoomVisualization() {
    state.isGenerating = true;

    DOM.generationLoader.classList.remove('hidden');
    DOM.progressBarFill.style.width = '10%';
    DOM.loaderPercentage.textContent = '10%';
    DOM.loaderStepText.textContent = 'Analyzing room geometry & wall plane depth...';

    setTimeout(() => {
      DOM.progressBarFill.style.width = '45%';
      DOM.loaderPercentage.textContent = '45%';
      DOM.loaderStepText.textContent = (state.wallMode === 'accent') ? 
        `Isolating accent feature plane (${state.activeAccentColor.name}) & main walls...` :
        `Isolating wall surfaces & applying ${state.activeMainColor.name}...`;
    }, 400);

    setTimeout(() => {
      DOM.progressBarFill.style.width = '80%';
      DOM.loaderPercentage.textContent = '80%';
      DOM.loaderStepText.textContent = `Calibrating Kelvin lighting: ${getLightingKelvinText(state.lightingMode)}...`;
    }, 850);

    setTimeout(() => {
      DOM.progressBarFill.style.width = '100%';
      DOM.loaderPercentage.textContent = '100%';
      executeCanvasRecolor();
      DOM.generationLoader.classList.add('hidden');
      state.isGenerating = false;
      playHarmonicChord();
      showToast(`AI Wall Recoloring Applied (${state.wallMode === 'accent' ? 'Dual-Tone Accent' : 'All Walls'})`, 'success');
    }, 1250);
  }

  function executeCanvasRecolor() {
    const canvas = DOM.recolorCanvas;
    const sideCanvas = DOM.sideRecolorCanvas;
    const ctx = canvas.getContext('2d');
    const sideCtx = sideCanvas ? sideCanvas.getContext('2d') : null;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width || 1000;
      canvas.height = img.height || 650;
      if (sideCanvas) {
        sideCanvas.width = canvas.width;
        sideCanvas.height = canvas.height;
      }

      // Draw base photo
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mainRgb = hexToRgb(state.activeMainColor.hex) || { r: 116, g: 96, b: 143 };
      const accentRgb = hexToRgb(state.activeAccentColor.hex) || { r: 233, g: 217, b: 233 };

      ctx.save();

      if (state.wallMode === 'accent') {
        // Dual Tone: Feature Wall (Center region x: 15% to 85%) gets Accent Color,
        // side walls get Main Color!
        // 1. Perspective Side Walls (Left & Right)
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width * 0.18, canvas.height * 0.8);
        ctx.rect(canvas.width * 0.82, 0, canvas.width * 0.18, canvas.height * 0.8);
        ctx.clip();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = `rgb(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.8);
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = `rgb(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.8);
        ctx.restore();

        // 2. Center Accent Feature Wall
        ctx.save();
        ctx.beginPath();
        ctx.rect(canvas.width * 0.18, 0, canvas.width * 0.64, canvas.height * 0.78);
        ctx.clip();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.78);
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.78);
        ctx.restore();
      } else {
        // All Walls Mode
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height * 0.78);
        ctx.clip();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = `rgb(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.78);
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = `rgb(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.78);
      }

      // Finish sheen adjustment
      if (state.activeFinish === 'Satin' || state.activeFinish === 'Semi-Gloss') {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.78);
      }
      ctx.restore();

      if (sideCtx) {
        sideCtx.drawImage(canvas, 0, 0);
      }

      DOM.originalRoomImg.src = state.roomImageSrc;
      if (DOM.sideBeforeImg) DOM.sideBeforeImg.src = state.roomImageSrc;
    };
    img.src = state.roomImageSrc;
  }

  function getLightingKelvinText(mode) {
    if (mode === 'morning') return '5,500K Morning Sun';
    if (mode === 'evening') return '2,700K Warm Evening';
    return '4,000K Studio Neutral';
  }

  function updateVisualizerDetails() {
    const color = (state.wallMode === 'accent') ? state.activeAccentColor : state.activeMainColor;
    DOM.visualizerRoomName.textContent = state.roomName;
    DOM.vizChip.style.backgroundColor = color.hex;
    DOM.vizShadeName.textContent = (state.wallMode === 'accent') ? 
      `Accent: ${state.activeAccentColor.name} + Main: ${state.activeMainColor.name}` :
      `${color.name} (${color.hex})`;

    DOM.afterTagLabel.textContent = (state.wallMode === 'accent') ? 'Dual-Tone Feature Wall' : `${color.name} Recolor`;

    DOM.detailSwatchSample.style.backgroundColor = color.hex;
    DOM.detailSheenLabel.textContent = `${state.activeFinish} Finish`;
    DOM.detailColorTitle.textContent = color.name;
    if (DOM.detailFormulaCode) {
      DOM.detailFormulaCode.textContent = `WL-${color.hex.replace('#', '')}-${color.name.substring(0, 5).toUpperCase()}`;
    }

    DOM.specValHex.textContent = color.hex.toUpperCase();
    DOM.specValRgb.textContent = color.rgb || Object.values(hexToRgb(color.hex)).join(', ');
    DOM.specValLrv.textContent = `${color.lrv}% (${color.lrv > 50 ? 'High Reflectance' : 'Deep Tone'})`;
    DOM.specValUndertone.textContent = color.undertone || 'Architectural Neutral';

    updateBrandCodes(color);
  }

  // =========================================================================
  // 12. BEFORE/AFTER COMPARISON SLIDER & LIGHTING SIMULATOR
  // =========================================================================
  function initVisualizerSlider() {
    let isDragging = false;

    function updateSplitPosition(clientX) {
      const rect = DOM.comparisonViewport.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const pct = (offsetX / rect.width) * 100;

      state.sliderPos = pct;
      DOM.layerBefore.style.width = `${pct}%`;
      DOM.splitDivider.style.left = `${pct}%`;
      DOM.splitHandle.setAttribute('aria-valuenow', Math.round(pct));
    }

    DOM.comparisonViewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      isDragging = true;
      updateSplitPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSplitPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    DOM.comparisonViewport.addEventListener('touchstart', (e) => {
      if (e.target.closest('button')) return;
      isDragging = true;
      if (e.touches[0]) updateSplitPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSplitPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    DOM.splitHandle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        state.sliderPos = Math.max(0, state.sliderPos - 5);
        DOM.layerBefore.style.width = `${state.sliderPos}%`;
        DOM.splitDivider.style.left = `${state.sliderPos}%`;
      } else if (e.key === 'ArrowRight') {
        state.sliderPos = Math.min(100, state.sliderPos + 5);
        DOM.layerBefore.style.width = `${state.sliderPos}%`;
        DOM.splitDivider.style.left = `${state.sliderPos}%`;
      }
    });

    DOM.btnModeSlider.addEventListener('click', () => {
      playTactileClick();
      DOM.btnModeSlider.classList.add('active');
      DOM.btnModeSide.classList.remove('active');
      DOM.sideBySideContainer.classList.add('hidden');
      DOM.splitDivider.classList.remove('hidden');
      DOM.layerBefore.classList.remove('hidden');
      state.viewMode = 'slider';
    });

    DOM.btnModeSide.addEventListener('click', () => {
      playTactileClick();
      DOM.btnModeSide.classList.add('active');
      DOM.btnModeSlider.classList.remove('active');
      DOM.sideBySideContainer.classList.remove('hidden');
      DOM.splitDivider.classList.add('hidden');
      DOM.layerBefore.classList.add('hidden');
      state.viewMode = 'side-by-side';
    });

    DOM.resetViewBtn.addEventListener('click', () => {
      playTactileClick();
      state.sliderPos = 50;
      DOM.layerBefore.style.width = '50%';
      DOM.splitDivider.style.left = '50%';
      showToast('Split slider reset to 50%', 'info');
    });

    // Lighting Simulator buttons
    DOM.lightingModeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        playLuxuryChime(698.46);
        DOM.lightingModeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const light = btn.getAttribute('data-light');
        state.lightingMode = light;
        applyLightingMode(light);
      });
    });

    DOM.regenerateBtn.addEventListener('click', () => renderRoomVisualization());
    DOM.tryAnotherColorBtn.addEventListener('click', () => goToStudioStep(2));
    DOM.saveDesignBtn.addEventListener('click', saveCurrentDesign);
    DOM.downloadPreviewBtn.addEventListener('click', downloadDesignDeck);
    DOM.exportPdfBtn.addEventListener('click', openPrintableSpecSheet);

    DOM.openCalculatorBtn.addEventListener('click', () => {
      playTactileClick();
      calculatePaintMetrics();
      DOM.calculatorModal.classList.remove('hidden');
    });
  }

  function applyLightingMode(mode) {
    const overlay = DOM.lightingFilterOverlay;
    overlay.className = 'lighting-overlay-filter';
    if (mode === 'morning') {
      overlay.classList.add('light-morning');
      showToast('Lighting set to Morning Sun (5,500K Daylight)', 'info');
    } else if (mode === 'evening') {
      overlay.classList.add('light-evening');
      showToast('Lighting set to Warm Evening (2,700K Golden Glow)', 'info');
    } else {
      overlay.classList.add('light-neutral');
      showToast('Lighting set to Studio Neutral (4,000K Balanced CRI 98)', 'info');
    }
  }

  // =========================================================================
  // 13. ARCHITECTURAL PAINT VOLUME & BUDGET ESTIMATOR
  // =========================================================================
  function calculatePaintMetrics() {
    const length = parseFloat(DOM.calcLength.value) || 14;
    const width = parseFloat(DOM.calcWidth.value) || 12;
    const height = parseFloat(DOM.calcHeight.value) || 9;
    const coats = parseInt(DOM.calcCoats.value, 10) || 2;
    const openings = parseFloat(DOM.calcOpenings.value) || 0.15;
    const pricePerGallon = parseFloat(DOM.calcPrice.value) || 65;

    // Formula
    const perimeter = 2 * (length + width);
    const grossArea = Math.round(perimeter * height);
    const netArea = Math.round(grossArea * (1 - openings));
    // Standard coverage: 350-400 sq ft per gallon (using 375 sq ft)
    const gallonsNeeded = ((netArea * coats) / 375);
    const roundedGallons = Math.round(gallonsNeeded * 10) / 10;
    const litersNeeded = Math.round(gallonsNeeded * 3.78541 * 10) / 10;
    const totalCost = Math.round(gallonsNeeded * pricePerGallon * 100) / 100;

    state.calculator = {
      length, width, height, coats, openings, pricePerGallon,
      grossArea, netArea, gallons: roundedGallons, liters: litersNeeded, totalBudget: totalCost
    };

    DOM.calcGrossArea.textContent = `${grossArea} sq ft (${(grossArea * 0.0929).toFixed(1)} m²)`;
    DOM.calcNetArea.textContent = `${netArea} sq ft (${(netArea * 0.0929).toFixed(1)} m²)`;
    DOM.calcGallons.textContent = `${roundedGallons} Gallons`;
    DOM.calcLiters.textContent = `(~${litersNeeded} Liters)`;
    DOM.calcBudget.textContent = `$${totalCost.toFixed(2)}`;
  }

  function initCalculatorHandlers() {
    [DOM.calcLength, DOM.calcWidth, DOM.calcHeight, DOM.calcPrice].forEach(input => {
      input.addEventListener('input', calculatePaintMetrics);
    });
    [DOM.calcCoats, DOM.calcOpenings].forEach(select => {
      select.addEventListener('change', calculatePaintMetrics);
    });

    DOM.closeCalculatorModalBtn.addEventListener('click', () => {
      DOM.calculatorModal.classList.add('hidden');
    });

    DOM.applyCalcBtn.addEventListener('click', () => {
      playHarmonicChord();
      DOM.calculatorModal.classList.add('hidden');
      showToast(`Saved: ${state.calculator.gallons} Gallons ($${state.calculator.totalBudget.toFixed(2)})`, 'success');
    });
  }

  // =========================================================================
  // 14. PRINTABLE CLIENT ARCHITECTURAL SPEC SHEET (PDF)
  // =========================================================================
  function openPrintableSpecSheet() {
    playTactileClick();
    calculatePaintMetrics();

    const activeCol = (state.wallMode === 'accent') ? state.activeAccentColor : state.activeMainColor;

    DOM.printProjectName.textContent = `${state.roomName} (${state.roomType})`;
    DOM.printDate.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    DOM.printBeforeImg.src = state.roomImageSrc;
    DOM.printAfterImg.src = DOM.recolorCanvas.toDataURL('image/png');

    DOM.printShadeName.textContent = activeCol.name;
    DOM.printHexCode.textContent = activeCol.hex.toUpperCase();
    DOM.printLrvVal.textContent = `${activeCol.lrv}%`;
    DOM.printSheenVal.textContent = state.activeFinish;

    const brands = activeCol.brands || { sw: 'SW 6544', bm: 'BM 1406' };
    DOM.printSwVal.textContent = brands.sw;
    DOM.printBmVal.textContent = brands.bm;

    DOM.printNetArea.textContent = `${state.calculator.netArea} sq ft`;
    DOM.printCoats.textContent = `${state.calculator.coats} Full Coats`;
    DOM.printVolume.textContent = `${state.calculator.gallons} Gallons (~${state.calculator.liters} Liters)`;
    DOM.printCost.textContent = `$${state.calculator.totalBudget.toFixed(2)}`;

    showToast('Preparing Architectural Spec Sheet for Print / PDF export...', 'info', 2000);
    setTimeout(() => {
      window.print();
    }, 300);
  }

  // =========================================================================
  // 15. SAVING & DOWNLOADING DESIGNS (PORTFOLIO ENGINE)
  // =========================================================================
  function loadSavedDesigns() {
    try {
      const data = localStorage.getItem('wallora_saved_designs_v1');
      if (data) {
        state.savedDesigns = JSON.parse(data);
      } else {
        state.savedDesigns = [
          {
            id: 'proj-init-1',
            title: 'Nordic Salon Refresh',
            roomType: 'Living Room',
            roomName: 'Nordic Living Salon',
            color: CURATED_COLORS[0],
            finish: 'Eggshell',
            lighting: 'Morning Sun (5,500K)',
            date: 'Oct 30, 2026',
            isFavorite: true,
            thumbSrc: 'assets/presets/room_living_after.svg'
          }
        ];
        saveDesignsToStorage();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, running in memory mode.', e);
    }
    updateSavedCountBadge();
  }

  function saveDesignsToStorage() {
    try {
      localStorage.setItem('wallora_saved_designs_v1', JSON.stringify(state.savedDesigns));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
    updateSavedCountBadge();
  }

  function updateSavedCountBadge() {
    if (DOM.navSavedCount) {
      DOM.navSavedCount.textContent = state.savedDesigns.length;
    }
  }

  function saveCurrentDesign() {
    const activeCol = (state.wallMode === 'accent') ? state.activeAccentColor : state.activeMainColor;
    const now = new Date();
    const newDesign = {
      id: 'proj-' + Date.now(),
      title: `${state.roomName} • ${activeCol.name}`,
      roomType: state.roomType,
      roomName: state.roomName,
      color: { ...activeCol },
      finish: state.activeFinish,
      lighting: state.lightingMode,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: now.toISOString(),
      isFavorite: false,
      thumbSrc: (DOM.recolorCanvas && typeof DOM.recolorCanvas.toDataURL === 'function') ? DOM.recolorCanvas.toDataURL('image/png') : (state.roomImageSrc || 'assets/presets/room_living_after.svg')
    };

    state.savedDesigns.unshift(newDesign);
    saveDesignsToStorage();
    updateSavedCountBadge();
    refreshProfileUI();
    syncDesignToSupabase(newDesign);
    playHarmonicChord();

    if (window.confetti) {
      window.confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.8 },
        colors: ['#74608F', '#B7A1CF', '#C3A77D', '#E9D9E9']
      });
    }

    showToast('Design project saved to My Designs!', 'success');
  }

  function downloadDesignDeck() {
    playTactileClick();
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1200;
    exportCanvas.height = 800;
    const ctx = exportCanvas.getContext('2d');

    ctx.fillStyle = '#F7F0EB';
    ctx.fillRect(0, 0, 1200, 800);

    ctx.strokeStyle = '#C3A77D';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 760);

    ctx.fillStyle = '#1A1523';
    ctx.font = '700 32px "Playfair Display", serif';
    ctx.fillText('WALLORA AI — ARCHITECTURAL PAINT SPECIFICATION', 60, 75);

    ctx.fillStyle = '#74608F';
    ctx.font = '500 16px "Poppins", sans-serif';
    ctx.fillText(`PROJECT: ${state.roomName} (${state.roomType}) | MODE: ${state.wallMode.toUpperCase()} | DATE: ${new Date().toLocaleDateString()}`, 60, 105);

    const roomImg = DOM.recolorCanvas;
    ctx.drawImage(roomImg, 60, 130, 720, 480);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 130, 720, 480);

    const activeCol = (state.wallMode === 'accent') ? state.activeAccentColor : state.activeMainColor;
    ctx.fillStyle = activeCol.hex;
    ctx.fillRect(820, 130, 320, 160);
    ctx.strokeStyle = '#C3A77D';
    ctx.lineWidth = 3;
    ctx.strokeRect(820, 130, 320, 160);

    ctx.fillStyle = '#1A1523';
    ctx.font = '700 24px "Playfair Display", serif';
    ctx.fillText(activeCol.name, 820, 330);

    ctx.font = '500 15px "Poppins", sans-serif';
    ctx.fillStyle = '#574F67';
    ctx.fillText(`HEX Code: ${activeCol.hex.toUpperCase()}`, 820, 365);
    ctx.fillText(`RGB Profile: ${activeCol.rgb}`, 820, 395);
    ctx.fillText(`LRV Rating: ${activeCol.lrv}% (Reflectance)`, 820, 425);
    ctx.fillText(`Sheen / Finish: ${state.activeFinish}`, 820, 455);
    ctx.fillText(`Lighting: ${getLightingKelvinText(state.lightingMode)}`, 820, 485);
    const brands = activeCol.brands || { sw: 'SW 6544' };
    ctx.fillText(`Match: ${brands.sw}`, 820, 515);

    ctx.fillStyle = 'rgba(116, 96, 143, 0.12)';
    ctx.fillRect(60, 640, 1080, 85);
    ctx.strokeStyle = 'rgba(195, 167, 125, 0.4)';
    ctx.strokeRect(60, 640, 1080, 85);

    ctx.fillStyle = '#282136';
    ctx.font = '500 13px "Poppins", sans-serif';
    ctx.fillText('ESTIMATED MATERIALS & COVERAGE:', 80, 670);
    ctx.fillStyle = '#574F67';
    ctx.font = '400 12px "Poppins", sans-serif';
    ctx.fillText(`Required Volume: ${state.calculator.gallons} Gallons (~${state.calculator.liters} Liters) for 2 coats. Estimated cost: $${state.calculator.totalBudget.toFixed(2)}.`, 80, 692);
    ctx.fillText('Actual paint pigment reacts to surface texture and sunlight. Always test a physical sample pot prior to comprehensive repainting.', 80, 710);

    const link = document.createElement('a');
    link.download = `Wallora-${state.roomName.replace(/\s+/g, '_')}-${activeCol.name.replace(/\s+/g, '_')}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    showToast('High-Resolution Design Deck downloaded (PNG)', 'success');
  }

  // =========================================================================
  // 16. VIEW 3: ARCHITECTURAL COLOR LIBRARY
  // =========================================================================
  function renderLibraryGrid(searchQuery = '', moodFilter = 'all') {
    const grid = DOM.librarySwatchesGrid;
    if (!grid) return;
    grid.innerHTML = '';

    const query = searchQuery.toLowerCase().trim();
    const filtered = CURATED_COLORS.filter(color => {
      const matchQuery = !query ||
        color.name.toLowerCase().includes(query) ||
        color.hex.toLowerCase().includes(query) ||
        color.mood.toLowerCase().includes(query);
      const matchMood = (moodFilter === 'all') || (color.mood.toLowerCase() === moodFilter.toLowerCase());
      return matchQuery && matchMood;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <p>No shades found matching your criteria.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(color => {
      const card = document.createElement('div');
      card.className = 'lib-swatch-card';
      const brands = color.brands || { sw: 'SW Match' };
      card.innerHTML = `
        <div class="lib-color-thumb" style="background-color: ${color.hex};">
          <span class="swatch-tag">${color.mood}</span>
        </div>
        <div class="lib-meta">
          <h4>${color.name}</h4>
          <div class="lib-specs">
            <span>HEX: ${color.hex.toUpperCase()}</span>
            <span>LRV: ${color.lrv}%</span>
          </div>
          <div class="lib-family-tag">${color.category} • ${brands.sw}</div>
          <p style="font-size: 0.8rem; margin-bottom: 1rem;">${color.desc || ''}</p>
          <button type="button" class="btn-apply-lib" data-hex="${color.hex}">Apply in Studio</button>
        </div>
      `;

      card.querySelector('.btn-apply-lib').addEventListener('click', () => {
        selectActiveColor(color);
        setView('studio');
        goToStudioStep(2);
        showToast(`Loaded ${color.name} into Studio`, 'success');
      });

      grid.appendChild(card);
    });
  }

  function initLibraryHandlers() {
    DOM.librarySearchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.lib-mood-pill.active');
      const mood = activePill ? activePill.getAttribute('data-filter-mood') : 'all';
      renderLibraryGrid(e.target.value, mood);
    });

    DOM.libMoodPills.forEach(pill => {
      pill.addEventListener('click', () => {
        playTactileClick();
        DOM.libMoodPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const mood = pill.getAttribute('data-filter-mood');
        renderLibraryGrid(DOM.librarySearchInput.value, mood);
      });
    });
  }

  // =========================================================================
  // 17. VIEW 4: MY DESIGNS GALLERY
  // =========================================================================
  function renderSavedDesignsSkeleton() {
    const grid = DOM.savedDesignsGrid;
    const empty = DOM.emptyDesignsState;
    if (!grid || !empty) return;
    empty.classList.add('hidden');
    grid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const card = document.createElement('div');
      card.className = 'design-project-card';
      card.innerHTML = `
        <div class="project-thumb-wrap skeleton" style="height: 180px;"></div>
        <div class="project-info-wrap">
          <div class="skeleton" style="height: 18px; width: 60%; margin-bottom: 10px;"></div>
          <div class="skeleton" style="height: 14px; width: 40%; margin-bottom: 10px;"></div>
          <div class="skeleton" style="height: 14px; width: 80%;"></div>
        </div>
      `;
      grid.appendChild(card);
    }
  }

  function renderSavedDesigns() {
    const grid = DOM.savedDesignsGrid;
    const empty = DOM.emptyDesignsState;
    if (!grid || !empty) return;

    grid.innerHTML = '';

    if (state.savedDesigns.length === 0) {
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');

    state.savedDesigns.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'design-project-card';
      card.innerHTML = `
        <div class="project-thumb-wrap">
          <img src="${proj.thumbSrc}" alt="${proj.title}" class="project-thumb-img">
          <button type="button" class="project-fav-btn ${proj.isFavorite ? 'is-fav' : ''}" title="Toggle Favorite">
            <i class="${proj.isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <span class="project-room-badge">${proj.roomType}</span>
        </div>
        <div class="project-info-wrap">
          <div class="project-title-row">
            <h4 class="project-title">${proj.title}</h4>
          </div>
          <div class="project-date"><i class="fa-regular fa-calendar"></i> ${proj.date}</div>
          <div class="project-color-bar">
            <span class="project-color-chip" style="background-color: ${proj.color.hex};"></span>
            <span class="project-color-name">${proj.color.name} (${proj.color.hex})</span>
          </div>
          <div class="project-card-actions">
            <button type="button" class="btn-luxury-secondary w-full btn-open-project">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Open
            </button>
            <button type="button" class="btn-icon btn-rename-project" title="Rename Project">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn-icon btn-delete-project" title="Delete Project">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.btn-open-project').addEventListener('click', () => {
        state.roomName = proj.roomName;
        state.roomType = proj.roomType;
        selectActiveColor(proj.color);
        state.activeFinish = proj.finish || 'Eggshell';
        if (['morning','evening','neutral'].includes(proj.lighting)) state.lightingMode = proj.lighting;
        setView('studio');
        goToStudioStep(3);
        showToast(`Opened project "${proj.title}"`, 'info');
      });

      card.querySelector('.project-fav-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        playTactileClick();
        proj.isFavorite = !proj.isFavorite;
        saveDesignsToStorage();
        renderSavedDesigns();
        refreshProfileUI();

        const db = window.wallora && window.wallora.db;
        if (db && db.client && proj._variantId) {
          db.toggleFav(proj._variantId, proj.isFavorite).catch(() => {});
        }
      });

      card.querySelector('.btn-rename-project').addEventListener('click', (e) => {
        e.stopPropagation();
        openRenameModal(proj.id, proj.title);
      });

      card.querySelector('.btn-delete-project').addEventListener('click', (e) => {
        e.stopPropagation();
        openDeleteModal(proj.id, proj.title);
      });

      grid.appendChild(card);
    });
  }

  function initDesignsHandlers() {
    DOM.designsCreateNewBtn.addEventListener('click', () => {
      setView('studio');
      goToStudioStep(1);
    });

    DOM.emptyCreateBtn.addEventListener('click', () => {
      setView('studio');
      goToStudioStep(1);
    });
  }

  // =========================================================================
  // 18. MODALS MANAGEMENT (SETTINGS, RENAME, DELETE)
  // =========================================================================
  // =========================================================================
  // PROFILE / AUTH (Supabase)
  // =========================================================================
  async function refreshProfileUI(userOverride) {
    const db = window.wallora && window.wallora.db;
    const local = readLocalProfile();
    const setHidden = (el, hidden) => { if (el) el.classList.toggle('hidden', !!hidden); };

    if (!db || !db.client) {
      if (local) {
        setHidden(DOM.profileUnconfigured, true);
        setHidden(DOM.profileSignedOut, true);
        setHidden(DOM.profileSignedIn, false);
        if (DOM.profileStatusDot) DOM.profileStatusDot.classList.remove('online');
        const name = local.display_name || 'Local Profile';
        const avatar = local.avatar_url || '';
        const initial = (name || 'U').trim().charAt(0).toUpperCase();
        setHidden(DOM.navUserChip, false);
        if (DOM.navUserName) DOM.navUserName.textContent = (name || '').split(' ')[0] || 'User';
        if (DOM.navUserAvatar) {
          if (avatar) { DOM.navUserAvatar.style.backgroundImage = `url(${avatar})`; DOM.navUserAvatar.textContent = ''; }
          else { DOM.navUserAvatar.style.backgroundImage = ''; DOM.navUserAvatar.textContent = initial; }
        }
        if (DOM.profileName) DOM.profileName.textContent = name;
        if (DOM.profileNameInput) DOM.profileNameInput.value = name;
        if (DOM.profileAvatarInput) DOM.profileAvatarInput.value = avatar;
        if (DOM.profileLocationInput) DOM.profileLocationInput.value = local.location || '';
        if (DOM.profileBioInput) DOM.profileBioInput.value = local.bio || '';
        if (DOM.profileEmail) DOM.profileEmail.textContent = local.email || 'Local profile (saved in this project)';
        if (DOM.profileAvatar) {
          if (avatar) { DOM.profileAvatar.style.backgroundImage = `url(${avatar})`; DOM.profileAvatar.textContent = ''; }
          else { DOM.profileAvatar.style.backgroundImage = ''; DOM.profileAvatar.textContent = initial; }
        }
        if (DOM.profileCreatedAt) DOM.profileCreatedAt.textContent = local.created_at ? new Date(local.created_at).toLocaleDateString() : '—';
        if (DOM.profileUpdatedAt) DOM.profileUpdatedAt.textContent = local.updated_at ? new Date(local.updated_at).toLocaleDateString() : '—';
      } else {
        setHidden(DOM.profileUnconfigured, false);
        setHidden(DOM.profileSignedOut, true);
        setHidden(DOM.profileSignedIn, true);
        if (DOM.profileStatusDot) DOM.profileStatusDot.classList.remove('online');
        setHidden(DOM.navUserChip, true);
        if (DOM.navUserName) DOM.navUserName.textContent = '';
        if (DOM.navUserAvatar) { DOM.navUserAvatar.style.backgroundImage = ''; DOM.navUserAvatar.textContent = ''; }
      }
    } else {
      let user = userOverride || null;
      if (!user) {
        try { user = await db.getUser(); } catch (e) { user = null; }
      }

      if (!user) {
        setHidden(DOM.profileUnconfigured, true);
        setHidden(DOM.profileSignedOut, false);
        setHidden(DOM.profileSignedIn, true);
        if (DOM.profileStatusDot) DOM.profileStatusDot.classList.remove('online');
        setHidden(DOM.navUserChip, true);
      } else {
        setHidden(DOM.profileUnconfigured, true);
        setHidden(DOM.profileSignedOut, true);
        setHidden(DOM.profileSignedIn, false);
        if (DOM.profileStatusDot) DOM.profileStatusDot.classList.add('online');

        const metaName = user.user_metadata?.full_name || user.user_metadata?.name || 'Wallora User';
        const email = user.email || '';
        const metaAvatar = user.user_metadata?.avatar_url || '';
        let profileRow = null;
        try {
          const { data } = await db.client.from('profiles').select('*').eq('id', user.id).maybeSingle();
          profileRow = data || null;
        } catch (e) { profileRow = null; }

        const localForUser = local && local.id === user.id ? local : null;
        const name = localForUser?.display_name || profileRow?.display_name || profileRow?.full_name || metaName;
        const avatar = localForUser?.avatar_url || profileRow?.avatar_url || metaAvatar;
        const location = localForUser?.location || profileRow?.location || '';
        const bio = localForUser?.bio || profileRow?.bio || '';
        const initial = (name || 'U').trim().charAt(0).toUpperCase();

        setHidden(DOM.navUserChip, false);
        if (DOM.navUserName) DOM.navUserName.textContent = (name || '').split(' ')[0] || 'User';
        if (DOM.navUserAvatar) {
          if (avatar) { DOM.navUserAvatar.style.backgroundImage = `url(${avatar})`; DOM.navUserAvatar.textContent = ''; }
          else { DOM.navUserAvatar.style.backgroundImage = ''; DOM.navUserAvatar.textContent = initial; }
        }
        if (DOM.profileName) DOM.profileName.textContent = name;
        if (DOM.profileNameInput) DOM.profileNameInput.value = name;
        if (DOM.profileAvatarInput) DOM.profileAvatarInput.value = avatar || '';
        if (DOM.profileLocationInput) DOM.profileLocationInput.value = location || '';
        if (DOM.profileBioInput) DOM.profileBioInput.value = bio || '';
        if (DOM.profileEmail) DOM.profileEmail.textContent = email;
        if (DOM.profileAvatar) {
          if (avatar) { DOM.profileAvatar.style.backgroundImage = `url(${avatar})`; DOM.profileAvatar.textContent = ''; }
          else { DOM.profileAvatar.style.backgroundImage = ''; DOM.profileAvatar.textContent = initial; }
        }
        if (DOM.profileCreatedAt) DOM.profileCreatedAt.textContent = profileRow?.created_at ? new Date(profileRow.created_at).toLocaleDateString() : (user.created_at ? new Date(user.created_at).toLocaleDateString() : '—');
        if (DOM.profileUpdatedAt) DOM.profileUpdatedAt.textContent = localForUser?.updated_at ? new Date(localForUser.updated_at).toLocaleDateString() : (profileRow?.updated_at ? new Date(profileRow.updated_at).toLocaleDateString() : '—');
      }
    }

    const favCount = state.savedDesigns.filter(d => d.isFavorite).length;
    const designCount = state.savedDesigns.length;
    document.querySelectorAll('#profile-design-count').forEach(el => { el.textContent = String(designCount); });
    document.querySelectorAll('#profile-fav-count').forEach(el => { el.textContent = String(favCount); });

    if (DOM.profileDesignsList) {
      DOM.profileDesignsList.innerHTML = '';
      const recent = state.savedDesigns.slice(0, 5);
      if (recent.length === 0) {
        DOM.profileDesignsList.innerHTML = '<p class="field-hint">No designs saved yet.</p>';
      } else {
        recent.forEach(d => {
          const item = document.createElement('div');
          item.className = 'project-color-bar';
          item.style.cursor = 'pointer';
          const chip = document.createElement('span');
          chip.className = 'project-color-chip';
          chip.style.backgroundColor = (d.color && d.color.hex) ? d.color.hex : '#74608F';
          const label = document.createElement('span');
          label.className = 'project-color-name';
          label.textContent = d.title || 'Untitled Design';
          item.appendChild(chip);
          item.appendChild(label);
          item.addEventListener('click', () => {
            state.roomName = d.roomName || state.roomName;
            state.roomType = d.roomType || state.roomType;
            if (d.color) selectActiveColor(d.color);
            state.activeFinish = d.finish || 'Eggshell';
            if (['morning','evening','neutral'].includes(d.lighting)) state.lightingMode = d.lighting;
            if (DOM.profileModal) DOM.profileModal.classList.add('hidden');
            setView('studio');
            goToStudioStep(3);
          });
          DOM.profileDesignsList.appendChild(item);
        });
      }
    }

    if (DOM.profilePrefSound) {
      DOM.profilePrefSound.querySelectorAll('.finish-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-value') === (state.soundEnabled ? 'on' : 'off'));
      });
    }
    if (DOM.profilePrefTheme) {
      const isDark = document.body.classList.contains('dark-mode');
      DOM.profilePrefTheme.querySelectorAll('.finish-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-value') === (isDark ? 'dark' : 'light'));
      });
    }
  }

  // =========================================================================
  // SUPABASE PROFILE + DESIGN SYNC
  // =========================================================================
  async function ensureProfile(user) {
    const db = window.wallora && window.wallora.db;
    if (!db || !db.client || !user) return;
    try {
      const { data: existing } = await db.client.from('profiles').select('id').eq('id', user.id).maybeSingle();
      if (!existing) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || 'Wallora User';
        const avatar = user.user_metadata?.avatar_url || null;
        await db.client.from('profiles').insert({ id: user.id, display_name: name, avatar_url: avatar });
      }
    } catch (e) {
      console.warn('Profile sync skipped:', e.message || e);
    }
  }

  function findColorByHex(hex) {
    if (!hex) return CURATED_COLORS[0];
    const found = CURATED_COLORS.find(c => c.hex.toLowerCase() === (hex || '').toLowerCase());
    if (found) return { ...found };
    const rgb = hexToRgb(hex) || { r: 128, g: 128, b: 128 };
    return {
      id: 'remote-' + hex,
      name: 'Custom Shade',
      hex: hex,
      rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
      lrv: calculateLRV(hex),
      mood: 'Modern',
      category: 'Custom',
      undertone: 'Custom',
      brands: { sw: 'SW Custom', bm: 'BM Custom', dulux: 'Custom', fb: 'Custom' }
    };
  }

  async function loadDesignsFromSupabase() {
    const db = window.wallora && window.wallora.db;
    if (!db || !db.client) return;
    try {
      const user = await db.getUser();
      if (!user) return;
      const { data, error } = await db.loadProjects();
      if (error || !Array.isArray(data) || data.length === 0) return;

      const mapped = data.map(p => {
        const v = (p.design_variants && p.design_variants[0]) || {};
        const color = findColorByHex(v.primary_color_hex || '#74608F');
        return {
          id: p.id,
          title: p.title || 'Untitled Design',
          roomType: p.room_type || 'Living Room',
          roomName: p.title || 'Untitled Design',
          color: color,
          finish: v.finish || 'Eggshell',
          lighting: v.lighting_mode || 'morning',
          date: p.created_at ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          isFavorite: !!v.is_favorite,
          thumbSrc: 'assets/presets/room_living_after.svg',
          _variantId: v.id || null
        };
      });

      state.savedDesigns = mapped;
      saveDesignsToStorage();
      updateSavedCountBadge();
      if (state.view === 'designs') renderSavedDesigns();
    } catch (e) {
      console.warn('Design sync load skipped:', e.message || e);
    }
  }

  async function syncDesignToSupabase(design) {
    const db = window.wallora && window.wallora.db;
    if (!db || !db.client) return;
    try {
      const user = await db.getUser();
      if (!user) return;
      await ensureProfile(user);

      const { data: project, error } = await db.saveProject({
        id: null,
        name: design.title,
        roomType: design.roomType,
        dimensions: null
      });
      if (error || !project) return;

      design.id = project.id;
      const variantRes = await db.saveVariant(project.id, {
        lightingMode: design.lighting || 'morning',
        primaryColor: design.color.hex,
        accentColor: null,
        isFavorite: !!design.isFavorite,
        notes: design.roomName
      });
      if (variantRes && variantRes.data) {
        design._variantId = variantRes.data.id;
      }
      saveDesignsToStorage();
    } catch (e) {
      console.warn('Design sync save skipped:', e.message || e);
    }
  }

  async function loadProfilePage(user) {
    const db = window.wallora && window.wallora.db;
    const local = readLocalProfile();
    const isLocalUser = !user || user.id === 'local-user' || !db || !db.client;

    // Header
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name || local?.display_name || 'Wallora User';
    const email = user?.email || local?.email || '';
    const avatar = user?.user_metadata?.avatar_url || local?.avatar_url || '';
    let profileRow = null;
    if (!isLocalUser && db && db.client) {
      try {
        const { data } = await db.client.from('profiles').select('*').eq('id', user.id).maybeSingle();
        profileRow = data || null;
      } catch (e) { profileRow = null; }
    }

    const displayName = local?.display_name || profileRow?.display_name || name;
    const displayAvatar = local?.avatar_url || profileRow?.avatar_url || avatar;
    const location = local?.location || profileRow?.location || '';
    const bio = local?.bio || profileRow?.bio || '';
    const preferences = profileRow?.preferences || local?.preferences || {};

    const nameEl = document.getElementById('profile-page-name');
    const emailEl = document.getElementById('profile-page-email');
    const avatarEl = document.getElementById('profile-page-avatar');
    const locEl = document.getElementById('profile-location');
    const verifiedEl = document.getElementById('profile-verified-badge');
    const memberSinceEl = document.getElementById('profile-member-since');

    if (nameEl) nameEl.textContent = displayName;
    if (emailEl) emailEl.textContent = email || (isLocalUser ? 'Local profile' : '');
    if (avatarEl) {
      if (displayAvatar) {
        avatarEl.style.backgroundImage = `url(${displayAvatar})`;
        avatarEl.textContent = '';
      } else {
        avatarEl.style.backgroundImage = '';
        avatarEl.textContent = (displayName || 'U').charAt(0).toUpperCase();
      }
    }
    if (locEl) {
      const locText = [location, bio].filter(Boolean).join(' • ');
      if (locText) { locEl.textContent = locText; locEl.style.display = 'inline-flex'; }
      else locEl.style.display = 'none';
    }
    if (verifiedEl) {
      if (user?.email_confirmed_at) verifiedEl.style.display = 'inline-flex';
      else verifiedEl.style.display = 'none';
    }
    if (memberSinceEl) {
      const created = profileRow?.created_at || local?.created_at || user?.created_at;
      memberSinceEl.textContent = created ? 'Member since ' + new Date(created).toLocaleDateString() : '';
    }

    // Stats
    let projects = [];
    if (!isLocalUser && db && db.loadProjects) {
      try {
        const { data } = await db.loadProjects();
        projects = Array.isArray(data) ? data : [];
      } catch (e) { projects = []; }
    }

    const palettesCount = projects.length || state.savedDesigns.length;
    const roomsCount = projects.length || state.savedDesigns.length;
    const favCount = projects.length
      ? projects.reduce((acc, p) => acc + (p.design_variants?.filter(v => v.is_favorite).length || 0), 0)
      : state.savedDesigns.filter(d => d.isFavorite).length;
    const created = profileRow?.created_at || local?.created_at || user?.created_at;
    const daysMember = created ? Math.max(0, Math.floor((Date.now() - new Date(created).getTime()) / 86400000)) : 0;

    const statPalettes = document.getElementById('stat-palettes');
    const statRooms = document.getElementById('stat-rooms');
    const statFavs = document.getElementById('stat-favorites');
    const statDays = document.getElementById('stat-days-member');
    if (statPalettes) statPalettes.textContent = palettesCount;
    if (statRooms) statRooms.textContent = roomsCount;
    if (statFavs) statFavs.textContent = favCount;
    if (statDays) statDays.textContent = daysMember;


    // Saved designs gallery
    const savedGrid = document.getElementById('profile-saved-designs');
    const savedEmpty = document.getElementById('profile-empty-designs');
    if (savedGrid) {
      savedGrid.innerHTML = '';
      const savedDesigns = projects.filter(p => true);
      if (savedDesigns.length === 0) {
        if (savedEmpty) savedEmpty.classList.remove('hidden');
      } else {
        if (savedEmpty) savedEmpty.classList.add('hidden');
        savedDesigns.forEach(p => {
          const v = (p.design_variants && p.design_variants[0]) || {};
          const card = document.createElement('div');
          card.className = 'design-project-card';
          card.innerHTML = `
            <div class="project-thumb-wrap">
              <img src="assets/presets/room_living_after.svg" alt="${p.title}" class="project-thumb-img" loading="lazy">
            </div>
            <div class="project-info-wrap">
              <h4 class="project-title">${p.title || 'Untitled'}</h4>
              <div class="project-color-bar">
                <span class="project-color-chip" style="background-color: ${v.primary_color_hex || '#74608F'};"></span>
                <span class="project-color-name">${v.primary_color_hex || ''}</span>
              </div>
            </div>
          `;
          card.addEventListener('click', () => {
            setView('studio');
            goToStudioStep(3);
          });
          savedGrid.appendChild(card);
        });
      }
    }

    // Favorite palettes gallery
    const favGrid = document.getElementById('profile-favorite-palettes');
    const favEmpty = document.getElementById('profile-empty-favorites');
    if (favGrid) {
      favGrid.innerHTML = '';
      const favProjects = projects.filter(p => (p.design_variants || []).some(v => v.is_favorite));
      if (favProjects.length === 0) {
        if (favEmpty) favEmpty.classList.remove('hidden');
      } else {
        if (favEmpty) favEmpty.classList.add('hidden');
        favProjects.forEach(p => {
          const v = (p.design_variants || []).find(x => x.is_favorite) || {};
          const card = document.createElement('div');
          card.className = 'design-project-card';
          card.innerHTML = `
            <div class="project-thumb-wrap">
              <img src="assets/presets/room_living_after.svg" alt="${p.title}" class="project-thumb-img" loading="lazy">
              <button type="button" class="project-fav-btn is-fav" title="Remove favorite"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="project-info-wrap">
              <h4 class="project-title">${p.title || 'Untitled'}</h4>
              <div class="project-color-bar">
                <span class="project-color-chip" style="background-color: ${v.primary_color_hex || '#74608F'};"></span>
                <span class="project-color-name">${v.primary_color_hex || ''}</span>
              </div>
            </div>
          `;
          const favBtn = card.querySelector('.project-fav-btn');
          if (favBtn) {
            favBtn.addEventListener('click', async (e) => {
              e.stopPropagation();
              if (v.id) {
                try { await db.toggleFav(v.id, false); } catch (e) {}
              }
              showToast('Removed from favorites.', 'info');
              loadProfilePage(user);
            });
          }
          favGrid.appendChild(card);
        });
      }
    }

    // Preferences
    const prefStyles = preferences.styles || [];
    const prefFamilies = preferences.families || [];
    const prefMoods = preferences.moods || [];
    const prefRooms = preferences.rooms || [];

    function setupPrefGroup(containerId, selectedArr) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.querySelectorAll('.finish-pill').forEach(btn => {
        const val = btn.getAttribute('data-pref');
        if (selectedArr.includes(val)) btn.classList.add('active');
        else btn.classList.remove('active');
        btn.onclick = () => btn.classList.toggle('active');
      });
    }
    setupPrefGroup('pref-styles', prefStyles);
    setupPrefGroup('pref-families', prefFamilies);
    setupPrefGroup('pref-moods', prefMoods);
    setupPrefGroup('pref-rooms', prefRooms);

    const savePrefBtn = document.getElementById('save-preferences-btn');
    if (savePrefBtn) {
      savePrefBtn.onclick = async () => {
        const styles = Array.from(document.querySelectorAll('#pref-styles .finish-pill.active')).map(b => b.getAttribute('data-pref'));
        const families = Array.from(document.querySelectorAll('#pref-families .finish-pill.active')).map(b => b.getAttribute('data-pref'));
        const moods = Array.from(document.querySelectorAll('#pref-moods .finish-pill.active')).map(b => b.getAttribute('data-pref'));
        const rooms = Array.from(document.querySelectorAll('#pref-rooms .finish-pill.active')).map(b => b.getAttribute('data-pref'));
        const prefs = { styles, families, moods, rooms };
        try {
          if (!isLocalUser && db && db.client && user && user.id) {
            try { await db.client.from('profiles').update({ preferences: prefs }).eq('id', user.id); } catch (e) { /* optional schema */ }
          }
          const localSaved = writeLocalProfile(buildProjectProfile(user, { preferences: prefs }));
          if (localSaved) showToast('Preferences saved.', 'success');
          else showToast('Preferences saved (local save unavailable).', 'info');
        } catch (e) {
          const localSaved = writeLocalProfile(buildProjectProfile(user, { preferences: prefs }));
          if (localSaved) showToast('Preferences saved locally.', 'success');
          else showToast('Failed to save preferences.', 'error');
        }
      };
    }

    // Recent activity
    const activityList = document.getElementById('profile-activity-list');
    if (activityList) {
      activityList.innerHTML = '';
      const activities = [];
      projects.forEach(p => {
        (p.design_variants || []).forEach(v => {
          activities.push({ text: `Saved palette "${p.title}"`, date: v.created_at ? new Date(v.created_at).toLocaleString() : '' });
        });
      });
      activities.sort((a, b) => (b.date > a.date ? 1 : -1));
      if (activities.length === 0) {
        activityList.innerHTML = '<p class="field-hint">No recent activity.</p>';
      } else {
        activities.slice(0, 10).forEach(a => {
          const row = document.createElement('div');
          row.className = 'calc-result-row';
          row.innerHTML = `<span>${a.text}</span><strong>${a.date}</strong>`;
          activityList.appendChild(row);
        });
      }
    }

    // Quick actions
    const settingsBtn = document.getElementById('profile-settings-btn');
    const logoutBtn = document.getElementById('profile-logout-btn');
    const editBtn = document.getElementById('edit-profile-btn');
    if (settingsBtn) settingsBtn.onclick = () => { document.getElementById('open-settings-btn')?.click(); };
    if (logoutBtn) logoutBtn.onclick = async () => {
      const db2 = window.wallora && window.wallora.db;
      if (db2 && db2.client) { try { await db2.signOut(); } catch (e) {} }
      showToast('Signed out.', 'info');
      setView('landing');
    };
    if (editBtn) editBtn.onclick = () => {
      const m = document.getElementById('profile-modal');
      if (m) m.classList.remove('hidden');
      refreshProfileUI(user);
    };
  }

  let statsCharts = { rooms: null, designs: null, colors: null };

  async function loadStatisticsPage(user) {
    const db = window.wallora && window.wallora.db;
    const safeUser = user || { id: 'local-user' };

    // date range
    const rangeBtns = document.querySelectorAll('#stats-range-filter .finish-pill');
    let range = 'all';
    rangeBtns.forEach(b => {
      if (b.classList.contains('active')) range = b.getAttribute('data-range');
    });

    function inRange(dateStr) {
      if (!dateStr) return range === 'all';
      if (range === 'all') return true;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return true;
      const now = new Date();
      const days = (range === '7') ? 7 : (range === '30' ? 30 : 90);
      const cutoff = new Date(now.getTime() - days * 86400000);
      return d >= cutoff;
    }

    let projects = [];
    if (db && db.client && db.loadProjects && safeUser.id !== 'local-user') {
      try {
        const { data } = await db.loadProjects();
        projects = Array.isArray(data) ? data : [];
      } catch (e) { projects = []; }
    }

    // Fallback to local saved designs so Statistics shows designs the user actually created
    if (!projects.length && Array.isArray(state.savedDesigns) && state.savedDesigns.length) {
      projects = state.savedDesigns.map(d => {
        const created = d.createdAt || (typeof d.id === 'string' && d.id.startsWith('proj-') ? new Date(Number(d.id.replace('proj-', '')) || Date.now()).toISOString() : null) || d.date || new Date().toISOString();
        return {
          id: d.id,
          title: d.title || d.roomName || 'Untitled Design',
          room_type: d.roomType || 'Other',
          created_at: created,
          updated_at: created,
          design_variants: [{
            id: d._variantId || null,
            lighting_mode: d.lighting || 'morning',
            primary_color_hex: d.color?.hex || '#74608F',
            is_favorite: !!d.isFavorite,
            created_at: created
          }]
        };
      });
    }

    const filteredProjects = projects.filter(p => inRange(p.created_at || p.updated_at));

    // overview
    const rooms = filteredProjects.length;
    const designs = filteredProjects.length;
    const palettes = filteredProjects.length;
    const favorites = filteredProjects.reduce((a, p) => a + (p.design_variants?.filter(v => v.is_favorite).length || 0), 0);

    // ai usage (best effort)
    let aiUsed = 0;
    if (db && db.client && safeUser.id !== 'local-user') {
      try {
        const periodStart = new Date();
        periodStart.setDate(1);
        const periodStr = periodStart.toISOString().slice(0, 10);
        const { data: usage } = await db.client.from('ai_usage').select('*').eq('user_id', safeUser.id).eq('period_start', periodStr).maybeSingle();
        aiUsed = usage?.generation_count || 0;
      } catch (e) {}
    }

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('stat-total-rooms', rooms);
    set('stat-total-designs', designs);
    set('stat-saved-palettes', palettes);
    set('stat-favorite-designs', favorites);
    set('stat-ai-generations', aiUsed);

    // period label
    const labelMap = { '7': 'Last 7 Days', '30': 'Last 30 Days', '90': 'Last 3 Months', 'all': 'All Time' };
    const labelEl = document.getElementById('stats-period-label');
    if (labelEl) labelEl.textContent = labelMap[range] || 'All Time';

    // room type breakdown
    const roomCounts = {};
    filteredProjects.forEach(p => {
      const t = p.room_type || 'Other';
      roomCounts[t] = (roomCounts[t] || 0) + 1;
    });
    const breakdownEl = document.getElementById('room-type-breakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = '';
      const entries = Object.entries(roomCounts).sort((a,b)=>b[1]-a[1]);
      if (entries.length === 0) {
        breakdownEl.innerHTML = '<p class="field-hint">No data yet. Upload a room in Studio and save a design to see room statistics.</p>';
      } else {
        entries.forEach(([type, count]) => {
          const row = document.createElement('div');
          row.className = 'calc-result-row';
          row.innerHTML = `<span>${type}</span><strong>${count} ${count === 1 ? 'design' : 'designs'}</strong>`;
          breakdownEl.appendChild(row);
        });
      }
    }

    // color family distribution (from CURATED_COLORS lookup)
    const familyCounts = {};
    filteredProjects.forEach(p => {
      const v = (p.design_variants && p.design_variants[0]) || {};
      const hex = v.primary_color_hex;
      const found = CURATED_COLORS.find(c => c.hex.toLowerCase() === (hex || '').toLowerCase());
      const fam = found ? found.category : 'Custom';
      familyCounts[fam] = (familyCounts[fam] || 0) + 1;
    });

    // insights
    const insightsEl = document.getElementById('stats-insights');
    if (insightsEl) {
      insightsEl.innerHTML = '';
      if (!filteredProjects.length) {
        insightsEl.innerHTML = '<p class="field-hint">No insights yet. Start by uploading a room in Studio, applying a color, and saving your design.</p>';
      } else {
        const mostRoom = Object.entries(roomCounts).sort((a,b)=>b[1]-a[1])[0];
        const mostFamily = Object.entries(familyCounts).sort((a,b)=>b[1]-a[1])[0];
        const mostPalette = filteredProjects[0].title || 'Untitled Design';
        const lines = [
          ['Most visualized room type', mostRoom ? `${mostRoom[0]} (${mostRoom[1]})` : '-'],
          ['Most used color family', mostFamily ? `${mostFamily[0]} (${mostFamily[1]})` : '-'],
          ['Most recent design', mostPalette],
          ['Total designs in period', String(filteredProjects.length)]
        ];
        lines.forEach(([label, value]) => {
          const row = document.createElement('div');
          row.className = 'calc-result-row';
          row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
          insightsEl.appendChild(row);
        });
      }
    }

    // created designs list (user-created designs in selected period)
    const createdListEl = document.getElementById('stats-created-designs');
    if (createdListEl) {
      createdListEl.innerHTML = '';
      const created = filteredProjects.slice().sort((a,b) => new Date(b.created_at || b.updated_at || 0).getTime() - new Date(a.created_at || a.updated_at || 0).getTime());
      if (!created.length) {
        createdListEl.innerHTML = '<p class="field-hint">No designs created in this period. Save a design in Studio to see it here.</p>';
      } else {
        created.slice(0, 8).forEach(p => {
          const row = document.createElement('div');
          row.className = 'calc-result-row';
          const when = p.created_at || p.updated_at;
          let date = '';
          try { date = when ? new Date(when).toLocaleString() : ''; } catch (e) { date = ''; }
          const type = p.room_type ? ` • ${p.room_type}` : '';
          row.innerHTML = `<span>${p.title || 'Untitled Design'}${type}</span><strong>${date || '-'}</strong>`;
          createdListEl.appendChild(row);
        });
      }
    }

    // recent activity
    const activityEl = document.getElementById('stats-activity');
    if (activityEl) {
      activityEl.innerHTML = '';
      const activities = [];
      filteredProjects.forEach(p => {
        const variants = Array.isArray(p.design_variants) ? p.design_variants : [];
        if (variants.length) {
          variants.forEach(v => {
            const when = v.created_at || p.created_at || p.updated_at;
            let date = '';
            try { date = when ? new Date(when).toLocaleString() : ''; } catch (e) { date = ''; }
            activities.push({ text: `Saved design "${p.title || 'Untitled Design'}"`, date, ts: when ? new Date(when).getTime() : 0 });
          });
        } else {
          const when = p.created_at || p.updated_at;
          let date = '';
          try { date = when ? new Date(when).toLocaleString() : ''; } catch (e) { date = ''; }
          activities.push({ text: `Saved design "${p.title || 'Untitled Design'}"`, date, ts: when ? new Date(when).getTime() : 0 });
        }
      });
      activities.sort((a,b) => (b.ts || 0) - (a.ts || 0));
      if (activities.length === 0) {
        activityEl.innerHTML = '<p class="field-hint">No recent activity. Your saved designs and palette actions will appear here.</p>';
      } else {
        activities.slice(0, 10).forEach(a => {
          const row = document.createElement('div');
          row.className = 'calc-result-row';
          row.innerHTML = `<span>${a.text}</span><strong>${a.date || '-'}</strong>`;
          activityEl.appendChild(row);
        });
      }
    }

    // Charts (Chart.js)
    if (window.Chart) {
      // Room visualization / design activity - group user-created designs by day
      const dayCounts = {};
      filteredProjects.forEach(p => {
        const raw = p.created_at || p.updated_at;
        const d = raw ? new Date(raw) : null;
        if (!d || isNaN(d.getTime())) return;
        const key = d.toISOString().slice(0, 10);
        dayCounts[key] = (dayCounts[key] || 0) + 1;
      });
      const days = Object.keys(dayCounts).sort();
      const designsByDay = days.map(d => dayCounts[d]);

      const roomsCtx = document.getElementById('chart-rooms');
      if (roomsCtx) {
        if (statsCharts.rooms) statsCharts.rooms.destroy();
        statsCharts.rooms = new Chart(roomsCtx, {
          type: 'line',
          data: { labels: days, datasets: [{ label: 'Rooms Visualized', data: designsByDay, borderColor: '#74608F', backgroundColor: 'rgba(116,96,143,0.15)', tension: 0.3, fill: true }] },
          options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }
        });
      }

      // Design creation activity (bar) - user-created designs by day
      const designsCtx = document.getElementById('chart-designs');
      if (designsCtx) {
        if (statsCharts.designs) statsCharts.designs.destroy();
        statsCharts.designs = new Chart(designsCtx, {
          type: 'bar',
          data: { labels: days.length ? days : ['No designs yet'], datasets: [{ label: 'Designs Created', data: days.length ? designsByDay : [0], backgroundColor: '#B7A1CF', borderRadius: 8 }] },
          options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }
        });
      }

      // Favorite color families (donut)
      const colorsCtx = document.getElementById('chart-colors');
      if (colorsCtx) {
        if (statsCharts.colors) statsCharts.colors.destroy();
        const famLabels = Object.keys(familyCounts);
        const famData = Object.values(familyCounts);
        statsCharts.colors = new Chart(colorsCtx, {
          type: 'doughnut',
          data: { labels: famLabels, datasets: [{ data: famData, backgroundColor: ['#74608F','#B7A1CF','#D9B8CE','#E9D9E9','#C3A77D','#5E6F74'] }] },
          options: { responsive: true }
        });
      }
    }

    // Stats page actions
    const statsGoStudioBtn = document.getElementById('stats-go-studio-btn');
    const statsGoDesignsBtn = document.getElementById('stats-go-designs-btn');
    if (statsGoStudioBtn) statsGoStudioBtn.addEventListener('click', () => { playTactileClick(); setView('studio'); goToStudioStep(1); });
    if (statsGoDesignsBtn) statsGoDesignsBtn.addEventListener('click', () => { playTactileClick(); setView('designs'); });

    // filter handlers
    rangeBtns.forEach(btn => {
      btn.onclick = () => {
        rangeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadStatisticsPage(safeUser);
      };
    });
  }

  function initProfileHandlers() {
    if (DOM.profileBtn) {
      DOM.profileBtn.addEventListener('click', async () => {
        playTactileClick();
        const db = window.wallora && window.wallora.db;
        if (!db || !db.client) {
          applyLocalProfile(readLocalProfile());
          setView('profile');
          return;
        }
        try {
          const user = await db.getUser();
          if (user) setView('profile');
          else {
            applyLocalProfile(readLocalProfile());
            const m = document.getElementById('profile-modal');
            if (m) m.classList.remove('hidden');
            refreshProfileUI();
          }
        } catch (e) {
          applyLocalProfile(readLocalProfile());
          const m = document.getElementById('profile-modal');
          if (m) m.classList.remove('hidden');
          refreshProfileUI();
        }
      });
    }

    if (DOM.closeProfileModalBtn) {
      DOM.closeProfileModalBtn.addEventListener('click', () => {
        if (DOM.profileModal) DOM.profileModal.classList.add('hidden');
      });
    }

    if (DOM.signinBtn) {
      DOM.signinBtn.addEventListener('click', async () => {
        playTactileClick();
        const db = window.wallora && window.wallora.db;
        if (!db || !db.client) {
          showToast('Supabase is not configured. Configure it in Settings to sign in.', 'info');
          return;
        }
        const email = (DOM.authEmailInput?.value || '').trim();
        const password = DOM.authPasswordInput?.value || '';
        if (!email || !password) {
          showToast('Email and password are required.', 'error');
          return;
        }
        try {
          const { data, error } = await db.signInEmail(email, password);
          if (error) {
            const msg = (error.message || '').toLowerCase();
            if (msg.includes('not confirmed') || msg.includes('email not confirmed')) {
              showToast('Please confirm your email first. Check your inbox.', 'error');
            } else {
              showToast('Sign-in failed: ' + (error.message || error), 'error');
            }
            return;
          }
          const user = data?.user || (await db.getUser());
          showToast('Signed in successfully.', 'success');
          if (DOM.profileModal) DOM.profileModal.classList.add('hidden');
          await ensureProfile(user);
          await loadDesignsFromSupabase();
          refreshProfileUI(user);
        } catch (e) {
          showToast('Sign-in failed: ' + (e.message || e), 'error');
        }
      });
    }

    if (DOM.signupBtn) {
      DOM.signupBtn.addEventListener('click', async () => {
        playTactileClick();
        const db = window.wallora && window.wallora.db;
        if (!db || !db.client) {
          showToast('Supabase is not configured. Configure it in Settings to create an account.', 'info');
          return;
        }
        const name = (DOM.authNameInput?.value || '').trim();
        const email = (DOM.authEmailInput?.value || '').trim();
        const password = DOM.authPasswordInput?.value || '';
        if (!email || !password) {
          showToast('Email and password are required.', 'error');
          return;
        }
        if (password.length < 6) {
          showToast('Password must be at least 6 characters.', 'error');
          return;
        }
        try {
          const { data, error } = await db.signUpEmail(email, password, name);
          if (error) {
            showToast('Sign-up failed: ' + (error.message || error), 'error');
            return;
          }
          showToast('Account created. Check your email if confirmation is required.', 'success');
          if (data?.user) {
            await ensureProfile(data.user);
            await loadDesignsFromSupabase();
            refreshProfileUI(data.user);
          } else {
            showToast('Account created. Please confirm your email, then sign in.', 'info');
          }
        } catch (e) {
          showToast('Sign-up failed: ' + (e.message || e), 'error');
        }
      });
    }

    if (DOM.profileSignoutBtn) {
      DOM.profileSignoutBtn.addEventListener('click', async () => {
        playTactileClick();
        const db = window.wallora && window.wallora.db;
        if (db && db.client) {
          try { await db.signOut(); } catch (e) {}
        }
        if (DOM.profileModal) DOM.profileModal.classList.add('hidden');
        showToast('Signed out.', 'info');
        refreshProfileUI();
      });
    }

    // Preference pills
    document.querySelectorAll('#profile-pref-sound .finish-pill, #profile-pref-theme .finish-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        playTactileClick();
        const pref = pill.getAttribute('data-pref');
        const val = pill.getAttribute('data-value');
        if (pref === 'sound') {
          state.soundEnabled = (val === 'on');
          if (state.soundEnabled) playLuxuryChime(659.25);
        } else if (pref === 'theme') {
          if (val === 'dark') document.body.classList.add('dark-mode');
          else document.body.classList.remove('dark-mode');
          localStorage.setItem('wallora_theme', val);
        }
        // update active states
        const group = pill.parentElement;
        group.querySelectorAll('.finish-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    if (DOM.profileSaveBtn) {
      DOM.profileSaveBtn.addEventListener('click', async () => {
        playTactileClick();
        const db = window.wallora && window.wallora.db;
        const user = db && db.getUser ? await db.getUser() : null;
        const newName = (DOM.profileNameInput?.value || '').trim();
        const newAvatar = (DOM.profileAvatarInput?.value || '').trim();
        const newLocation = (DOM.profileLocationInput?.value || '').trim();
        const newBio = (DOM.profileBioInput?.value || '').trim();

        if (!newName) {
          showToast('Name cannot be empty.', 'error');
          return;
        }

        const projectProfile = buildProjectProfile(user, {
          display_name: newName,
          avatar_url: newAvatar || null,
          location: newLocation || '',
          bio: newBio || ''
        });
        const localSaved = writeLocalProfile(projectProfile);

        let remoteStatus = 'local';
        if (db && db.client && user) {
          try {
            await ensureProfile(user);
            const base = { display_name: newName, avatar_url: newAvatar || null };
            let { error } = await db.client.from('profiles').update(base).eq('id', user.id);
            // Best-effort optional fields for schemas that include them.
            if (!error && (newLocation || newBio)) {
              const extra = await db.client.from('profiles').update({ location: newLocation || null, bio: newBio || null }).eq('id', user.id);
              if (!extra.error) remoteStatus = 'synced';
              else remoteStatus = 'local+remote-base';
            } else if (!error) {
              remoteStatus = 'synced';
            } else {
              remoteStatus = 'local-only';
              console.warn('Profile remote save issue:', error.message || error);
            }
          } catch (e) {
            remoteStatus = 'local-only';
            console.warn('Profile remote save failed:', e.message || e);
          }
        }

        if (DOM.profileName) DOM.profileName.textContent = newName;
        if (DOM.profileAvatar) {
          if (newAvatar) { DOM.profileAvatar.style.backgroundImage = `url(${newAvatar})`; DOM.profileAvatar.textContent = ''; }
          else { DOM.profileAvatar.style.backgroundImage = ''; DOM.profileAvatar.textContent = (newName || 'U').trim().charAt(0).toUpperCase(); }
        }
        if (DOM.profileUpdatedAt) DOM.profileUpdatedAt.textContent = new Date(projectProfile.updated_at).toLocaleDateString();

        if (localSaved) {
          if (remoteStatus === 'synced') showToast('Profile saved and synced.', 'success');
          else if (remoteStatus === 'local+remote-base') showToast('Profile saved. Basic info synced (extra fields saved locally).', 'success');
          else showToast('Profile saved in this project.', 'success');
        } else {
          showToast('Could not save profile in this browser.', 'error');
        }
        refreshProfileUI(user);
      });
    }

    if (DOM.profileExportBtn) {
      DOM.profileExportBtn.addEventListener('click', () => {
        playTactileClick();
        const profile = readLocalProfile() || buildProjectProfile(null);
        const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'profile.local.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('Profile JSON exported.', 'success');
      });
    }

    if (DOM.profileUploadAvatarBtn) {
      DOM.profileUploadAvatarBtn.addEventListener('click', async () => {
        playTactileClick();
        const file = DOM.profileAvatarFile?.files?.[0];
        if (!file) {
          showToast('Please select an image file first.', 'error');
          return;
        }
        if (!file.type.startsWith('image/')) {
          showToast('Please select a valid image.', 'error');
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          showToast('Image must be under 2 MB.', 'error');
          return;
        }
        const db = window.wallora && window.wallora.db;
        if (!db || !db.client) {
          try {
            const dataUrl = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
            if (DOM.profileAvatarInput) DOM.profileAvatarInput.value = dataUrl;
            if (DOM.profileAvatar) DOM.profileAvatar.style.backgroundImage = `url(${dataUrl})`;
            showToast('Avatar loaded. Click Save Profile to store it locally.', 'success');
          } catch (e) {
            showToast('Could not load avatar file.', 'error');
          }
          return;
        }
        const user = await db.getUser();
        if (!user) {
          showToast('Please sign in first.', 'error');
          return;
        }
        try {
          showToast('Uploading avatar...', 'info');
          const { url, error } = await db.uploadAvatar(file);
          if (error || !url) {
            showToast('Avatar upload failed: ' + (error?.message || error), 'error');
            return;
          }
          if (DOM.profileAvatarInput) DOM.profileAvatarInput.value = url;
          if (DOM.profileAvatar) DOM.profileAvatar.style.backgroundImage = `url(${url})`;
          showToast('Avatar uploaded. Click Save Profile to store it.', 'success');
        } catch (e) {
          showToast('Avatar upload failed: ' + (e.message || e), 'error');
        }
      });
    }
  }

  function initModals() {
    if (DOM.openSettingsBtn) {
      DOM.openSettingsBtn.addEventListener('click', () => {
        playTactileClick();
        if (DOM.settingProviderSelect) DOM.settingProviderSelect.value = state.settings.provider || 'demo';
        if (DOM.settingApiKey) DOM.settingApiKey.value = state.settings.apiKey || '';
        if (DOM.settingSupabaseUrl) DOM.settingSupabaseUrl.value = state.settings.supabaseUrl || '';
        if (DOM.settingSupabaseKey) DOM.settingSupabaseKey.value = state.settings.supabaseKey || '';
        if (DOM.settingsModal) DOM.settingsModal.classList.remove('hidden');
      });
    }

    if (DOM.mobileSettingsBtn) {
      DOM.mobileSettingsBtn.addEventListener('click', () => {
        if (DOM.mobileDrawer) DOM.mobileDrawer.style.display = 'none';
        if (DOM.settingsModal) DOM.settingsModal.classList.remove('hidden');
      });
    }

    if (DOM.bannerSettingsLink) {
      DOM.bannerSettingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (DOM.settingsModal) DOM.settingsModal.classList.remove('hidden');
      });
    }

    if (DOM.closeSettingsModalBtn) {
      DOM.closeSettingsModalBtn.addEventListener('click', () => {
        if (DOM.settingsModal) DOM.settingsModal.classList.add('hidden');
      });
    }

    DOM.settingsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        playTactileClick();
        DOM.settingsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabTarget = tab.getAttribute('data-tab');

        document.querySelectorAll('.settings-tab-panel').forEach(panel => {
          if (panel.id === `tab-panel-${tabTarget}`) {
            panel.classList.remove('hidden');
            panel.classList.add('active');
          } else {
            panel.classList.add('hidden');
            panel.classList.remove('active');
          }
        });
      });
    });

    if (DOM.saveSettingsBtn) {
      DOM.saveSettingsBtn.addEventListener('click', () => {
        playTactileClick();
        if (DOM.settingProviderSelect) state.settings.provider = DOM.settingProviderSelect.value;
        if (DOM.settingApiKey) state.settings.apiKey = DOM.settingApiKey.value.trim();
        if (DOM.settingSupabaseUrl) state.settings.supabaseUrl = DOM.settingSupabaseUrl.value.trim();
        if (DOM.settingSupabaseKey) state.settings.supabaseKey = DOM.settingSupabaseKey.value.trim();

        try {
          localStorage.setItem('wallora_settings_v1', JSON.stringify(state.settings));
        } catch (e) {}

        const engineTitle = document.getElementById('engine-mode-title');
        const engineDesc = document.getElementById('engine-mode-desc');

        if (state.settings.provider === 'replicate') {
          if (engineTitle) engineTitle.textContent = 'Replicate Inpainting Adapter (Remote)';
          if (engineDesc) engineDesc.textContent = 'Connected to Replicate SDXL Inpainting API endpoint.';
        } else if (state.settings.provider === 'stability') {
          if (engineTitle) engineTitle.textContent = 'Stability AI Inpainting Engine (Remote)';
          if (engineDesc) engineDesc.textContent = 'Connected to Stability AI REST inpainting endpoint.';
        } else {
          if (engineTitle) engineTitle.textContent = 'Interactive Studio Simulation Adapter';
          if (engineDesc) engineDesc.textContent = 'Preserving natural lighting, moldings, and shadows using client-side edge luminosity shaders.';
        }

        if (DOM.settingsModal) DOM.settingsModal.classList.add('hidden');
        showToast('Settings applied successfully', 'success');
      });
    }

    // Rename Modal
    DOM.closeRenameModalBtn.addEventListener('click', () => DOM.renameModal.classList.add('hidden'));
    DOM.cancelRenameBtn.addEventListener('click', () => DOM.renameModal.classList.add('hidden'));
    DOM.confirmRenameBtn.addEventListener('click', () => {
      const newTitle = DOM.renameInput.value.trim();
      if (!newTitle) return;
      const proj = state.savedDesigns.find(p => p.id === state.projectToRenameId);
      if (proj) {
        proj.title = newTitle;
        saveDesignsToStorage();
        renderSavedDesigns();
        showToast('Project renamed successfully', 'success');
      }
      DOM.renameModal.classList.add('hidden');
    });

    // Delete Modal
    DOM.closeDeleteModalBtn.addEventListener('click', () => DOM.deleteModal.classList.add('hidden'));
    DOM.cancelDeleteBtn.addEventListener('click', () => DOM.deleteModal.classList.add('hidden'));
    DOM.confirmDeleteBtn.addEventListener('click', () => {
      const deletedId = state.projectToDeleteId;
      state.savedDesigns = state.savedDesigns.filter(p => p.id !== deletedId);
      saveDesignsToStorage();
      renderSavedDesigns();
      refreshProfileUI();
      DOM.deleteModal.classList.add('hidden');
      showToast('Project removed permanently', 'info');

      const db = window.wallora && window.wallora.db;
      if (db && db.client && deletedId) {
        db.deleteProject(deletedId).catch(() => {});
      }
    });

    // Sound FX Toggle
    if (DOM.soundToggleBtn) {
      DOM.soundToggleBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        if (state.soundEnabled) {
          DOM.soundIcon.className = 'fa-solid fa-volume-high';
          DOM.soundToggleBtn.title = 'Mute Spatial Luxury Audio';
          playLuxuryChime(659.25);
          showToast('Spatial audio enabled', 'info');
        } else {
          DOM.soundIcon.className = 'fa-solid fa-volume-xmark';
          DOM.soundToggleBtn.title = 'Enable Spatial Luxury Audio';
          showToast('Spatial audio muted', 'info');
        }
      });
    }
  }

  function openRenameModal(id, currentTitle) {
    state.projectToRenameId = id;
    DOM.renameInput.value = currentTitle;
    DOM.renameModal.classList.remove('hidden');
    DOM.renameInput.focus();
  }

  function openDeleteModal(id, title) {
    state.projectToDeleteId = id;
    DOM.deleteProjectTitle.textContent = `"${title}"`;
    DOM.deleteModal.classList.remove('hidden');
  }

  // =========================================================================
  // 19. ATTACH ALL LISTENERS & BOOTSTRAP
  // =========================================================================
  function init() {
    cacheDOMElements();

    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view');
        if (targetView) setView(targetView);
      });
    });

    if (DOM.navBrandBtn) {
      DOM.navBrandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setView('landing');
      });
    }

    if (DOM.startVisualizingBtn) {
      DOM.startVisualizingBtn.addEventListener('click', () => setView('studio'));
    }

    if (DOM.heroCtaBtn) {
      DOM.heroCtaBtn.addEventListener('click', () => setView('studio'));
    }

    if (DOM.heroBrowsePalettes) {
      DOM.heroBrowsePalettes.addEventListener('click', () => setView('library'));
    }

    DOM.stepNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.getAttribute('data-step'), 10);
        goToStudioStep(step);
      });
    });

    if (DOM.mobileMenuToggle) {
      DOM.mobileMenuToggle.addEventListener('click', () => {
        const isShown = DOM.mobileDrawer.style.display === 'block';
        DOM.mobileDrawer.style.display = isShown ? 'none' : 'block';
      });
    }

    document.querySelectorAll('.apply-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hex = btn.getAttribute('data-hex');
        const found = CURATED_COLORS.find(c => c.hex.toLowerCase() === hex.toLowerCase());
        if (found) {
          selectActiveColor(found);
        }
        setView('studio');
        goToStudioStep(2);
      });
    });

    initHeroTeaserSlider();
    initRoomUploadHandlers();
    initColorControls();
    initVisualizerSlider();
    initCalculatorHandlers();
    initLibraryHandlers();
    initDesignsHandlers();
    initModals();
    initProfileHandlers();

    // Close modals on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      ['settings-modal','rename-modal','delete-modal','calculator-modal','profile-modal'].forEach(id => {
        const m = document.getElementById(id);
        if (m) m.classList.add('hidden');
      });
    });

    // Theme toggle
    (function initTheme() {
      const saved = localStorage.getItem('wallora_theme') || 'light';
      if (saved === 'dark') document.body.classList.add('dark-mode');
      updateThemeIcon();
    })();

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', () => {
        playTactileClick();
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('wallora_theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
      });
    }

    function updateThemeIcon() {
      if (!DOM.themeIcon) return;
      const isDark = document.body.classList.contains('dark-mode');
      DOM.themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    loadSavedDesigns();
    try {
      const s = localStorage.getItem('wallora_settings_v1');
      if (s) state.settings = { ...state.settings, ...JSON.parse(s) };
    } catch (e) {}
    applyLocalProfile(readLocalProfile());
    refreshProfileUI();
    selectActiveColor(CURATED_COLORS[0]);

    // Show skeleton while attempting Supabase sync
    if (state.view === 'designs') renderSavedDesignsSkeleton();

    // Best-effort Supabase sync (auth + designs) when configured
    (async () => {
      let tries = 0;
      while ((!window.wallora || !window.wallora.db) && tries < 50) {
        await new Promise(r => setTimeout(r, 100));
        tries += 1;
      }
      const db = window.wallora && window.wallora.db;
      if (!db || !db.client) { refreshProfileUI(); return; }

      if (typeof db.onAuthStateChange === 'function' && !window.__walloraAuthBound) {
        window.__walloraAuthBound = true;
        db.onAuthStateChange(async (_event, session) => {
          const user = session?.user || null;
          try {
            if (user) {
              await ensureProfile(user);
              await loadDesignsFromSupabase();
              await refreshProfileUI(user);
              if (state.view === 'profile') await loadProfilePage(user);
              if (state.view === 'statistics') await loadStatisticsPage(user);
            } else {
              await refreshProfileUI(null);
              if (state.view === 'profile') setView('landing');
              if (state.view === 'statistics') await loadStatisticsPage({ id: 'local-user' });

            }
          } catch (e) {
            console.warn('Auth state sync failed:', e.message || e);
          }
        });
      }

      try {
        const user = await db.getUser();
        if (user) {
          await ensureProfile(user);
          await loadDesignsFromSupabase();
        }
        await refreshProfileUI(user || null);
      } catch (e) {
        console.warn('Supabase sync skipped:', e.message || e);
        await refreshProfileUI();
      }
    })();

    const hash = window.location.hash.replace('#', '');
    if (['landing', 'studio', 'library', 'designs'].includes(hash)) {
      setView(hash);
    } else {
      setView('landing');
    }

    // The legacy offline-shell service worker conflicts with Next.js routing
    // and cached the old static build. Remove it if a previous visit installed it.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch(() => {});
    }

    console.log('✨ Wallora AI — Enhanced Luxury Engine initialized with Dual-Tone & Audio.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
