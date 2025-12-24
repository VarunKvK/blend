export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Point {
  x: number;
  y: number;
}

export type GradientType = 'linear' | 'radial' | 'mesh';

export type LayoutId = 'random' | 'aurora' | 'orbital' | 'diagonal' | 'corner';

export interface GradientConfig {
  type: GradientType;
  angle: number; // in degrees, only for linear
  colors: string[]; // Hex codes
  meshPoints?: Point[]; // Only for mesh, corresponds 1:1 to colors
  noise: number; // 0 to 1, opacity of noise layer
  layout: LayoutId;
}

export interface PresetDimension {
  name: string;
  width: number;
  height: number;
  label: string;
}

export enum ExportFormat {
  PNG = 'PNG',
  SVG = 'SVG',
  CSS = 'CSS'
}

export interface UserTier {
  type: 'FREE' | 'PAID';
  dailyExportsLeft: number;
}