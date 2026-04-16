import { useMemo, useState } from "react";
import "./CourtGallery.css";

type CourtGalleryProps = {
  images: string[];
  courtName: string;
  ownerName?: string;
  priceRange?: string;
};

function CourtGallery({ images, courtName, ownerName, priceRange }: CourtGalleryProps) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainImage = validImages[0] ?? "";
  const sideTopImage = validImages[1] ?? "";
  const sideBottomImage = validImages[2] ?? "";
  const remainingCount = Math.max(validImages.length - 3, 0);

  const openLightbox = (index: number) => {
    if (!validImages.length) return;
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const nextImage = () => {
    if (!validImages.length) return;
    setSelectedIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    if (!validImages.length) return;
    setSelectedIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (!validImages.length) {
    return (
      <section className="court-gallery" aria-label="Court image gallery">
        <div className="court-gallery-empty">No images yet</div>
      </section>
    );
  }

  return (
    <>
      <section className="court-gallery" aria-label="Court image gallery">
        <button
          className="court-gallery-main"
          type="button"
          onClick={() => openLightbox(0)}
          aria-label="Open main image"
        >
          <img src={mainImage} alt={`${courtName} main view`} loading="lazy" />

          <div className="court-gallery-owner-card" aria-hidden="true">
            <div className="court-gallery-owner-avatar" />
            <div className="court-gallery-owner-text">
              <span className="court-gallery-owner-label">Listed By:</span>
              <strong>{ownerName ?? "John Doberman"}</strong>
              <span>
                For: <strong>{priceRange ?? "$1000 - $5000"}</strong>
              </span>
            </div>
          </div>
        </button>

        <div className="court-gallery-side">
          <button
            className="court-gallery-tile"
            type="button"
            onClick={() => openLightbox(1)}
            aria-label="Open second image"
            disabled={!sideTopImage}
          >
            {sideTopImage ? (
              <img src={sideTopImage} alt={`${courtName} side view`} loading="lazy" />
            ) : (
              <span>No image</span>
            )}
          </button>

          <button
            className="court-gallery-tile court-gallery-more"
            type="button"
            onClick={() => openLightbox(2)}
            aria-label="Open more images"
            disabled={!sideBottomImage}
          >
            {sideBottomImage ? (
              <>
                <img src={sideBottomImage} alt={`${courtName} additional view`} loading="lazy" />
                {remainingCount > 0 && (
                  <span className="court-gallery-more-badge">+{remainingCount} more</span>
                )}
              </>
            ) : (
              <span>No image</span>
            )}
          </button>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="court-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
        >
          <div className="court-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button className="court-lightbox-close" type="button" onClick={closeLightbox}>
              Close
            </button>

            <button className="court-lightbox-nav" type="button" onClick={prevImage}>
              Prev
            </button>

            <img
              className="court-lightbox-image"
              src={validImages[selectedIndex]}
              alt={`${courtName} image ${selectedIndex + 1}`}
            />

            <button className="court-lightbox-nav" type="button" onClick={nextImage}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CourtGallery;
