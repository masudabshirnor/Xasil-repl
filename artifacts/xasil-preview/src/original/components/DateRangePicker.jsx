import { useState, useRef } from "react";
export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const nightsBetween = (start, end) =>
  Math.max(0, Math.round((Date.parse(end) - Date.parse(start)) / 86400000)) ||
  0;
export default function DateRangePicker({
  start,
  end,
  onChange,
  lang,
  single = false,
}) {
  const so = lang === "SOM";
  const grid = useRef(null);
  const [hoverDate, setHoverDate] = useState("");
  const [open, setOpen] = useState(false),
    [selectingEnd, setSelectingEnd] = useState(false);
  const [month, setMonth] = useState(() => {
    const d = start ? new Date(start + "T12:00:00") : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const today = localDate(),
    count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const choose = (value) => {
    if (single) {
      onChange(value, "");
      setOpen(false);
      return;
    }
    if (!selectingEnd || !start || value <= start) {
      onChange(value, "");
      setSelectingEnd(true);
    } else {
      onChange(start, value);
      setSelectingEnd(false);
      setOpen(false);
    }
  };
  return (
    <div className="date-range">
      <span className="x-field-label">
        {single
          ? so
            ? "Taariikhda xafladda"
            : "Event date"
          : so
            ? "Taariikhaha joogitaanka"
            : "Stay dates"}
      </span>
      <button
        type="button"
        className="x-field date-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {start ||
          (single
            ? so
              ? "Dooro taariikh"
              : "Choose date"
            : so
              ? "Imaatinka"
              : "Check-in")}
        {!single && <> → {end || (so ? "Bixitaanka" : "Check-out")}</>}
        {nightsBetween(start, end) > 0 && (
          <small>
            {nightsBetween(start, end)} {so ? "habeen" : "nights"}
          </small>
        )}
      </button>
      {open && (
        <section
          className="date-panel"
          aria-label={so ? "Dooro taariikhaha" : "Choose dates"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setOpen(false);
            }
          }}
        >
          <div className="date-heading">
            <button
              type="button"
              aria-label={so ? "Bishii hore" : "Previous month"}
              disabled={
                month <=
                new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              }
              onClick={() =>
                setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
              }
            >
              ‹
            </button>
            <strong>
              {month.toLocaleDateString(so ? "so-SO" : "en-GB", {
                month: "long",
                year: "numeric",
              })}
            </strong>
            <button
              type="button"
              aria-label={so ? "Bisha xigta" : "Next month"}
              onClick={() =>
                setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
              }
            >
              ›
            </button>
          </div>
          <p aria-live="polite">
            {selectingEnd
              ? so
                ? "Hadda dooro bixitaanka"
                : "Now choose check-out"
              : so
                ? "Dooro imaatinka"
                : "Choose check-in"}
          </p>
          <div
            className="date-grid"
            ref={grid}
            onMouseLeave={() => setHoverDate("")}
            onKeyDown={(e) => {
              const delta = {
                ArrowRight: 1,
                ArrowLeft: -1,
                ArrowDown: 7,
                ArrowUp: -7,
              }[e.key];
              if (delta === undefined) return;
              const buttons = [...grid.current.querySelectorAll("button")];
              const index = buttons.indexOf(document.activeElement);
              const next = buttons[index + delta];
              if (next && !next.disabled) {
                e.preventDefault();
                next.focus();
              }
            }}
          >
            {(so
              ? ["Ax", "Is", "Ta", "Ar", "Kh", "Ji", "Sa"]
              : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
            ).map((x) => (
              <span key={x}>{x}</span>
            ))}
            {Array.from({ length: month.getDay() }, (_, i) => (
              <span key={"empty" + i} />
            ))}
            {Array.from({ length: count }, (_, i) => {
              const value = localDate(
                new Date(month.getFullYear(), month.getMonth(), i + 1),
              );
              return (
                <button
                  key={value}
                  type="button"
                  disabled={value < today}
                  aria-label={value}
                  aria-pressed={value === start || value === end}
                  className={
                    (value === start || value === end ? "selected " : "") +
                    (value > start && value < (selectingEnd ? hoverDate : end)
                      ? "in-range"
                      : "")
                  }
                  onMouseEnter={() => setHoverDate(value)}
                  onFocus={() => setHoverDate(value)}
                  onClick={() => choose(value)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="date-heading">
            <button
              type="button"
              onClick={() => {
                onChange("", "");
                setSelectingEnd(false);
              }}
            >
              {so ? "Nadiifi" : "Clear"}
            </button>
            <button
              type="button"
              aria-label="Close calendar"
              onClick={() => setOpen(false)}
            >
              {so ? "Xir" : "Close"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
