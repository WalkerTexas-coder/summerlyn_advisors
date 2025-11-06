export interface ImageAsset {
  id: string;
  purpose: string;
  location: string; // Where this image will be used
  filePath?: string; // To be filled in when image is added
  altText: string;
  searchKeywords: string[]; // Keywords for finding on Unsplash/Canva
  dimensions?: {
    recommended: string; // e.g., "1920x1080", "800x600"
    aspectRatio: string; // e.g., "16:9", "4:3", "1:1"
  };
  description: string; // Detailed description of what to look for
  style?: string[]; // Style suggestions (e.g., "professional", "modern", "clean")
}

export interface ImageCategory {
  category: string;
  images: ImageAsset[];
}
