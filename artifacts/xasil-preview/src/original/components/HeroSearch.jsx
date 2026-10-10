import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Building2,
  BedDouble,
} from "lucide-react";

import {
  CITIES,
  getDistrictsByCity,
} from "../data/locations";

export default function HeroSearch() {
  const [mode, setMode] = useState("stays");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [eventDate, setEventDate] = useState("");
  const [capacity, setCapacity] = useState(50);

  const districts = useMemo(
    () => getDistrictsByCity(city),
    [city]
  );

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setDistrict("");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!city) {
      return;
    }

    const searchPayload =
      mode === "stays"
        ? {
            type: "stays",
            city,
            district,
            checkIn,
            checkOut,
            guests,
          }
        : {
            type: "halls",
            city,
            district,
            eventDate,
            capacity,
          };

    console.log("Search:", searchPayload);

    // Later we will connect this to your actual
    // Supabase search/filter logic.
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            Trusted stays & event spaces
          </span>

          <h1>
            Find the right place,
            <span> book with confidence.</span>
          </h1>

          <p>
            Discover hotels, apartments and event halls
            across Somalia with a cleaner, safer and more
            reliable booking experience.
          </p>
        </div>

        <div className="search-panel">
          <div className="search-tabs">
            <button
              type="button"
              className={
                mode === "stays"
                  ? "search-tab active"
                  : "search-tab"
              }
              onClick={() => setMode("stays")}
            >
              <BedDouble size={18} />
              Stays
            </button>

            <button
              type="button"
              className={
                mode === "halls"
                  ? "search-tab active"
                  : "search-tab"
              }
              onClick={() => setMode("halls")}
            >
              <Building2 size={18} />
              Halls & Events
            </button>
          </div>

          <form
            className="booking-search-form"
            onSubmit={handleSearch}
          >
            <div className="search-field">
              <label>
                <MapPin size={16} />
                City
              </label>

              <select
                value={city}
                onChange={handleCityChange}
              >
                <option value="">
                  Select city
                </option>

                {CITIES.map((cityName) => (
                  <option
                    key={cityName}
                    value={cityName}
                  >
                    {cityName}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-field">
              <label>
                <MapPin size={16} />
                District
              </label>

              <select
                value={district}
                onChange={(event) =>
                  setDistrict(event.target.value)
                }
                disabled={!city}
              >
                <option value="">
                  {city
                    ? "Select district"
                    : "Choose city first"}
                </option>

                {districts.map((districtName) => (
                  <option
                    key={districtName}
                    value={districtName}
                  >
                    {districtName}
                  </option>
                ))}
              </select>
            </div>

            {mode === "stays" ? (
              <>
                <div className="search-field">
                  <label>
                    <CalendarDays size={16} />
                    Check-in
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    onChange={(event) =>
                      setCheckIn(event.target.value)
                    }
                  />
                </div>

                <div className="search-field">
                  <label>
                    <CalendarDays size={16} />
                    Check-out
                  </label>

                  <input
                    type="date"
                    value={checkOut}
                    onChange={(event) =>
                      setCheckOut(event.target.value)
                    }
                  />
                </div>

                <div className="search-field">
                  <label>
                    <Users size={16} />
                    Guests
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(event) =>
                      setGuests(
                        Number(event.target.value)
                      )
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="search-field">
                  <label>
                    <CalendarDays size={16} />
                    Event date
                  </label>

                  <input
                    type="date"
                    value={eventDate}
                    onChange={(event) =>
                      setEventDate(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="search-field">
                  <label>
                    <Users size={16} />
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="10"
                    max="5000"
                    step="10"
                    value={capacity}
                    onChange={(event) =>
                      setCapacity(
                        Number(event.target.value)
                      )
                    }
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="search-submit"
            >
              <Search size={18} />
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}