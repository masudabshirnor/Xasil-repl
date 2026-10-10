import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  MapPin,
  Star,
  SearchX,
} from "lucide-react";

import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";

export default function SearchResults({
  initialCity = "",
  initialDistrict = "",
  onOpenHotel,
}) {
  const [sortBy, setSortBy] = useState("recommended");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [favorites, setFavorites] = useState([]);

  const filteredHotels = useMemo(() => {
    let results = [...hotels];

    if (initialCity) {
      results = results.filter(
        (hotel) => hotel.city === initialCity
      );
    }

    if (initialDistrict) {
      results = results.filter(
        (hotel) =>
          hotel.district === initialDistrict
      );
    }

    results = results.filter(
      (hotel) =>
        hotel.rating >= minRating &&
        hotel.pricePerNight <= maxPrice
    );

    if (sortBy === "price-low") {
      results.sort(
        (a, b) =>
          a.pricePerNight - b.pricePerNight
      );
    }

    if (sortBy === "price-high") {
      results.sort(
        (a, b) =>
          b.pricePerNight - a.pricePerNight
      );
    }

    if (sortBy === "rating") {
      results.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return results;
  }, [
    initialCity,
    initialDistrict,
    sortBy,
    minRating,
    maxPrice,
  ]);

  const handleFavorite = (hotel) => {
    setFavorites((current) => {
      const exists = current.includes(hotel.id);

      if (exists) {
        return current.filter(
          (id) => id !== hotel.id
        );
      }

      return [...current, hotel.id];
    });
  };

  return (
    <main className="search-results-page">
      <div className="search-results-container">
        <section className="results-topbar">
          <div>
            <span className="section-eyebrow">
              Search results
            </span>

            <h1>
              {initialCity
                ? `Places to stay in ${initialCity}`
                : "Explore available properties"}
            </h1>

            <p>
              {filteredHotels.length} properties found
            </p>
          </div>

          <div className="results-sort">
            <label htmlFor="sort">
              Sort by
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              <option value="recommended">
                Recommended
              </option>

              <option value="price-low">
                Price: low to high
              </option>

              <option value="price-high">
                Price: high to low
              </option>

              <option value="rating">
                Highest rated
              </option>
            </select>
          </div>
        </section>

        <div className="results-layout">
          <aside className="results-filters">
            <div className="filter-heading">
              <SlidersHorizontal size={19} />
              <h2>Filters</h2>
            </div>

            <div className="filter-group">
              <label>
                Minimum rating
              </label>

              <div className="rating-filter-options">
                {[0, 3, 4, 4.5].map(
                  (ratingValue) => (
                    <button
                      key={ratingValue}
                      type="button"
                      className={
                        minRating === ratingValue
                          ? "filter-pill active"
                          : "filter-pill"
                      }
                      onClick={() =>
                        setMinRating(ratingValue)
                      }
                    >
                      <Star
                        size={14}
                        fill={
                          minRating === ratingValue
                            ? "currentColor"
                            : "none"
                        }
                      />

                      {ratingValue === 0
                        ? "Any"
                        : `${ratingValue}+`}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="price-range">
                Maximum price
              </label>

              <input
                id="price-range"
                type="range"
                min="20"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(
                    Number(event.target.value)
                  )
                }
              />

              <div className="price-range-values">
                <span>$20</span>
                <strong>
                  Up to ${maxPrice}
                </strong>
              </div>
            </div>

            {(initialCity ||
              initialDistrict) && (
              <div className="active-location-filter">
                <MapPin size={17} />

                <div>
                  <strong>
                    {initialDistrict ||
                      initialCity}
                  </strong>

                  {initialDistrict &&
                    initialCity && (
                      <span>
                        {initialCity}
                      </span>
                    )}
                </div>
              </div>
            )}
          </aside>

          <section className="results-content">
            {filteredHotels.length > 0 ? (
              <div className="hotel-results-grid">
                {filteredHotels.map(
                  (hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onOpen={onOpenHotel}
                      onFavorite={
                        handleFavorite
                      }
                      isFavorite={favorites.includes(
                        hotel.id
                      )}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="empty-results">
                <div className="empty-results-icon">
                  <SearchX size={30} />
                </div>

                <h2>
                  No properties found
                </h2>

                <p>
                  Try changing your filters or
                  searching another destination.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setMinRating(0);
                    setMaxPrice(500);
                    setSortBy("recommended");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}