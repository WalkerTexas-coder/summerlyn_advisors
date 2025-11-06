import { getImageById } from '../../data/imageLibrary';

interface HeroImageProps {
  imageId: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * HeroImage Component
 *
 * A reusable hero section component that uses the image library.
 * Displays a background image with content overlay when image is available,
 * or falls back to gradient background.
 *
 * Example usage:
 * <HeroImage imageId="hero-home">
 *   <h1>Your Hero Title</h1>
 *   <p>Your hero description</p>
 * </HeroImage>
 */
export default function HeroImage({ imageId, children, className = '' }: HeroImageProps) {
  const image = getImageById(imageId);

  const backgroundStyle = image?.filePath
    ? {
        backgroundImage: `linear-gradient(rgba(230, 242, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${image.filePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <section
      className={`bg-gradient-to-br from-primary-50 to-white ${className}`}
      style={backgroundStyle}
    >
      {children}
    </section>
  );
}
