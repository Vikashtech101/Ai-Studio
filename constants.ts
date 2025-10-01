
import { StylePreset, AspectRatio } from './types';

export const STYLE_PRESETS: { id: StylePreset; prompt: string }[] = [
  { id: StylePreset.PROFESSIONAL, prompt: 'professional studio photoshoot with clean, high-key lighting and a neutral background. The focus should be entirely on the product and model.' },
  { id: StylePreset.LIFESTYLE, prompt: 'candid outdoor lifestyle shot with natural lighting and a beautiful, slightly blurred background (bokeh effect). The scene should feel authentic and aspirational.' },
  { id: StylePreset.SOCIAL, prompt: 'vibrant, eye-catching social media post, similar to an Instagram feed aesthetic. Use bold colors, dynamic angles, and a modern, trendy feel.' },
  { id: StylePreset.ECOMMERCE, prompt: 'clean e-commerce shot with a pure white or light grey background, optimized for marketplaces like Amazon. Ensure the product is sharp and well-lit.' },
];

export const ASPECT_RATIOS: { id: AspectRatio; prompt: string }[] = [
  { id: AspectRatio.LANDSCAPE, prompt: 'a wide, landscape orientation' },
  { id: AspectRatio.PORTRAIT, prompt: 'a vertical, portrait orientation suitable for stories or reels' },
  { id: AspectRatio.SQUARE, prompt: 'a square composition, perfect for a grid post' },
];

export const STOCK_MODELS: { id: string; url: string; alt: string }[] = [
    { id: 'model1', url: 'https://picsum.photos/seed/model1/1024/1024', alt: 'Stock model 1' },
    { id: 'model2', url: 'https://picsum.photos/seed/model2/1024/1024', alt: 'Stock model 2' },
    { id: 'model3', url: 'https://picsum.photos/seed/model3/1024/1024', alt: 'Stock model 3' },
    { id: 'model4', url: 'https://picsum.photos/seed/model4/1024/1024', alt: 'Stock model 4' },
];
