// ============================================================
//  Wallora AI — Supabase Client Configuration
//  ⚠️  IMPORTANT SECURITY NOTES:
//  - The ANON KEY below is SAFE to put in frontend JS.
//    It only allows what your Row Level Security (RLS) policies permit.
//  - The SERVICE ROLE KEY must NEVER be put here — keep it server-side only.
//  - DO NOT commit real keys to a public GitHub repo.
//    Add this file to .gitignore or use environment variables.
// ============================================================

// 🔧 REPLACE THESE WITH YOUR ACTUAL SUPABASE PROJECT VALUES:
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY_HERE';

// Initialize the Supabase client (loaded via CDN in index.html)
let supabaseClient = null;

function initSupabase() {
    if (!SUPABASE_URL.includes('YOUR_PROJECT_ID') && !SUPABASE_ANON.includes('YOUR_ANON')) {
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
            console.log('%c✅ Supabase connected successfully', 'color: #74608F; font-weight: bold;');
            return true;
        } catch (err) {
            console.error('❌ Supabase init failed:', err);
            return false;
        }
    } else {
        console.warn('⚠️ Supabase not configured — running in localStorage mode.');
        return false;
    }
}

// ============================================================
//  AUTH HELPERS
// ============================================================

async function signInWithGoogle() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
    });
    if (error) console.error('Auth error:', error);
    return data;
}

async function signOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
}

async function getCurrentUser() {
    if (!supabaseClient) return null;
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

// ============================================================
//  PROJECT HELPERS
// ============================================================

/** Save a design project to Supabase */
async function saveProjectToSupabase(projectData) {
    if (!supabaseClient) {
        // Fallback: save to localStorage
        const designs = JSON.parse(localStorage.getItem('wallora_designs') || '[]');
        projectData.id = projectData.id || Date.now().toString();
        const idx = designs.findIndex(d => d.id === projectData.id);
        if (idx >= 0) designs[idx] = projectData;
        else designs.unshift(projectData);
        localStorage.setItem('wallora_designs', JSON.stringify(designs));
        return { data: projectData, error: null };
    }

    const user = await getCurrentUser();
    if (!user) return { data: null, error: 'Not authenticated' };

    const { data, error } = await supabaseClient
        .from('projects')
        .upsert({
            id:          projectData.id || undefined,
            user_id:     user.id,
            name:        projectData.name || 'Untitled Design',
            room_type:   projectData.roomType || 'living_room',
            room_width:  projectData.dimensions?.width || null,
            room_height: projectData.dimensions?.height || null,
            updated_at:  new Date().toISOString()
        }, { onConflict: 'id' })
        .select()
        .single();

    if (error) console.error('Save project error:', error);
    return { data, error };
}

/** Load all projects for current user */
async function loadProjectsFromSupabase() {
    if (!supabaseClient) {
        const designs = JSON.parse(localStorage.getItem('wallora_designs') || '[]');
        return { data: designs, error: null };
    }

    const user = await getCurrentUser();
    if (!user) return { data: [], error: 'Not authenticated' };

    const { data, error } = await supabaseClient
        .from('projects')
        .select(`
            *,
            design_variants (
                id, lighting_mode, primary_color_hex, accent_color_hex,
                notes, is_favorite, created_at
            )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

    if (error) console.error('Load projects error:', error);
    return { data: data || [], error };
}

/** Save a design variant (color choice + lighting) */
async function saveVariantToSupabase(projectId, variantData) {
    if (!supabaseClient) return { data: null, error: 'No Supabase connection' };

    const { data, error } = await supabaseClient
        .from('design_variants')
        .insert({
            project_id:        projectId,
            lighting_mode:     variantData.lightingMode || 'neutral',
            primary_color_hex: variantData.primaryColor || null,
            accent_color_hex:  variantData.accentColor || null,
            notes:             variantData.notes || null,
            is_favorite:       variantData.isFavorite || false
        })
        .select()
        .single();

    if (error) console.error('Save variant error:', error);
    return { data, error };
}

/** Toggle favorite on a variant */
async function toggleFavorite(variantId, isFavorite) {
    if (!supabaseClient) return;
    await supabaseClient
        .from('design_variants')
        .update({ is_favorite: isFavorite })
        .eq('id', variantId);
}

// ============================================================
//  IMAGE UPLOAD HELPERS (Supabase Storage)
// ============================================================

/** Upload a room image to Supabase Storage */
async function uploadRoomImage(file, projectId) {
    if (!supabaseClient) return { url: null, error: 'No Supabase connection' };

    const user = await getCurrentUser();
    if (!user) return { url: null, error: 'Not authenticated' };

    const ext      = file.name.split('.').pop();
    const filePath = `${user.id}/${projectId}/original.${ext}`;

    const { data, error } = await supabaseClient.storage
        .from('room-originals')
        .upload(filePath, file, { upsert: true, contentType: file.type });

    if (error) {
        console.error('Image upload error:', error);
        return { url: null, error };
    }

    const { data: urlData } = supabaseClient.storage
        .from('room-originals')
        .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    const connected = initSupabase();
    // Expose globally for script.js to use
    window.wallora = window.wallora || {};
    window.wallora.db = {
        connected,
        client:        supabaseClient,
        signInGoogle:  signInWithGoogle,
        signOut,
        getUser:       getCurrentUser,
        saveProject:   saveProjectToSupabase,
        loadProjects:  loadProjectsFromSupabase,
        saveVariant:   saveVariantToSupabase,
        toggleFav:     toggleFavorite,
        uploadImage:   uploadRoomImage
    };
});

