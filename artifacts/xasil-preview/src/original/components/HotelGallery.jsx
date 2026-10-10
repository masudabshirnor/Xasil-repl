import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

export default function HotelGallery({
  images = [],
  hotelName = "Property",
  lang = "ENG",
}) {
  const cleanImages = [...new Set(images.filter(Boolean))];
  if (!cleanImages.length) cleanImages.push("/images/placeholder.svg");

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const touchStartX = useRef(null);
  const swiped = useRef(false);
  const so = lang === "SOM";

  const goNext = () => {
    setActiveIndex((current) =>
      current === cleanImages.length - 1 ? 0 : current + 1,
    );
  };

  const goPrev = () => {
    setActiveIndex((current) =>
      current === 0 ? cleanImages.length - 1 : current - 1,
    );
  };

  const handleTouchStart = (e) => {
    swiped.current = false;
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches?.[0]?.clientX ?? 0;

    const diff = touchStartX.current - endX;

    if (Math.abs(diff) > 45) {
      swiped.current = true;
      diff > 0 ? goNext() : goPrev();
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }

      if (e.key === "ArrowRight") {
        goNext();
      }

      if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, activeIndex]);

  useEffect(() => setActiveIndex(0), [hotelName]);

  return (
    <>
      <section className="hotel-gallery">
        <div
          className="hotel-gallery-main"
          role="button"
          tabIndex={0}
          aria-label={`${so ? "Fur sawirrada" : "Open photos of"} ${hotelName}`}
          onKeyDown={(e) => {
            if (
              e.target === e.currentTarget &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          onClick={() => {
            if (!swiped.current) setLightboxOpen(true);
            swiped.current = false;
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={cleanImages[activeIndex]}
            alt={`${hotelName} ${activeIndex + 1}`}
            draggable="false"
          />

          {cleanImages.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-arrow gallery-arrow-left"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label={so ? "Sawirkii hore" : "Previous image"}
              >
                <ChevronLeft size={25} />
              </button>

              <button
                type="button"
                className="gallery-arrow gallery-arrow-right"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label={so ? "Sawirka xiga" : "Next image"}
              >
                <ChevronRight size={25} />
              </button>
            </>
          )}

          <div className="gallery-counter">
            <Images size={15} />
            <span>
              {activeIndex + 1} / {cleanImages.length}
            </span>
          </div>
        </div>

        {cleanImages.length > 1 && (
          <div className="hotel-gallery-thumbnails">
            {cleanImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                aria-label={`Photo ${index + 1}`}
                aria-pressed={index === activeIndex}
                type="button"
                className={
                  activeIndex === index
                    ? "gallery-thumbnail active"
                    : "gallery-thumbnail"
                }
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={image}
                  alt={`${hotelName} thumbnail ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {lightboxOpen && (
        <div
          className="gallery-lightbox"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>

          {cleanImages.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-arrow-left"
              aria-label={so ? "Sawirkii hore" : "Previous image"}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          <img
            src={cleanImages[activeIndex]}
            alt={`${hotelName} enlarged ${activeIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
            draggable="false"
          />

          {cleanImages.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-arrow-right"
              aria-label={so ? "Sawirka xiga" : "Next image"}
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ChevronRight size={36} />
            </button>
          )}

          <div className="lightbox-counter">
            {activeIndex + 1} / {cleanImages.length}
          </div>
        </div>
      )}
    </>
  );
}
