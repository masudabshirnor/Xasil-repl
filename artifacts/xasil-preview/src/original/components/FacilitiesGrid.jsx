import {
  Dumbbell,
  Utensils,
  Waves,
  Trees,
  Plane,
  PanelsTopLeft,
  Clock3,
  Snowflake,
  Coffee,
  ConciergeBell,
  Sparkles,
  Wifi,
  Car,
  CookingPot,
  Zap,
  ShieldCheck,
} from "lucide-react";

const facilityIconMap = {
  "Free Wi-Fi": Wifi,
  "Wi-Fi": Wifi,

  "Spa & fitness center": Dumbbell,
  Gym: Dumbbell,

  "Room service": ConciergeBell,

  "Outdoor swimming pool": Waves,
  "Swimming pool": Waves,

  Garden: Trees,

  Restaurant: Utensils,

  "Airport shuttle": Plane,

  Terrace: PanelsTopLeft,

  "24-hour front desk": Clock3,

  "Air conditioning": Snowflake,
  "Qaboojiye (AC)": Snowflake,

  "Excellent breakfast": Coffee,
  Breakfast: Coffee,

  Parking: Car,
  "Free parking": Car,

  Kitchen: CookingPot,
  Jiko: CookingPot,

  "Electricity 24/7": Zap,
  "Koronto 24/7": Zap,

  Security: ShieldCheck,
  Amni: ShieldCheck,
};

export default function FacilitiesGrid({
  facilities = [],
  lang = "ENG",
  title = "Most popular facilities",
}) {
  if (!facilities.length) return null;

  return (
    <section className="facilities-section">
      <div className="section-heading">
        <span className="section-eyebrow">
          {lang === "SOM" ? "Adeegyada hantida" : "Property facilities"}
        </span>

        <h2>{title}</h2>

        <p>
          {lang === "SOM"
            ? "Adeegyada ay hantidu bixiso."
            : "Facilities and services listed by this property."}
        </p>
      </div>

      <div className="facilities-grid">
        {facilities.map((facility) => {
          const Icon =
            Object.entries(facilityIconMap).find(
              ([name]) => name.toLowerCase() === facility.trim().toLowerCase(),
            )?.[1] || Sparkles;

          return (
            <div className="facility-card" key={facility}>
              <div className="facility-icon">
                <Icon size={21} strokeWidth={1.8} />
              </div>

              <span>{facility}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
