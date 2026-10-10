import { useEffect, useState } from "react";
import {
  X,
  Download,
  Share2,
  MessageCircle,
  Check,
  Copy,
  LoaderCircle,
} from "lucide-react";
export const receiptText = (b) =>
  [
    "XASIL — " +
      (b.draft ? "DRAFT / HORDHAC" : "REQUEST RECEIVED / CODSI LA HELAY"),
    ...(b.bookingCode ? ["Reference / Tixraac: " + b.bookingCode] : []),
    "Property / Hantida: " + b.propertyTitle,
    "Room / Qolka: " + b.roomName,
    "Location / Goobta: " + b.location,
    "Guest / Magaca: " + b.customerName,
    "Phone / Telefoon: " + b.customerPhone,
    ...(b.customerEmail
      ? ["Email: " + b.customerEmail]
      : []),
    "Check-in / Imaatinka: " +
      (b.checkInDate || "Not specified / Lama cayimin"),
    "Check-out / Bixitaanka: " +
      (b.checkOutDate || "Not applicable / Ma khuseyso"),
    "Duration / Muddada: " +
      b.days +
      (b.period === "habeenkii" ? " nights / habeen" : " event / xaflad"),
    "Guests / Martida: " + b.guests,
    "Unit price / Qiimaha unugga: $" + b.unitPrice,
    "Total / Wadarta: $" + b.totalPrice,
    "Payment / Bixinta: Pay at property / Ku bixi goobta",
    "Status / Xaaladda: " +
      (b.draft
        ? "Not submitted / Lama dirin"
        : "Pending property confirmation / Xaqiijin ayaa xigta"),
    ...(b.propertyUrl ? ["Property link: " + b.propertyUrl] : []),
    ...(b.photoUrl?.startsWith("https://")
      ? ["Property photo: " + b.photoUrl]
      : []),
    "XASIL support: +252 61 633 5511",
  ].join("\n");
async function loadPhoto(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const timer = setTimeout(() => resolve(null), 5000);
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = url || "/images/placeholder.svg";
  });
}
export async function makeReceipt(b) {
  const c = document.createElement("canvas");
  c.width = 1200;
  c.height = 6000;
  const x = c.getContext("2d");
  x.fillStyle = "#f6f8f5";
  x.fillRect(0, 0, c.width, c.height);
  const wrap = (text, width, font) => {
    x.font = font;
    const lines = [];
    let line = "";
    for (const char of String(text || "—")) {
      if (char === "\n" || x.measureText(line + char).width > width) {
        lines.push(line);
        line = char === "\n" ? "" : char;
      } else line += char;
    }
    if (line) lines.push(line);
    return lines;
  };
  const draw = (
    text,
    left,
    top,
    width,
    size = 28,
    color = "#063d35",
    bold = false,
  ) => {
    const font = (bold ? "bold " : "") + size + "px system-ui";
    const lines = wrap(text, width, font);
    x.font = font;
    x.fillStyle = color;
    lines.forEach((line, i) => x.fillText(line, left, top + i * (size * 1.4)));
    return top + lines.length * size * 1.4;
  };
  x.fillStyle = "#063d35";
  x.fillRect(0, 0, 1200, 180);
  draw("XASIL", 64, 92, 500, 54, "#e9c77c", true);
  draw("STABILITY, BOOKED.", 66, 134, 500, 22, "white");
  draw(
    b.draft ? "DRAFT · NOT SUBMITTED" : "REQUEST · PENDING",
    710,
    100,
    440,
    22,
    "white",
  );
  const photo = await loadPhoto(b.photoUrl);
  if (photo) {
    const scale = Math.max(1200 / photo.width, 430 / photo.height);
    x.save();
    x.beginPath();
    x.rect(0, 180, 1200, 430);
    x.clip();
    x.drawImage(
      photo,
      (1200 - photo.width * scale) / 2,
      180 + (430 - photo.height * scale) / 2,
      photo.width * scale,
      photo.height * scale,
    );
    x.restore();
  } else {
    x.fillStyle = "#dce9e1";
    x.fillRect(0, 180, 1200, 430);
    draw("XASIL · Photo unavailable / Sawir ma jiro", 64, 400, 1070, 32);
  }
  let y = draw(b.propertyTitle, 64, 678, 1070, 42, "#063d35", true);
  y = draw(b.roomName + " · " + b.location, 64, y + 12, 1070, 26, "#52665e");
  y =
    draw(
      b.bookingCode
        ? "REFERENCE / TIXRAAC: " + b.bookingCode
        : "PREVIEW ONLY / HORDHAC KELIYA",
      64,
      y + 26,
      1070,
      24,
    ) + 30;
  const rows = [
    ["Guest / Martida", b.customerName],
    ["Phone / Telefoon", b.customerPhone],
    ["Guests / Tirada", b.guests],
    ["Check-in / Imaatinka", b.checkInDate || "Not selected / Lama dooran"],
    [
      "Check-out / Bixitaanka",
      b.checkOutDate || "Not applicable / Ma khuseyso",
    ],
    [
      "Duration / Muddada",
      b.days +
        (b.period === "habeenkii" ? " nights / habeen" : " event / xaflad"),
    ],
    ["Unit price / Unugga", "$" + b.unitPrice],
  ];
  rows.forEach(([label, value]) => {
    const labelEnd = draw(label, 64, y, 390, 23, "#52665e");
    const valueEnd = draw(value, 470, y, 660, 26, "#063d35", true);
    y = Math.max(y + 66, labelEnd + 20, valueEnd + 20);
  });
  x.fillStyle = "#063d35";
  x.fillRect(40, y, 1120, 120);
  draw("TOTAL / WADARTA", 64, y + 73, 600, 30, "white");
  draw("$" + b.totalPrice, 840, y + 77, 300, 50, "#e9c77c", true);
  y += 180;
  y = draw("Pay at property / Lacagta ku bixi goobta", 64, y, 1070, 27);
  y = draw(
    b.draft
      ? "Not submitted. This is not a reservation."
      : "Awaiting property confirmation. This is not a confirmed reservation.",
    64,
    y + 15,
    1070,
    23,
    "#52665e",
  );
  y = draw("XASIL SUPPORT  +252 61 633 5511", 64, y + 40, 1070, 25) + 30;
  const output = document.createElement("canvas");
  output.width = 1200;
  output.height = Math.ceil(y);
  output.getContext("2d").drawImage(c, 0, 0);
  return new Promise((resolve, reject) =>
    output.toBlob(
      (blob) =>
        blob
          ? resolve(
              new File([blob], "XASIL-" + (b.bookingCode || "draft") + ".png", {
                type: "image/png",
              }),
            )
          : reject(new Error("Image export failed")),
      "image/png",
    ),
  );
}
export default function BookingReceipt({ booking: b, lang, onClose }) {
  const so = lang === "SOM";
  const [file, setFile] = useState(null),
    [preview, setPreview] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    let alive = true,
      url;
    makeReceipt(b)
      .then((f) => {
        if (alive) {
          setFile(f);
          url = URL.createObjectURL(f);
          setPreview(url);
        }
      })
      .catch(() => {
        if (alive)
          setNotice(
            so
              ? "Sawirka lama diyaarin. Faahfaahinta qoraalka waa diyaar."
              : "The image could not be prepared. Text details are available.",
          );
      });
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [b, so]);
  const text = receiptText(b);
  const download = () => {
    if (!file) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = file.name;
    a.click();
    setNotice(
      so
        ? "Sawirka waa la soo dejiyay. Ku lifaaq WhatsApp."
        : "Image downloaded. Attach it in WhatsApp.",
    );
  };
  const share = async () => {
    setBusy(true);
    try {
      if (file && navigator.canShare?.({ files: [file] }) && navigator.share) {
        await navigator.share({
          files: [file],
          title: "XASIL booking request",
          text,
        });
      } else {
        download();
        setNotice(
          so
            ? "Sawirka waa diyaar. Fur WhatsApp oo ku lifaaq sawirka la soo dejiyay."
            : "Choose WhatsApp details below, then attach the downloaded image.",
        );
      }
    } catch (e) {
      if (e.name !== "AbortError")
        setNotice(
          so
            ? "Isticmaal soo dejinta iyo WhatsApp."
            : "Use Download image and WhatsApp details instead.",
        );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="fixed inset-0 receipt-overlay">
      <div className="receipt-dialog">
        <button className="receipt-close" aria-label="Close" onClick={onClose}>
          <X />
        </button>
        <div className="receipt-visual">
          {preview ? (
            <img
              src={preview}
              alt={
                so
                  ? "Kaarka faahfaahinta codsiga"
                  : "Booking request information card"
              }
            />
          ) : (
            <div className="receipt-preparing">
              <LoaderCircle className="spin" />
              {so ? "Kaarka waa la diyaarinayaa…" : "Preparing your card…"}
            </div>
          )}
        </div>
        <div className="receipt-actions">
          <span className="receipt-check">
            <Check />
          </span>
          <span className="eyebrow">
            {b.draft
              ? so
                ? "HORDHAC · LAMA DIRIN"
                : "PREVIEW · NOT SUBMITTED"
              : so
                ? "CODSI LA HELAY"
                : "REQUEST RECEIVED"}
          </span>
          <h3>
            {b.draft
              ? so
                ? "Hubi faahfaahintaada"
                : "Your request, at a glance"
              : so
                ? "Tallaabo u dhow joogitaankaaga"
                : "One step closer to your stay"}
          </h3>
          <p>
            {b.draft
              ? so
                ? "Kaarkani ma aha qabasho. Hordhacan waxba lagama dirin ama lagama kaydin."
                : "This is a preview only. Nothing was sent or saved."
              : so
                ? "Hordhac keliya — codsi lama dirin, waxna lama kaydin."
                : "Preview only — no request was sent or saved."}
          </p>
          {b.bookingCode && (
            <strong className="receipt-reference">{b.bookingCode}</strong>
          )}
          <dl className="receipt-facts">
            <div>
              <dt>{so ? "Hantida" : "Property"}</dt>
              <dd>{b.propertyTitle}</dd>
            </div>
            <div>
  <dt>{so ? "Martida" : "Guest"}</dt>
  <dd>
    {b.customerName} · {b.guests}
  </dd>
</div>

<div>
  <dt>{so ? "Telefoon" : "Phone"}</dt>
  <dd>{b.customerPhone || "—"}</dd>
</div>

{b.customerEmail && (
  <div>
    <dt>Email</dt>
    <dd>{b.customerEmail}</dd>
  </div>
)}

<div>
  <dt>{so ? "Taariikhaha" : "Dates"}</dt>
              <dd>
                {b.checkInDate || "—"} → {b.checkOutDate || "—"}
              </dd>
            </div>
            <div>
              <dt>{so ? "Wadarta" : "Total"}</dt>
              <dd>${b.totalPrice}</dd>
            </div>
          </dl>
          <button
            className="pro-primary"
            onClick={share}
            disabled={!file || busy || b.draft}
            title={b.draft ? (so ? "Wadaagistu ma shaqeyso hordhacan" : "Sharing is disabled in this preview") : ""}
          >
            <Share2 size={18} />
            {b.draft
              ? so
                ? "Wadaagistu ma shaqeyso hordhacan"
                : "Sharing unavailable in preview"
              : so
                ? "La wadaag sawir + faahfaahin"
                : "Share photo + details"}
          </button>
          <div className="receipt-secondary">
            <button onClick={download} disabled={!file}>
              <Download size={17} />
              {so ? "Soo dejiso sawirka" : "Download image"}
            </button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(text);
                  setNotice(
                    so ? "Faahfaahinta waa la koobiyeeyay." : "Details copied.",
                  );
                } catch {
                  setNotice(
                    so
                      ? "Qoraalka ka koobiyee hoos."
                      : "Select and copy the details below.",
                  );
                }
              }}
            >
              <Copy size={17} />
              {so ? "Koobiyee" : "Copy details"}
            </button>
          </div>
          <button
            type="button"
            className="whatsapp-details"
            disabled
            title={so ? "WhatsApp lagama heli karo hordhacan" : "WhatsApp is unavailable in this preview"}
          >
            <MessageCircle size={18} />
            {so ? "WhatsApp lagama heli karo hordhacan" : "WhatsApp unavailable in preview"}
          </button>
          <p className="share-hint">
            {so
              ? "Telefoonka taageera, dooro WhatsApp marka liiska wadaagistu furmo. Haddii kale, soo dejiso sawirka oo gacanta ku lifaaq."
              : "On supported phones, choose WhatsApp in the share menu. Otherwise download the image and attach it manually."}
          </p>
          <p role="status" className="share-status">
            {notice}
          </p>
          <details>
            <summary>
              {so ? "Dhammaan faahfaahinta" : "All request details"}
            </summary>
            <pre className="receipt-text">{text}</pre>
          </details>
          <button className="receipt-done" onClick={onClose}>
            {b.draft
              ? so
                ? "Ku noqo foomka"
                : "Back to form"
              : so
                ? "Dhammaystir"
                : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
