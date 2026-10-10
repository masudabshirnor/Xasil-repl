import {
  MapPin,
  Star,
  Wifi,
  Waves,
  Utensils,
  ShieldCheck,
  Heart,
} from "lucide-react";

export default function HotelCard({
  hotel,
  onOpen,
  onFavorite,
  isFavorite = false,
}) {
  if (!hotel) return null;

  const previewFacilities =
    hotel.facilities?.slice(0, 3) || [];

  const iconForFacility = (facility) => {
    if (facility.toLowerCase().includes("pool")) {
      return Waves;
    }

    if (facility.toLowerCase().includes("restaurant")) {
      return Utensils;
    }

    return Wifi;
  };

  return (
    <article className="hotel-card">
      <div
        className="hotel-card-image"
        onClick={() => onOpen?.(hotel)}
      >
        <img
          src={hotel.images?.[0]}
          alt={hotel.name}
        />

        <div className="hotel-card-top-row">
          <span className="verified-property-tag">
            <ShieldCheck size={15} />
            Verified
          </span>

          <button
            type="button"
            className={
              isFavorite
                ? "favorite-button active"
                : "favorite-button"
            }
            onClick={(event) => {
              event.stopPropagation();
              onFavorite?.(hotel);
            }}
            aria-label="Save property"
          >
            <Heart
              size={19}
              fill={
                isFavorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>
      </div>

      <div className="hotel-card-body">
        <div className="hotel-card-heading">
          <div>
            <h3
              onClick={() => onOpen?.(hotel)}
            >
              {hotel.name}
            </h3>

            <div className="hotel-card-location">
              <MapPin size={15} />

              <span>
                {hotel.district}, {hotel.city}
              </span>
            </div>
          </div>

          <div className="hotel-card-rating">
            <Star
              size={15}
              fill="currentColor"
            />

            <strong>{hotel.rating}</strong>
          </div>
        </div>

        <div className="hotel-card-facilities">
          {previewFacilities.map(
            (facility) => {
              const Icon =
                iconForFacility(facility);

              return (
                <span key={facility}>
                  <Icon size={14} />
                  {facility}
                </span>
              );
            }
          )}
        </div>

        <div className="hotel-card-divider" />

        <div className="hotel-card-bottom">
          <div className="hotel-card-reviews">
            <strong>Excellent</strong>

            <span>
              {hotel.reviews} reviews
            </span>
          </div>

          <div className="hotel-card-price">
            <span>From</span>

            <strong>
              ${hotel.pricePerNight}
            </strong>

            <small>per night</small>
          </div>
        </div>

        <button
          type="button"
          className="hotel-card-view-button"
          onClick={() => onOpen?.(hotel)}
        >
          View property
        </button>
      </div>
    </article>
  );
}