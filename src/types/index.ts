/**
 * WALLORA AI — SHARED TYPESCRIPT TYPES & DATA CONTRACTS
 * Aligned with Master Development Brief (Sections 1, 2, 6, 7)
 */

export type RoomType = 
  | 'Living Room' 
  | 'Master Bedroom' 
  | 'Dining Room' 
  | 'Kitchen' 
  | 'Study' 
  | 'Other';

export type DesignMood = 
  | 'Calm' 
  | 'Cozy' 
  | 'Luxury' 
  | 'Modern';

export type ColorCategory = 
  | 'Warm' 
  | 'Cool' 
  | 'Neutral' 
  | 'Pastel' 
  | 'Bold';

export type PaintFinish = 
  | 'Matte' 
  | 'Eggshell' 
  | 'Satin' 
  | 'Semi-Gloss';

export type LightingMode = 
  | 'morning'   // 5500K Daylight
  | 'evening'   // 2700K Golden Glow
  | 'neutral';  // 4000K Studio Balanced CRI 98

export type GenerationStatus = 
  | 'draft' 
  | 'uploaded' 
  | 'processing' 
  | 'completed' 
  | 'failed';

export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  lrv: number; // 0 to 100 Light Reflectance Value
  mood: DesignMood;
  category: ColorCategory;
  undertone?: string;
  desc?: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  roomType: RoomType;
  mood?: DesignMood;
  status: GenerationStatus;
  originalImagePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignVariant {
  id: string;
  projectId: string;
  userId: string;
  colorName: string;
  colorHex: string;
  finish: PaintFinish;
  lightingMode: LightingMode;
  resultImagePath: string;
  provider: 'demo' | 'replicate' | 'stability' | 'fal';
  generationStatus: GenerationStatus;
  errorCode?: string | null;
  createdAt: string;
}

export interface ImageEditingRequest {
  imageBufferOrUrl: string;
  colorName: string;
  colorHex: string;
  roomType: RoomType;
  mood?: DesignMood;
  finish?: PaintFinish;
  lightingMode?: LightingMode;
}

export interface ImageEditingResponse {
  variantId: string;
  resultImageUrl: string;
  provider: string;
  status: GenerationStatus;
  metadata?: {
    latencyMs?: number;
    model?: string;
  };
}

export interface ImageEditingProvider {
  name: string;
  isConfigured(): boolean;
  generateWallRecolor(request: ImageEditingRequest): Promise<ImageEditingResponse>;
}

