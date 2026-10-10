import { useState, useMemo } from "react";
import {
  MapPin,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  Check,
  Headphones,
  ArrowRight,
  Building2,
  Star,
} from "lucide-react";
const fallback = "/images/placeholder.svg";
export default function Discovery({
  properties,
  loading,
  error,
  onRetry,
  onOpen,
  lang,
  category,
  city,
  onReset,
  sortBy,
  setSortBy,
}) {
  const so = lang === "SOM";
  const [query, setQuery] = useState(""),
  [budget, setBudget] = useState(""),
  [amenity, setAmenity] = useState(""),
  [filtersOpen, setFiltersOpen] = useState(false),
  [showAll, setShowAll] = useState(false);
  const amenities = useMemo(
    () =>
      [...new Set(properties.flatMap((p) => p.amenities || []))].slice(0, 10),
    [properties],
  );
  const shown = properties.filter(
  (p) =>
    (p.title + " " + p.district)
      .toLowerCase()
      .includes(query.toLowerCase()) &&
    (!budget || p.rooms.some((r) => Number(r.price) <= Number(budget))) &&
    (!amenity || p.amenities.includes(amenity)),
);

const visibleProperties = showAll ? shown : shown.slice(0, 3);

const hiddenPropertiesCount = Math.max(shown.length - 3, 0);

const reset = () => {
  setQuery("");
  setBudget("");
  setAmenity("");
  setShowAll(false);
  onReset();
};

const handleToggleShowAll = () => {
  if (showAll) {
    setShowAll(false);

    requestAnimationFrame(() => {
      document
        .getElementById("xasil-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return;
  }

  setShowAll(true);
};
  return (
    <section className="discovery" id="xasil-results">
      <div className="discovery-heading">
        <div>
          <span className="eyebrow">
            {so ? "JOOGITAANKAAGA XIGA" : "YOUR NEXT GREAT STAY"}
          </span>
          <h2>
            {category === "Hall"
              ? so
                ? "Meel loogu dabaaldego"
                : "A place to celebrate"
              : so
                ? "Hel hoyga kugu habboon"
                : "Find your kind of stay"}
          </h2>
          <p>
            {city === "All"
              ? so
                ? "Sahamiso hoteello, apartments iyo hoolal."
                : "Explore hotels, apartments and event spaces."
              : city}{" "}
            · {shown.length} {so ? "doorasho" : "options"}
          </p>
        </div>
        <button
          className="filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={18} />
          {so ? "Shaandhee" : "Filters"}
        </button>
      </div>
      <div className="discovery-layout">
        <aside
          className={"discovery-filters " + (filtersOpen ? "is-open" : "")}
        >
          <div className="filter-title">
            <strong>{so ? "Doorashadaada" : "Make it yours"}</strong>
            <button onClick={reset}>{so ? "Nadiifi" : "Reset"}</button>
          </div>
          <label>
            {so ? "Magaca ama degmada" : "Name or district"}
            <span className="filter-input">
              <Search size={17} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={so ? "Raadi hanti…" : "Find a property…"}
              />
            </span>
          </label>
          <label>
            {so ? "Qiimaha ugu badan / unug ($)" : "Maximum unit price ($)"}
            <input
              type="number"
              min="0"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder={so ? "Dhammaan qiimaha" : "Any price"}
            />
          </label>
          <p className="filter-note">
            {so
              ? "Qiimaha qolka habeenkii ama hoolka xafladdii."
              : "Room price per night or venue price per event."}
          </p>
          <div className="filter-amenities">
            <strong>{so ? "Adeegyada" : "Facilities"}</strong>
            {amenities.map((a) => (
              <label key={a}>
                <input
                  type="checkbox"
                  checked={amenity === a}
                  onChange={() => setAmenity(amenity === a ? "" : a)}
                />
                {a}
              </label>
            ))}
          </div>
          <div className="support-note">
            <Headphones size={24} />
            <strong>
              {so ? "Caawimaad ma rabtaa?" : "A little help choosing?"}
            </strong>
            <p>
              {so
                ? "Kala hadal XASIL hoyga ama hoolka kugu habboon."
                : "Talk to XASIL about a stay or venue that suits you."}
            </p>
            <button
              type="button"
              disabled
              title={so ? "WhatsApp lagama heli karo hordhacan" : "WhatsApp is unavailable in this preview"}
            >
              WhatsApp <ArrowUpRight size={16} />
            </button>
          </div>
        </aside>
        <div className="discovery-list">
          <div className="results-toolbar">
            <span>
              {so ? "Isbarbardhig. Dooro. Codso." : "Compare. Choose. Request."}
            </span>
            <select
              aria-label={so ? "Kala hormari" : "Sort properties"}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">
                {so ? "Kala horreynta" : "Default order"}
              </option>
              <option value="price-low">
                {so ? "Qiimaha hoose" : "Price: low to high"}
              </option>
              <option value="price-high">
                {so ? "Qiimaha sare" : "Price: high to low"}
              </option>
              <option value="rating">
                {so ? "Qiimeynta sare" : "Highest rating"}
              </option>
            </select>
          </div>
          {loading ? (
            <div
              className="result-skeletons"
              aria-label={so ? "Waa la soo dejinayaa" : "Loading properties"}
            >
              {[1, 2, 3].map((n) => (
                <div className="result-skeleton" key={n} />
              ))}
            </div>
          ) : error ? (
            <div className="result-empty" role="alert">
              <Building2 />
              <h3>
                {so ? "Xogta lama soo dejin" : "We couldn’t load the listings"}
              </h3>
              <p>
                {so
                  ? "Hubi xiriirka oo isku day mar kale."
                  : "Check your connection and try again."}
              </p>
              <button onClick={onRetry}>
                {so ? "Isku day mar kale" : "Try again"}
              </button>
            </div>
          ) : shown.length === 0 ? (
            <div className="result-empty">
              <Search />
              <h3>{so ? "Doorasho lama helin" : "No matching options"}</h3>
              <p>
                {so
                  ? "Beddel magaalada, martida ama shaandhaynta."
                  : "Try another city, guest count or filter."}
              </p>
              <button onClick={reset}>
                {so ? "Nadiifi raadinta" : "Reset search"}
              </button>
            </div>
          ) : (
            visibleProperties.map((p, i) => {
              const r = p.rooms
                .filter(
                  (room) => !budget || Number(room.price) <= Number(budget),
                )
                .slice()
                .sort((a, b) => Number(a.price) - Number(b.price))[0];
              return (
                <article
                  className="property-result"
                  key={p.id}
                  style={{ "--item-delay": `${Math.min(i, 5) * 45}ms` }}
                >
                  <button
                    className="result-photo"
                    onClick={() => onOpen(p)}
                    aria-label={`${so ? "Eeg" : "View"} ${p.title}`}
                  >
                    <img
                      src={p.image || fallback}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallback;
                      }}
                    />
                    <span>{p.subType || p.type}</span>
                  </button>
                  <div className="result-info">
                    <div className="result-topline">
                      <span className="property-kind">
                        {category === "Hall"
                          ? so
                            ? "HOOLAL & XAFLADO"
                            : "HALLS & EVENTS"
                          : "XASIL STAYS"}
                      </span>
                      {p.rating > 0 && (
                        <span className="rating-pill">
                          <Star size={13} fill="currentColor" aria-hidden="true" />
                          {p.rating}
                        </span>
                      )}
                    </div>
                    <h3>
                      <button onClick={() => onOpen(p)}>{p.title}</button>
                    </h3>
                    <p className="result-location">
                      <MapPin size={14} />
                      {p.district}, {p.city}
                    </p>
                    <div className="amenity-chips">
                      {p.amenities.slice(0, 3).map((a) => (
                        <span key={a}>{a}</span>
                      ))}
                    </div>
                    <p className="pay-cue">
                      <Check size={15} />
                      {so ? "Lacagta ku bixi goobta" : "Pay at property"}
                    </p>
                  </div>
                  <div className="result-price">
                    <span>{so ? "Ka bilaabmaya" : "From"}</span>
                    <strong>{r ? `$${r.price}` : "—"}</strong>
                    <small>
                      {r
                        ? r.period === "habeenkii"
                          ? so
                            ? "habeenkii"
                            : "per night"
                          : so
                            ? "xafladdii"
                            : "per event"
                        : so
                          ? "Qolal lama qorin"
                          : "No rooms listed"}
                    </small>
                                       <button onClick={() => onOpen(p)}>
                      {so ? "Eeg qolalka" : "Explore options"}
                      <ArrowRight size={17} />
                    </button>
                    <small>
                      {so
                        ? "Codsi · xaqiijin ayaa xigta"
                        : "Request · confirmation follows"}
                    </small>
                  </div>
                </article>
              );
            })
          )}

          {!loading && !error && shown.length > 2 && (
            <div className="flex justify-center pt-6 pb-2">
              <button
                type="button"
                onClick={handleToggleShowAll}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#063d35] px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#0a5147] active:scale-[0.98]"
              >
                {showAll
                  ? so
                    ? "Muuji Wax Yar"
                    : "Show Less"
                  : so
                    ? `Eeg Dhammaan (${hiddenPropertiesCount} kale)`
                    : `View All (${hiddenPropertiesCount} more)`}

                <ArrowRight
                  size={17}
                  className={`transition-transform duration-300 ${
                    showAll ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
