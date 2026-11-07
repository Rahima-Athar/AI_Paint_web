// Wallora AI - Supabase Client (schema-safe, RLS-aware, error-surfacing)
// Uses anon/public key only. Never put service-role keys in frontend code.

// Local override (gitignored) or Next.js public env bridge can set these globals.
const SUPABASE_URL  = (window.__WALLORA_SUPABASE_URL__  || 'https://YOUR_PROJECT_ID.supabase.co');
const SUPABASE_ANON = (window.__WALLORA_SUPABASE_ANON__ || window.__WALLORA_SUPABASE_KEY__ || 'YOUR_ANON_PUBLIC_KEY_HERE');

let supabaseClient = null;

function errMsg(error, fallback = 'Database request failed') {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  return error.message || error.details || error.hint || fallback;
}

function isMissingColumn(error) {
  const m = errMsg(error, '').toLowerCase();
  return m.includes('column') && (m.includes('does not exist') || m.includes('schema cache'));
}

function isMissingTable(error) {
  const m = errMsg(error, '').toLowerCase();
  return m.includes('relation') && m.includes('does not exist');
}

function initSupabase() {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.warn('Supabase JS CDN not loaded; running in local mode.');
    return false;
  }
  if (SUPABASE_URL.includes('YOUR_PROJECT_ID') || SUPABASE_ANON.includes('YOUR_ANON') || SUPABASE_ANON.includes('YOUR_PUBLIC')) {
    console.warn('Supabase not configured; running in local mode.');
    return false;
  }
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    console.log('%cSupabase connected', 'color:#74608F;font-weight:bold');
    return true;
  } catch (err) {
    console.error('Supabase init failed:', err);
    return false;
  }
}

async function signInWithGoogle() {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase is not configured.' } };
  return await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
}
async function signInWithEmail(email, password) {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase is not configured.' } };
  return await supabaseClient.auth.signInWithPassword({ email, password });
}
async function signInWithMagicLink(email) {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase is not configured.' } };
  return await supabaseClient.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
}
async function signUpWithEmail(email, password, fullName) {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase is not configured.' } };
  return await supabaseClient.auth.signUp({ email, password, options: { data: { full_name: fullName || '' } } });
}
async function signOut() { if (supabaseClient) await supabaseClient.auth.signOut(); }
async function getCurrentUser() {
  if (!supabaseClient) return null;
  const { data } = await supabaseClient.auth.getUser();
  return data?.user || null;
}

// ----- Profiles -----
async function ensureProfileRow(user) {
  if (!supabaseClient || !user) return { data: null, error: { message: 'Not authenticated' } };
  const base = {
    id: user.id,
    display_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Wallora User',
    avatar_url: user.user_metadata?.avatar_url || null,
    updated_at: new Date().toISOString(),
  };
  let { data, error } = await supabaseClient.from('profiles').upsert(base, { onConflict: 'id' }).select('*').single();
  if (error && isMissingColumn(error)) {
    ({ data, error } = await supabaseClient.from('profiles').upsert({ id: base.id, display_name: base.display_name, avatar_url: base.avatar_url }, { onConflict: 'id' }).select('*').single());
  }
  return { data, error };
}

async function getProfile(userId) {
  if (!supabaseClient || !userId) return { data: null, error: { message: 'Supabase/auth unavailable' } };
  return await supabaseClient.from('profiles').select('*').eq('id', userId).maybeSingle();
}

async function updateProfile(userId, patch) {
  if (!supabaseClient || !userId) return { data: null, error: { message: 'Supabase/auth unavailable' } };
  const payload = { ...patch, updated_at: new Date().toISOString() };
  let { data, error } = await supabaseClient.from('profiles').update(payload).eq('id', userId).select('*').single();
  if (error && isMissingColumn(error)) {
    // Retry with only base columns known to exist in original schema.
    const base = {};
    if ('display_name' in payload) base.display_name = payload.display_name;
    if ('avatar_url' in payload) base.avatar_url = payload.avatar_url;
    base.updated_at = payload.updated_at;
    ({ data, error } = await supabaseClient.from('profiles').update(base).eq('id', userId).select('*').single());
    if (!error) error = { message: 'Profile saved, but some fields require the latest database migration (location/bio/preferences).', partial: true };
  }
  return { data, error };
}

// ----- Projects / variants -----
async function saveProjectToSupabase(projectData) {
  if (!supabaseClient) {
    const designs = JSON.parse(localStorage.getItem('wallora_designs') || '[]');
    projectData.id = projectData.id || Date.now().toString();
    const idx = designs.findIndex(d => d.id === projectData.id);
    if (idx >= 0) designs[idx] = projectData; else designs.unshift(projectData);
    localStorage.setItem('wallora_designs', JSON.stringify(designs));
    return { data: projectData, error: null };
  }
  const user = await getCurrentUser();
  if (!user) return { data: null, error: { message: 'Not authenticated' } };
  const payload = {
    user_id: user.id,
    title: projectData.name || projectData.title || 'Untitled Design',
    room_type: projectData.roomType || 'Living Room',
    updated_at: new Date().toISOString(),
  };
  if (projectData.id && !String(projectData.id).startsWith('proj-')) payload.id = projectData.id;
  const { data, error } = await supabaseClient.from('projects').upsert(payload, { onConflict: 'id' }).select('*').single();
  if (error) console.error('Save project error:', error);
  return { data, error };
}

async function updateProjectInSupabase(projectId, patch) {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase not configured' } };
  const payload = { ...patch, updated_at: new Date().toISOString() };
  const { data, error } = await supabaseClient.from('projects').update(payload).eq('id', projectId).select('*').single();
  if (error) console.error('Update project error:', error);
  return { data, error };
}

async function loadProjectsFromSupabase() {
  if (!supabaseClient) return { data: JSON.parse(localStorage.getItem('wallora_designs') || '[]'), error: null };
  const user = await getCurrentUser();
  if (!user) return { data: [], error: { message: 'Not authenticated' } };
  // Query canonical + compatibility columns; tolerate missing columns.
  let { data, error } = await supabaseClient
    .from('projects')
    .select('*, design_variants(id, project_id, lighting_mode, color_name, color_hex, finish, primary_color_hex, accent_color_hex, is_favorite, notes, created_at)')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });
  if (error && isMissingColumn(error)) {
    ({ data, error } = await supabaseClient.from('projects').select('*, design_variants(*)').eq('user_id', user.id).order('updated_at', { ascending: false }));
  }
  if (error) console.error('Load projects error:', error);
  return { data: data || [], error };
}

async function saveVariantToSupabase(projectId, variantData) {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase not configured' } };
  const user = await getCurrentUser();
  if (!user) return { data: null, error: { message: 'Not authenticated' } };
  const canonical = {
    project_id: projectId,
    user_id: user.id,
    lighting_mode: variantData.lightingMode || 'morning',
    color_name: variantData.colorName || 'Custom',
    color_hex: variantData.primaryColor || null,
    finish: variantData.finish || 'Eggshell',
    provider: variantData.provider || 'demo',
    generation_status: 'completed',
  };
  let { data, error } = await supabaseClient.from('design_variants').insert(canonical).select('*').single();
  if (error && isMissingColumn(error)) {
    // Try legacy/compat shape
    const legacy = {
      project_id: projectId,
      user_id: user.id,
      lighting_mode: canonical.lighting_mode,
      primary_color_hex: canonical.color_hex,
      accent_color_hex: variantData.accentColor || null,
      notes: variantData.notes || null,
      is_favorite: !!variantData.isFavorite,
    };
    ({ data, error } = await supabaseClient.from('design_variants').insert(legacy).select('*').single());
  }
  if (error) console.error('Save variant error:', error);
  return { data, error };
}

async function toggleFavorite(variantId, isFavorite) {
  if (!supabaseClient || !variantId) return { error: { message: 'Supabase/variant unavailable' } };
  let { error } = await supabaseClient.from('design_variants').update({ is_favorite: !!isFavorite }).eq('id', variantId);
  if (error) console.error('Toggle favorite error:', error);
  return { error };
}

async function deleteProjectFromSupabase(projectId) {
  if (!supabaseClient) return { error: { message: 'Supabase not configured' } };
  const { error } = await supabaseClient.from('projects').delete().eq('id', projectId);
  if (error) console.error('Delete project error:', error);
  return { error };
}

async function getAiUsage(periodStart) {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase not configured' } };
  const user = await getCurrentUser();
  if (!user) return { data: null, error: { message: 'Not authenticated' } };
  const { data, error } = await supabaseClient.from('ai_usage').select('*').eq('user_id', user.id).eq('period_start', periodStart).maybeSingle();
  if (error && isMissingTable(error)) return { data: null, error, missingTable: true };
  return { data, error };
}

async function recordAiGeneration(provider = 'demo') {
  if (!supabaseClient) return { data: null, error: { message: 'Supabase not configured' } };
  const user = await getCurrentUser();
  if (!user) return { data: null, error: { message: 'Not authenticated' } };
  const periodStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
  const { data: existing } = await getAiUsage(periodStart);
  const count = (existing?.generation_count || 0) + 1;
  const { data, error } = await supabaseClient.from('ai_usage').upsert({
    user_id: user.id, period_start: periodStart, generation_count: count, provider, updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,period_start' }).select('*').single();
  if (error && isMissingTable(error)) return { data: null, error, missingTable: true };
  return { data, error };
}

async function uploadAvatar(file) {
  if (!supabaseClient) return { url: null, error: { message: 'Supabase not configured' } };
  const user = await getCurrentUser();
  if (!user) return { url: null, error: { message: 'Not authenticated' } };
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabaseClient.storage.from('avatars').upload(filePath, file, { upsert: true, contentType: file.type || 'image/png' });
  if (uploadError) return { url: null, error: uploadError };
  const { data } = supabaseClient.storage.from('avatars').getPublicUrl(filePath);
  return { url: data?.publicUrl || null, error: null };
}

function publishWalloraDb() {
  const connected = initSupabase();
  window.wallora = window.wallora || {};
  window.wallora.db = {
    connected,
    client: supabaseClient,
    errMsg,
    signInGoogle, signInEmail, signUpEmail, signInMagic, signOut, getUser: getCurrentUser,
    ensureProfile: ensureProfileRow, getProfile, updateProfile,
    saveProject: saveProjectToSupabase, updateProject: updateProjectInSupabase,
    loadProjects: loadProjectsFromSupabase, deleteProject: deleteProjectFromSupabase,
    saveVariant: saveVariantToSupabase, toggleFav: toggleFavorite,
    getAiUsage, recordAiGeneration,
    uploadAvatar,
    onAuthStateChange: (cb) => supabaseClient ? supabaseClient.auth.onAuthStateChange(cb) : ({ data: { subscription: { unsubscribe() {} } } }),
  };
}

publishWalloraDb();
