import {
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Users,
  BedDouble,
  BadgeDollarSign,
  CalendarDays,
} from "lucide-react";

import HotelGallery from "../components/HotelGallery";
import FacilitiesGrid from "../components/FacilitiesGrid";

export default function HotelDetails({ hotel }) {
  if (!hotel) {
    return (
      <main className="hotel-details-page">
        <div className="empty-state">
          <h2>Property not found</h2>
          <p>
            We couldn't find the property you're looking for.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="hotel-details-page">
      <div className="hotel-details-container">
        <section className="hotel-details-header">
          <div>
            <div className="hotel-badges">
              <span className="verified-badge">
                <ShieldCheck size={16} />
                Verified property
              </span>

              <span className="rating-badge">
                <Star size={16} fill="currentColor" />
                {hotel.rating}
              </span>
            </div>

            <h1>{hotel.name}</h1>

            <div className="hotel-location">
              <MapPin size={18} />
              <span>
                {hotel.district}, {hotel.city}
              </span>
            </div>

            <div className="hotel-review-summary">
              <strong>{hotel.rating}</strong>
              <span>Excellent</span>
              <span>
                {hotel.reviews} guest reviews
              </span>
            </div>
          </div>

          <div className="hotel-price-summary">
            <span>From</span>

            <strong>
              ${hotel.pricePerNight}
            </strong>

            <span>per night</span>

            <a
              href="#rooms"
              className="primary-book-button"
            >
              View rooms
            </a>
          </div>
        </section>

        <HotelGallery
          images={hotel.images}
          hotelName={hotel.name}
        />

        <div className="hotel-details-layout">
          <div className="hotel-details-main">
            <section className="hotel-about-section">
              <div className="section-heading">
                <span className="section-eyebrow">
                  About this property
                </span>

                <h2>
                  Comfortable stays,
                  thoughtfully prepared
                </h2>
              </div>

              <p>{hotel.description}</p>

              <div className="property-highlights">
                <div>
                  <CheckCircle2 size={20} />
                  <span>
                    Verified property information
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={20} />
                  <span>
                    Secure booking experience
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={20} />
                  <span>
                    Guest support available
                  </span>
                </div>
              </div>
            </section>

            <FacilitiesGrid
              facilities={hotel.facilities}
            />

            <section
              className="room-section"
              id="rooms"
            >
              <div className="section-heading">
                <span className="section-eyebrow">
                  Available options
                </span>

                <h2>
                  Choose your room
                </h2>

                <p>
                  Compare room types and select
                  the option that fits your stay.
                </p>
              </div>

              <div className="room-list">
                {hotel.roomTypes?.map(
                  (room, index) => (
                    <article
                      className="room-card"
                      key={`${room.name}-${index}`}
                    >
                      <div className="room-info">
                        <h3>{room.name}</h3>

                        <div className="room-meta">
                          <span>
                            <Users size={16} />
                            Up to {room.guests} guests
                          </span>

                          <span>
                            <BedDouble size={16} />
                            {room.beds}
                          </span>
                        </div>
                      </div>

                      <div className="room-pricing">
                        <span>
                          Price per night
                        </span>

                        <strong>
                          ${room.price}
                        </strong>

                        <button
                          type="button"
                          className="room-select-button"
                        >
                          Select room
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>

            <section className="hotel-policy-section">
              <div className="section-heading">
                <span className="section-eyebrow">
                  Good to know
                </span>

                <h2>
                  Property policies
                </h2>
              </div>

              <div className="policy-grid">
                <div className="policy-card">
                  <CalendarDays size={20} />

                  <div>
                    <strong>Check-in</strong>
                    <span>
                      From 2:00 PM
                    </span>
                  </div>
                </div>

                <div className="policy-card">
                  <CalendarDays size={20} />

                  <div>
                    <strong>Check-out</strong>
                    <span>
                      Until 12:00 PM
                    </span>
                  </div>
                </div>

                <div className="policy-card">
                  <BadgeDollarSign size={20} />

                  <div>
                    <strong>Cancellation</strong>
                    <span>
                      Depends on the selected rate
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="booking-sidebar">
            <div className="booking-sidebar-card">
              <span className="sidebar-label">
                Starting from
              </span>

              <div className="sidebar-price">
                <strong>
                  ${hotel.pricePerNight}
                </strong>

                <span>/ night</span>
              </div>

              <div className="sidebar-trust-item">
                <ShieldCheck size={18} />
                <span>
                  Secure booking
                </span>
              </div>

              <div className="sidebar-trust-item">
                <CheckCircle2 size={18} />
                <span>
                  Verified property
                </span>
              </div>

              <a
                href="#rooms"
                className="sidebar-book-button"
              >
                Check availability
              </a>

              <small>
                You won't be charged yet.
              </small>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}