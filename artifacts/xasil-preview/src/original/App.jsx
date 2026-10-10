import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import DateRangePicker, {
  localDate,
  nightsBetween,
} from "./components/DateRangePicker";
import useModalAccessibility from "./components/useModalAccessibility";
import Discovery from "./components/Discovery";
import BookingReceipt from "./components/BookingReceipt";
import "./Professional.css";
import HotelGallery from "./components/HotelGallery";
import FacilitiesGrid from "./components/FacilitiesGrid";
import {
  Calendar,
  Globe,
  MapPin,
  Star,
  Menu,
  X,
  ShieldCheck,
  Send,
  KeyRound,
  Plus,
  Trash2,
  Edit,
  Building2,
  Handshake,
  Facebook,
  Instagram,
  MessageCircle,
  CheckCircle2,
  Map as MapIcon,
  ExternalLink,
  Tag,
  ShoppingBag,
  TrendingUp,
  Filter,
  UserRound,
  LogIn,
  UserPlus,
  Headphones,
  Hotel,
  ArrowRight,
  Search,
  Users,
  ChevronDown,
  BedDouble,
  Heart,
  Clock3,
  CreditCard,
  CircleUserRound,
  Mail,
  LockKeyhole,
  Sparkles,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  ImageIcon,
  } from "lucide-react";

// Custom TikTok Icon Component
const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 1 1 2.31-1.42V8.9a6.34 6.34 0 0 0-1.12-.1A6.34 6.34 0 1 0 14.85 15V8a8.28 8.28 0 0 0 4.74 1.48V6.69z" />
  </svg>
);

// Logo Component and color
const XasilLogo = () => (
  <svg
    viewBox="0 0 420 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 md:h-9 w-auto block shrink-0"
  >
    <defs>
      <linearGradient id="darkGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#063d35" />
        <stop offset="100%" stopColor="#0a5147" />
      </linearGradient>
      <linearGradient id="richGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F3D27A" />
        <stop offset="45%" stopColor="#D6A64A" />
        <stop offset="100%" stopColor="#B98428" />
      </linearGradient>
    </defs>
    <g strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22 15 L 85 85" stroke="url(#darkGreenGrad)" />
      <path d="M 85 15 L 22 85" stroke="url(#darkGreenGrad)" />
      <path
        d="M 95 15 C 115 15, 128 27, 128 44 L 128 72 C 128 80, 136 80, 155 80"
        stroke="url(#richGoldGrad)"
        fill="none"
      />
    </g>
    <text
      x="170"
      y="56"
      textAnchor="start"
      fill="#063d35"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 900,
        fontSize: "38px",
        letterSpacing: "4px",
      }}
    >
      XASIL
    </text>
    <text
      x="170"
      y="78"
      textAnchor="start"
      fill="#56756f"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 800,
        fontSize: "13px",
        letterSpacing: "2px",
      }}
    >
      STABILITY, BOOKED.
    </text>
  </svg>
);

const CITIES = {
  Muqdisho: [
    "Cabdicasiis",
    "Boondheere",
    "Dayniile",
    "Dharkeynley",
    "Xamar-Jajab",
    "Xamar-Weyne",
    "Hodan",
    "Howlwadaag",
    "Huriwaa",
    "Kaaraan",
    "Kaxda",
    "Shangaani",
    "Shibis",
    "Waaberi",
    "Wadajir",
    "Warta-Nabadda",
    "Yaaqshiid",
    "Gubadley",
    "Daarusalaam",
    "Garasbaaley",
  ],
  Hargeysa: [
    "Mohamoud Haybe",
    "Mohamed Moge",
    "Ibrahim Kodbur",
    "31 May",
    "Ahmed Dhagah",
    "26 June",
    "Ga'an Libah",
    "Ahmed Moallim Haruun",
  ],
  Garoowe: [
    "Wadajir",
    "Waberi",
    "Hantiwadag",
    "Hodan",
    "1st August",
    "Halgan",
    "Horseed",
    "Israac",
  ],
  Dhuusamareeb: ["Dayah", "Hodan", "Horseed", "Waberi", "Waharadde"],
};
const CITY_LIST = Object.keys(CITIES);

// Representative local-only preview inventory. No request is made to a
// production listings service; all images are shipped with this artifact.
const DEMO_PROPERTIES = [
  {
    id: "demo-stay-1",
    title: "Xasil Beach Hotel",
    city: "Muqdisho",
    district: "Wadajir",
    type: "Stay",
    subType: "Hotel",
    rating: 4.7,
    maxGuests: 4,
    lat: 2.0469,
    lng: 45.3182,
    image: "/images/hero-xasil.jpg",
    description: "A welcoming stay by the coast, with comfortable rooms and thoughtful service.",
    amenities: ["Free Wi-Fi", "Qaboojiye (AC)", "Koronto 24/7", "Amni"],
    galleryImages: ["/images/hero-xasil.jpg"],
    propertyImages: [],
    rooms: [
      { id: "demo-room-1", name: "Standard Room", originalPrice: 95, price: 85, period: "habeenkii", capacity: 2, image: "/images/hero-xasil.jpg", desc: "Qol raaxo leh oo habeenkii ah." },
      { id: "demo-room-2", name: "Family Suite", originalPrice: 160, price: 145, period: "habeenkii", capacity: 4, image: "/images/hero-xasil.jpg", desc: "Qol ballaaran oo qoyska ku habboon." },
    ],
  },
  {
    id: "demo-stay-2",
    title: "Hodan City Apartments",
    city: "Muqdisho",
    district: "Hodan",
    type: "Stay",
    subType: "Apartment",
    rating: 4.5,
    maxGuests: 3,
    lat: 2.0415,
    lng: 45.3362,
    image: "/images/placeholder.svg",
    description: "Apartments in the heart of the city, close to dining and local businesses.",
    amenities: ["Free Wi-Fi", "Kitchen", "Koronto 24/7", "Amni"],
    galleryImages: ["/images/placeholder.svg"],
    propertyImages: [],
    rooms: [
      { id: "demo-room-3", name: "City Apartment", originalPrice: 75, price: 68, period: "habeenkii", capacity: 3, image: "/images/placeholder.svg", desc: "Apartment si fiican loo diyaariyay." },
    ],
  },
  {
    id: "demo-stay-3",
    title: "Hargeysa Garden Hotel",
    city: "Hargeysa",
    district: "Mohamed Moge",
    type: "Stay",
    subType: "Hotel",
    rating: 4.6,
    maxGuests: 2,
    lat: 9.56,
    lng: 44.06,
    image: "/images/hero-xasil.jpg",
    description: "A calm city hotel with friendly service and the essentials for a good stay.",
    amenities: ["Free Wi-Fi", "Restaurant", "Qaboojiye (AC)", "Parking"],
    galleryImages: ["/images/hero-xasil.jpg"],
    propertyImages: [],
    rooms: [
      { id: "demo-room-4", name: "Garden Room", originalPrice: 90, price: 78, period: "habeenkii", capacity: 2, image: "/images/hero-xasil.jpg", desc: "Qol nadiif ah oo deggan." },
    ],
  },
  {
    id: "demo-hall-1",
    title: "Xeebta Event Hall",
    city: "Muqdisho",
    district: "Wadajir",
    type: "Hall",
    subType: "Event Hall",
    rating: 4.8,
    maxGuests: 250,
    lat: 2.0469,
    lng: 45.3182,
    image: "/images/hall-banner.jpg",
    description: "A spacious event venue for weddings, celebrations, and gatherings.",
    amenities: ["Free Wi-Fi", "Parking", "Koronto 24/7", "Amni"],
    galleryImages: ["/images/hall-banner.jpg"],
    propertyImages: [],
    rooms: [
      { id: "demo-hall-room-1", name: "Main Event Hall", originalPrice: 950, price: 850, period: "xafladdii", capacity: 250, image: "/images/hall-banner.jpg", desc: "Hool munaasabad ballaaran." },
    ],
  },
];

const DESTINATION_VISUALS = {
  Muqdisho: "/images/hero-xasil.jpg",
  Hargeysa: "/images/hero-xasil.jpg",
  Garoowe: "/images/hero-xasil.jpg",
  Dhuusamareeb: "/images/hero-xasil.jpg",
};

const HERO_IMAGE = "/images/hero-xasil.jpg";
const HALL_IMAGE = "/images/hall-banner.jpg";

const isAdminSession = (session) =>
  session?.user?.app_metadata?.role === "admin";

// Translates a Supabase `properties` row (with its nested `rooms`, fetched
// via the foreign key relationship) into the exact shape this component
// already expects. Keeping this mapping in one place means none of the
// rendering code below has to change.
function mapPropertyFromDb(row) {
  return {
    id: row.id,
    title: row.title,
    city: row.city,
    district: row.district,
    type: row.type,
    subType: row.sub_type,
    rating: row.rating,
    maxGuests: row.max_guests,
    lat: row.latitude,
    lng: row.longitude,
    image: row.main_image_url,
    description: row.description,
    amenities: row.amenities || [],
    rooms: (row.rooms || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((r) => ({
        id: r.id,
        name: r.name,
        originalPrice: r.original_price,
        price: r.price,
        period: r.period,
        capacity: r.capacity,
        image: r.image_url,
        desc: r.description,
      })),
  };
}

// Translates a Supabase `bookings` row into the shape the admin Orders tab
// already renders.
function mapBookingFromDb(row) {
  return {
    id: row.booking_code,
    propertyTitle: row.property_title,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    roomName: row.room_name,
    price: row.unit_price,
    period: row.period,
    days: row.units,
    status: row.status,
    date: row.created_at ? row.created_at.slice(0, 10) : "",
  };
}

export default function App() {
  useModalAccessibility();
  const [lang, setLang] = useState("SOM");
  useEffect(() => {
    document.documentElement.lang = lang === "SOM" ? "so" : "en";
  }, [lang]);
  useEffect(() => {
    const blockPreviewHandoff = (event) => {
      const link = event.target.closest?.('a[href*="wa.me"]');
      if (!link) return;
      event.preventDefault();
      event.stopPropagation();
      notify(
        lang === "SOM"
          ? "Hordhac keliya — WhatsApp laguma xiriirin."
          : "Preview only — WhatsApp handoff is unavailable.",
        "info",
      );
    };
    document.addEventListener("click", blockPreviewHandoff, true);
    return () => document.removeEventListener("click", blockPreviewHandoff, true);
  }, [lang]);
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Stay");
  const [sortBy, setSortBy] = useState("recommended");

  const [searchDestination, setSearchDestination] = useState("All::All");
  const [searchGuests, setSearchGuests] = useState(1);
  const [customHallGuests, setCustomHallGuests] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("orders");
  const [orderFilterHotel, setOrderFilterHotel] = useState("All");

  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState("terms");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const [customerAuthMode, setCustomerAuthMode] = useState("login");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerAuthError, setCustomerAuthError] = useState("");
  const [customerAuthMessage, setCustomerAuthMessage] = useState("");
  const [toast, setToast] = useState(null);
  const notify = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__xasilToastTimer);
    window.__xasilToastTimer = window.setTimeout(() => setToast(null), 3600);
  };

  // Preview never restores or creates a signed-in session.
  useEffect(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  // Admin has no public navigation entry. Visiting /admin only opens the
  // protected sign-in surface; authorization still depends on the admin role.
  useEffect(() => {
    // Admin access is intentionally not exposed in this public preview.
    setIsAdminOpen(false);
  }, []);

  // Properties + rooms + gallery images are public data.
const fetchProperties = async () => {
  setPropertiesLoading(true);
  setPropertiesError(false);
  setProperties(DEMO_PROPERTIES);
  setPropertiesLoading(false);
};

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("property");
    if (id && properties.length) {
      const property = properties.find((p) => String(p.id) === id);
      if (property) setDetailsProperty(property);
    }
  }, [properties]);

  // Bookings require an authenticated session to read (RLS), so this only
  // loads once the admin is logged in, and clears again on logout.
  const fetchOrders = async () => {
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setOrders(data.map(mapBookingFromDb));
    }
    setOrdersLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [isAuthenticated]);

  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [propertyPendingDelete, setPropertyPendingDelete] = useState(null);

  const [partnerPropertyName, setPartnerPropertyName] = useState("");
  const [partnerType, setPartnerType] = useState("Hotel");
  const [partnerCity, setPartnerCity] = useState("Muqdisho");
  const [partnerDistrict, setPartnerDistrict] = useState(CITIES.Muqdisho[0]);
  const [partnerOwnerName, setPartnerOwnerName] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newCity, setNewCity] = useState("Muqdisho");
  const [newDistrict, setNewDistrict] = useState("Hodan");
  const [newType, setNewType] = useState("Stay");
  const [newSubType, setNewSubType] = useState("Hotel");
  const [newDesc, setNewDesc] = useState("");
  const [newMainImage, setNewMainImage] = useState("");
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const [newLat, setNewLat] = useState(2.0469);
  const [newLng, setNewLng] = useState(45.3182);
  const [newAmenitiesInput, setNewAmenitiesInput] = useState(
    "Free Wi-Fi, Koronto 24/7, Qaboojiye (AC), Amni",
  );

  const [newRooms, setNewRooms] = useState([
    {
      name: "Standard Room",
      originalPrice: 160,
      price: 150,
      period: "habeenkii",
      capacity: 2,
      image: "",
      desc: "",
    },
  ]);

  const submitLock = useRef(false);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingProperty, setBookingProperty] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [detailsProperty, setDetailsProperty] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerBookingEmail, setCustomerBookingEmail] = useState("");
  const [bookingGuests, setBookingGuests] = useState(1);

  const t = {
    tagline:
      lang === "SOM"
        ? "Si fudud ku hel meel aad ku hooyato"
        : "Easily find your perfect stay",
    search: lang === "SOM" ? "Raadi Hoy" : "Search Properties",
    checkIn: lang === "SOM" ? "Taariikhda Imaatinka" : "Check-in Date",
    checkOut: lang === "SOM" ? "Taariikhda Bixitaanka" : "Check-out Date",
    guests: lang === "SOM" ? "Martida / Tirada Dadka" : "Guests / Capacity",
    destination: lang === "SOM" ? "Magaalada ama Degmada" : "Destination",
    bookNow: lang === "SOM" ? "Qabso Hadda" : "Book Now",
    viewDetails:
      lang === "SOM" ? "Eeg Qolalka & Sawirada" : "View Rooms & Details",
    total: lang === "SOM" ? "Wadarta Qiimaha" : "Total Price",
    staysTab:
      lang === "SOM"
        ? "Hoy (Hoteello & Apartments)"
        : "Stays (Hotels & Apartments)",
    hallsTab:
      lang === "SOM" ? "Hoolal (Aroos & Xaflado)" : "Halls (Wedding & Events)",
    staysShort: lang === "SOM" ? "Hoy" : "Stays",
    staysSub: lang === "SOM" ? "Hoteello & Apartments" : "Hotels & Apartments",
    hallsShort: lang === "SOM" ? "Hoolal" : "Halls",
    hallsSub: lang === "SOM" ? "Aroos & Xaflado" : "Wedding & Events",
    emptyStayMsg:
      lang === "SOM"
        ? "Degmadan wali lagama helin wax hoy ah. Fadlan guji batoonka hoose si aad u aragto dhammaan hoyaalka la heli karo."
        : "No stays found in this district. Click below to view all available stays.",
    emptyStayBtn: lang === "SOM" ? "Eeg Dhammaan Hoyaalka" : "View All Stays",
    emptyHallMsg:
      lang === "SOM"
        ? "Degmadan wali lagama helin wax hool ah. Fadlan guji batoonka hoose si aad u aragto dhammaan hoolalka la heli karo."
        : "No halls found in this district. Click below to view all available halls.",
    emptyHallBtn: lang === "SOM" ? "Eeg Dhammaan Hoolalka" : "View All Halls",
    partnerBannerTitle:
      lang === "SOM"
        ? "Ma leedahay Hotel, Apartment ama Hool?"
        : "Do you own a Hotel, Apartment or Hall?",
    partnerBannerSub:
      lang === "SOM"
        ? "Kori ganacsigaaga oo ku soo dar hantidaada platform-ka XASIL si aad u hesho macaamiil toos ah."
        : "Grow your business by listing your property on XASIL platform.",
    registerPropertyBtn:
      lang === "SOM" ? "+ Diwaan-geli Hantidaada" : "+ Register Your Property",
    fullName: lang === "SOM" ? "Magacaaga Buuxa" : "Full Name",
    phoneNumber:
      lang === "SOM"
        ? "Nambarka Taleefanka (WhatsApp)"
        : "Phone Number (WhatsApp)",
    sendWhatsapp: lang === "SOM" ? "Eeg hordhaca codsiga" : "Preview request",
  };

  const filteredProperties = properties
    .filter((p) => {
      const matchCity = selectedCity === "All" || p.city === selectedCity;
      const matchDistrict =
        selectedDistrict === "All" ||
        p.district.toLowerCase() === selectedDistrict.toLowerCase();
      let matchCategory = false;
      if (selectedCategory === "Stay") {
        matchCategory =
          p.type === "Stay" ||
          p.type === "Hotel" ||
          p.type === "Guest House" ||
          p.type === "Apartment";
      } else if (selectedCategory === "Hall") {
        matchCategory = p.type === "Hall";
      }
      const effectiveGuests =
        selectedCategory === "Hall" && searchGuests === 0 && customHallGuests
          ? Number(customHallGuests) || 1
          : searchGuests;
      const matchGuests =
        effectiveGuests <= 1 ||
        Math.max(
          Number(p.maxGuests) || 0,
          ...p.rooms.map((r) => Number(r.capacity) || 0),
        ) >= effectiveGuests;
      return matchCity && matchDistrict && matchCategory && matchGuests;
    })
    .sort((a, b) => {
      if (!a.rooms.length && !b.rooms.length) return 0;
      if (!a.rooms.length) return 1;
      if (!b.rooms.length) return -1;
      if (sortBy === "price-low") {
        return (
          Math.min(...a.rooms.map((r) => Number(r.price))) -
          Math.min(...b.rooms.map((r) => Number(r.price)))
        );
      }

      if (sortBy === "price-high") {
        return (
          Math.min(...b.rooms.map((r) => Number(r.price))) -
          Math.min(...a.rooms.map((r) => Number(r.price)))
        );
      }

      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }

      return 0;
    });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const [city, district] = searchDestination.split("::");
    setSelectedCity(city);
    setSelectedDistrict(district);
    document
      .getElementById("xasil-results")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError(
      lang === "SOM"
        ? "Maamulka lagama heli karo hordhacan."
        : "Admin access is unavailable in this preview.",
    );
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setAdminEmail("");
    setAdminPassword("");
  };

  const openCustomerAuth = (mode) => {
    setCustomerAuthMode(mode);
    setCustomerAuthError("");
    setCustomerAuthMessage("");
    setIsCustomerAuthOpen(true);
    setMenuOpen(false);
  };

  const handleCustomerAuth = async (e) => {
    e.preventDefault();
    setCustomerAuthError(
      lang === "SOM"
        ? "Gelitaanka akoonka ma shaqeeyo hordhacan."
        : "Account access is disabled in this preview.",
    );
    setCustomerAuthMessage("");
  };

  const handleCustomerLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddRoomField = () => {
    setNewRooms([
      ...newRooms,
      {
        name: "",
        originalPrice: 120,
        price: 100,
        period: "habeenkii",
        capacity: 2,
        image: "",
        desc: "",
      },
    ]);
  };

  const handleRemoveRoomField = (index) => {
    setNewRooms(newRooms.filter((_, i) => i !== index));
  };

  const handleMainImageUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    notify("Please choose a JPG, PNG or WebP image.", "error");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    notify("Image must be smaller than 5 MB.", "error");
    event.target.value = "";
    return;
  }

  try {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `properties/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      throw new Error("Could not create image URL.");
    }

    setNewMainImage(data.publicUrl);

    notify("Property image uploaded successfully.", "success");
  } catch (error) {
    console.error("Property image upload error:", error);

    notify(
      error?.message || "Could not upload the image. Please try again.",
      "error",
    );
  } finally {
    event.target.value = "";
  }
};

const handleGalleryImagesUpload = async (event) => {
  const files = Array.from(event.target.files || []);

  if (files.length === 0) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const validFiles = files.filter(
    (file) =>
      allowedTypes.includes(file.type) &&
      file.size <= 5 * 1024 * 1024,
  );

  if (validFiles.length !== files.length) {
    notify(
      "Some images were skipped. Only JPG, PNG or WebP files under 5 MB are allowed.",
      "warning",
    );
  }

  if (validFiles.length === 0) {
    event.target.value = "";
    return;
  }

  try {
    const uploadedUrls = [];

    for (const file of validFiles) {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName =
        `gallery/${Date.now()}-${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      if (!data?.publicUrl) {
        throw new Error("Could not create gallery image URL.");
      }

      uploadedUrls.push(data.publicUrl);
    }

    setNewGalleryImages((currentImages) => [
      ...currentImages,
      ...uploadedUrls,
    ]);

    notify(
      `${uploadedUrls.length} gallery image${
        uploadedUrls.length === 1 ? "" : "s"
      } uploaded successfully.`,
      "success",
    );
  } catch (error) {
    console.error("Gallery image upload error:", error);

    notify(
      error?.message ||
        "Could not upload the gallery images. Please try again.",
      "error",
    );
  } finally {
    event.target.value = "";
  }
};
const handleRoomImageUpload = async (event, roomIndex) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    notify("Please choose a JPG, PNG or WebP image.", "error");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    notify("Image must be smaller than 5 MB.", "error");
    event.target.value = "";
    return;
  }

  try {
    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName =
      `rooms/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      throw new Error("Could not create room image URL.");
    }

    setNewRooms((currentRooms) =>
      currentRooms.map((room, index) =>
        index === roomIndex
          ? {
              ...room,
              image: data.publicUrl,
            }
          : room,
      ),
    );

    notify("Room image uploaded successfully.", "success");
  } catch (error) {
    console.error("Room image upload error:", error);

    notify(
      error?.message ||
        "Could not upload the room image. Please try again.",
      "error",
    );
  } finally {
    event.target.value = "";
  }
};
  const handleCreateOrUpdateProperty = async (e) => {
    e.preventDefault();
    const amenitiesArray = newAmenitiesInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const propertyPayload = {
      title: newTitle,
      city: newCity,
      district: newDistrict,
      type: newType,
      sub_type: newType === "Stay" ? newSubType : "Event Hall",
      description: newDesc,
      latitude: Number(newLat),
      longitude: Number(newLng),
      amenities:
        amenitiesArray.length > 0
          ? amenitiesArray
          : ["Free Wi-Fi", "Koronto 24/7", "Qaboojiye (AC)", "Amni"],
      max_guests: Math.max(...newRooms.map((r) => Number(r.capacity) || 2)),
    };
    if (newMainImage) {
      propertyPayload.main_image_url = newMainImage;
    }

    if (editingPropertyId) {
      const { error: propError } = await supabase
        .from("properties")
        .update(propertyPayload)
        .eq("id", editingPropertyId);

      if (propError) {
  notify(
    lang === "SOM"
      ? "Khalad ayaa dhacay markii la cusbooneysiinayay hantida."
      : "Something went wrong updating this property.",
    "error",
  );
  return;
}

/* SYNC PROPERTY GALLERY */

// Remove the old gallery database records for this property.
const { error: deleteGalleryError } = await supabase
  .from("property_images")
  .delete()
  .eq("property_id", editingPropertyId);

if (deleteGalleryError) {
  console.error(
    "Could not clear existing property gallery:",
    deleteGalleryError,
  );

  notify(
    lang === "SOM"
      ? "Gallery-ga hore lama cusbooneysiin karin."
      : "The existing property gallery could not be updated.",
    "error",
  );

  return;
}

// Recreate the gallery using exactly what is currently visible
// in the Property Gallery editor.
if (newGalleryImages.length > 0) {
  const galleryRows = newGalleryImages.map((imageUrl, index) => ({
    property_id: editingPropertyId,
    image_url: imageUrl,
    sort_order: index,
  }));

  const { error: insertGalleryError } = await supabase
    .from("property_images")
    .insert(galleryRows);

  if (insertGalleryError) {
    console.error(
      "Could not save updated property gallery:",
      insertGalleryError,
    );

    notify(
      lang === "SOM"
        ? "Sawirrada gallery-ga cusub lama kaydin."
        : "The updated gallery images could not be saved.",
      "error",
    );

    return;
  }
}

// Sync rooms: remove any dropped from the form, update existing ones,
// insert any brand-new ones (those without a real id yet).
      const existingProperty = properties.find(
        (p) => p.id === editingPropertyId,
      );
      const previousRoomIds = (existingProperty?.rooms || []).map((r) => r.id);
      const keptRoomIds = newRooms.filter((r) => r.id).map((r) => r.id);
      const removedRoomIds = previousRoomIds.filter(
        (id) => !keptRoomIds.includes(id),
      );

      if (removedRoomIds.length > 0) {
        const { error: delError } = await supabase
          .from("rooms")
          .delete()
          .in("id", removedRoomIds);
        if (delError) {
          notify(
            lang === "SOM"
              ? "Qolal badan lama tirtiri karo maadaama dalabaad horey loogu sameeyay. Isbeddelada kale waa la kaydiyay."
              : "One or more rooms couldn't be removed because they already have bookings attached. Your other changes were saved.",
            "warning",
          );
        }
      }

      for (const r of newRooms) {
        const roomPayload = {
          name: r.name,
          original_price: r.originalPrice || null,
          price: Number(r.price),
          period: r.period,
          capacity: Number(r.capacity) || 1,
          image_url: r.image || null,
          description: r.desc || null,
        };
        if (r.id) {
          await supabase.from("rooms").update(roomPayload).eq("id", r.id);
        } else {
          await supabase
            .from("rooms")
            .insert({ ...roomPayload, property_id: editingPropertyId });
        }
      }

      notify(
        lang === "SOM"
          ? "Hantida waa la cusbooneysiiyay!"
          : "Property updated successfully!",
      );
      setEditingPropertyId(null);
    } else {
      const { data: newProp, error: propError } = await supabase
        .from("properties")
        .insert({
          ...propertyPayload,
          main_image_url: newMainImage || "/images/hero-xasil.jpg",
          rating: 5.0,
        })
        .select()
        .single();

      if (propError || !newProp) {
  notify(
    lang === "SOM"
      ? "Khalad ayaa dhacay markii la abuurayay hantida."
      : "Something went wrong creating this property.",
    "error",
  );
  return;
}

/* SAVE PROPERTY GALLERY */
if (newGalleryImages.length > 0) {
  const galleryRows = newGalleryImages.map((imageUrl, index) => ({
    property_id: newProp.id,
    image_url: imageUrl,
    sort_order: index,
  }));

  const { error: galleryError } = await supabase
    .from("property_images")
    .insert(galleryRows);

  if (galleryError) {
    console.error("Property gallery save error:", galleryError);

    notify(
      lang === "SOM"
        ? "Hantida waa la kaydiyay, laakiin sawirrada gallery-ga lama kaydin."
        : "The property was saved, but its gallery images failed to save.",
      "warning",
    );
  }
}

const roomsToInsert = newRooms.map((r, idx) => ({
  property_id: newProp.id,
  name: r.name,
  original_price: r.originalPrice || null,
  price: Number(r.price),
  period: r.period,
  capacity: Number(r.capacity) || 1,
  image_url: r.image || null,
  description: r.desc || null,
  sort_order: idx,
}));

      const { error: roomsError } = await supabase
        .from("rooms")
        .insert(roomsToInsert);
      if (roomsError) {
        notify(
          lang === "SOM"
            ? "Hantida waa la kaydiyay, laakiin qolalka lama gelin."
            : "The property was saved, but its rooms failed to save.",
          "warning",
        );
      } else {
        notify(
          lang === "SOM"
            ? "Dhismaha iyo qolalka waa la geliyay!"
            : "Property and rooms added successfully!",
        );
      }
    }

    await fetchProperties();

    setNewTitle("");
    setNewDesc("");
    setNewMainImage("");
    setNewGalleryImages([]);
    setNewLat(2.0469);
    setNewLng(45.3182);
    setNewAmenitiesInput("Free Wi-Fi, Koronto 24/7, Qaboojiye (AC), Amni");
    setNewRooms([
      {
        name: "Standard Room",
        originalPrice: 160,
        price: 150,
        period: "habeenkii",
        capacity: 2,
        image: "",
        desc: "",
      },
    ]);
  };

  const handleEditClick = (p) => {
  setEditingPropertyId(p.id);

  setNewTitle(p.title);
  setNewCity(p.city || "Muqdisho");
  setNewDistrict(p.district);
  setNewType(p.type);
  setNewSubType(p.subType || "Hotel");

  setNewDesc(p.description || "");
  setNewMainImage(p.image || "");

  // Load the existing property gallery into the editor.
  setNewGalleryImages(p.galleryImages || []);

  setNewLat(p.lat || 2.0469);
  setNewLng(p.lng || 45.3182);

  setNewAmenitiesInput(
    p.amenities ? p.amenities.join(", ") : "",
  );

  setNewRooms(p.rooms || []);

  setAdminTab("add");
};

  const handleDeleteProperty = (property) => {
    setPropertyPendingDelete(property);
  };

  const confirmDeleteProperty = async () => {
    if (!propertyPendingDelete) return;

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyPendingDelete.id);

    if (error) {
      notify(
        lang === "SOM"
          ? "Lama tirtiri karo: hantidan waxay leedahay dalabaad horey loo sameeyay."
          : "This property has existing bookings and cannot be deleted.",
        "error",
      );

      setPropertyPendingDelete(null);
      return;
    }

    notify(
      lang === "SOM"
        ? "Hantida waa la tirtiray."
        : "Property deleted successfully.",
    );

    setPropertyPendingDelete(null);
    await fetchProperties();
  };

  const handleOrderStatusChange = async (bookingCode, newStatus) => {
    const previousOrders = orders;
    setOrders(
      orders.map((o) =>
        o.id === bookingCode ? { ...o, status: newStatus } : o,
      ),
    );
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("booking_code", bookingCode);
    if (error) {
      setOrders(previousOrders);
      notify(
        lang === "SOM"
          ? "Khalad ayaa dhacay. Fadlan isku day mar kale."
          : "Something went wrong updating this booking. Please try again.",
        "error",
      );
    }
  };

  const handleBookingWhatsApp = (ord) => {
    notify(
      lang === "SOM"
        ? "Hordhac keliya — WhatsApp lagama heli karo."
        : "Preview only — WhatsApp is unavailable.",
      "info",
    );
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    notify(
      lang === "SOM"
        ? "Hordhac keliya — xogta hantida lama dirin."
        : "Preview only — property details were not sent.",
      "info",
    );
    setIsPartnerOpen(false);
  };

  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
    );
    return diff > 0 ? diff : 1;
  };

  const receiptData = (draft = true, bookingCode = null) => {
    const days = selectedRoom.period === "habeenkii" ? calculateDays() : 1;
    const url = new URL("/", window.location.origin);
    url.searchParams.set("property", bookingProperty.id);
    return {
      draft,
      bookingCode,
      propertyTitle: bookingProperty.title,
      roomName: selectedRoom.name,
      photoUrl: selectedRoom.image || bookingProperty.image,
      location: [bookingProperty.district, bookingProperty.city]
        .filter(Boolean)
        .join(", "),
      customerName: customerName.trim(),
      customerPhone: customerPhone
        ? `+252${customerPhone.replace(/\D/g, "").replace(/^252/, "").replace(/^0/, "")}`
        : "",
      customerEmail: customerBookingEmail.trim(),
      checkInDate:
        selectedRoom.period === "habeenkii" ? checkInDate : eventDate,
      checkOutDate: selectedRoom.period === "habeenkii" ? checkOutDate : "",
      days,
      guests: bookingGuests,
      period: selectedRoom.period,
      unitPrice: selectedRoom.price,
      totalPrice: selectedRoom.price * days,
      propertyUrl: ["localhost", "127.0.0.1"].includes(window.location.hostname)
        ? ""
        : url.href,
    };
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current) return;
    setBookingError("");
    if (customerName.trim().length < 2) {
  setBookingError(
    lang === "SOM"
      ? "Fadlan geli magacaaga oo buuxa."
      : "Please enter your full name.",
  );
  return;
}

const cleanSomaliPhone = customerPhone.replace(/\D/g, "");

if (!/^[6-7]\d{8}$/.test(cleanSomaliPhone)) {
  setBookingError(
    lang === "SOM"
      ? "Geli nambar Soomaali sax ah oo 9 lambar ah."
      : "Enter a valid 9-digit Somali mobile number.",
  );
  return;
}

if (
  customerBookingEmail.trim() &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerBookingEmail.trim())
) {
  setBookingError(
    lang === "SOM"
      ? "Email-ka aad gelisay sax ma aha."
      : "Enter a valid email address or leave it empty.",
  );
  return;
}

const normalizedCustomerPhone = `+252${cleanSomaliPhone}`;
    if (
      selectedRoom.period === "habeenkii" &&
      (!checkInDate ||
        checkInDate < localDate() ||
        nightsBetween(checkInDate, checkOutDate) < 1)
    ) {
      setBookingError(
        lang === "SOM"
          ? "Dooro imaatin maanta ama ka dib iyo bixitaan ka dambeeya."
          : "Choose check-in today or later and a later check-out.",
      );
      return;
    }
    if (
      !Number.isInteger(Number(bookingGuests)) ||
      bookingGuests < 1 ||
      bookingGuests > Number(selectedRoom.capacity || 1)
    ) {
      setBookingError(
        lang === "SOM" ? "Hubi tirada martida." : "Check the guest count.",
      );
      return;
    }
    if (
      selectedRoom.period !== "habeenkii" &&
      (!eventDate || eventDate < localDate())
    ) {
      setBookingError(
        lang === "SOM"
          ? "Dooro taariikhda xafladda maanta ama ka dib."
          : "Choose an event date today or later.",
      );
      return;
    }
    submitLock.current = true;
    setBookingBusy(true);
    try {
      // Receipt content remains on this device. No reservation request is
      // sent, persisted, or handed off to WhatsApp in the preview.
      setReceiptPreview(receiptData(true));
      setBookingProperty(null);
    } catch {
      setBookingError(
        lang === "SOM"
          ? "Xiriirku wuu go’ay. La xiriir taageerada ka hor intaadan mar kale dirin."
          : "Connection interrupted. Contact support before submitting again to avoid a duplicate.",
      );
    } finally {
      submitLock.current = false;
      setBookingBusy(false);
    }
  };

  const filteredOrdersList =
    orderFilterHotel === "All"
      ? orders
      : orders.filter(
          (o) =>
            o.propertyTitle.toLowerCase() === orderFilterHotel.toLowerCase(),
        );

  const propertyWeeklyCounts = {};
  orders.forEach((o) => {
    propertyWeeklyCounts[o.propertyTitle] =
      (propertyWeeklyCounts[o.propertyTitle] || 0) + 1;
  });

  const maxOrdersCount = Math.max(...Object.values(propertyWeeklyCounts), 1);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-stone-50 text-neutral-800 font-sans relative flex flex-col justify-between">
      <div>
        <header className="sticky top-0 z-40 bg-white/96 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.05)]">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between gap-5">
            <button
              className="flex items-center shrink-0"
              onClick={() => {
                setSelectedCity("All");
                setSelectedDistrict("All");
                setSelectedCategory("Stay");
                setSearchDestination("All::All");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="XASIL home"
            >
              <XasilLogo />
            </button>
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory("Stay");
                  setSelectedCity("All");
                  setSelectedDistrict("All");
                }}
                className="x-nav-link"
              >
                {lang === "SOM" ? "Hoy" : "Stays"}
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Hall");
                  setSelectedCity("All");
                  setSelectedDistrict("All");
                  setSearchGuests(25);
                }}
                className="x-nav-link"
              >
                {lang === "SOM" ? "Hoolal & Xaflado" : "Halls & Events"}
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("popular-destinations")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="x-nav-link"
              >
                {lang === "SOM" ? "Goobaha" : "Destinations"}
              </button>
              <button
                onClick={() => setIsPartnerOpen(true)}
                className="x-nav-link"
              >
                {lang === "SOM" ? "Ku dar hantidaada" : "List your property"}
              </button>
              <a
                href="#preview"
                onClick={(e) => {
                  e.preventDefault();
                  notify(lang === "SOM" ? "Hordhac keliya — WhatsApp lagama heli karo." : "Preview only — WhatsApp is unavailable.");
                }}
                target="_blank"
                rel="noreferrer"
                className="x-nav-link inline-flex items-center gap-1.5"
              >
                <Headphones className="w-4 h-4" />
                {lang === "SOM" ? "Caawimaad" : "Help"}
              </a>
            </nav>
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={() => setLang(lang === "SOM" ? "ENG" : "SOM")}
                className="x-outline-btn"
              >
                <Globe className="w-4 h-4" />
                {lang === "SOM" ? "ENG" : "SOM"}
              </button>
              {currentUser ? (
                <>
                  <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 max-w-44">
                    <CircleUserRound className="w-4 h-4 text-[#063d35] shrink-0" />
                    <span className="text-xs font-bold truncate">
                      {currentUser.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCustomerLogout}
                    className="x-outline-btn"
                  >
                    {lang === "SOM" ? "Ka bax" : "Log out"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openCustomerAuth("login")}
                    className="x-outline-btn"
                  >
                    <LogIn className="w-4 h-4" />
                    {lang === "SOM" ? "Macmiil Gal" : "Customer Sign in"}
                  </button>
                  <button
                    onClick={() => openCustomerAuth("register")}
                    className="x-primary-btn"
                  >
                    <UserPlus className="w-4 h-4" />
                    {lang === "SOM"
                      ? "Samee Akoon Macmiil"
                      : "Create Customer Account"}
                  </button>
                </>
              )}
            </div>
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setLang(lang === "SOM" ? "ENG" : "SOM")}
                className="x-outline-btn !px-2.5"
              >
                <Globe className="w-4 h-4" />
                {lang === "SOM" ? "ENG" : "SOM"}
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="p-2.5 rounded-xl text-[#063d35] hover:bg-[#edf5f2]"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <aside
              className="ml-auto h-full w-[88%] max-w-sm bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-[72px] px-4 flex items-center justify-between border-b">
                <XasilLogo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 flex-1 space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory("Stay");
                    setMenuOpen(false);
                  }}
                  className="x-mobile-link"
                >
                  <Hotel className="w-5 h-5" />
                  {lang === "SOM" ? "Hoy & Hoteello" : "Stays & Hotels"}
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("Hall");
                    setSearchGuests(25);
                    setMenuOpen(false);
                  }}
                  className="x-mobile-link"
                >
                  <Building2 className="w-5 h-5" />
                  {lang === "SOM" ? "Hoolal & Xaflado" : "Halls & Events"}
                </button>
                <button
                  onClick={() => {
                    setIsPartnerOpen(true);
                    setMenuOpen(false);
                  }}
                  className="x-mobile-link"
                >
                  <Handshake className="w-5 h-5" />
                  {lang === "SOM" ? "Ku dar hantidaada" : "List your property"}
                </button>
                <a
                  href="#preview"
                  onClick={(e) => {
                    e.preventDefault();
                    notify(lang === "SOM" ? "Hordhac keliya — WhatsApp lagama heli karo." : "Preview only — WhatsApp is unavailable.");
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="x-mobile-link"
                >
                  <Headphones className="w-5 h-5" />
                  {lang === "SOM" ? "Taageero" : "Help & Support"}
                </a>
              </nav>
              <div className="p-4 border-t space-y-2">
                {currentUser ? (
                  <button
                    onClick={handleCustomerLogout}
                    className="x-outline-btn w-full justify-center"
                  >
                    {lang === "SOM" ? "Ka bax" : "Log out"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => openCustomerAuth("login")}
                      className="x-outline-btn w-full justify-center"
                    >
                      {lang === "SOM" ? "Gal" : "Sign in"}
                    </button>
                    <button
                      onClick={() => openCustomerAuth("register")}
                      className="x-primary-btn w-full justify-center"
                    >
                      {lang === "SOM" ? "Samee akoon" : "Create account"}
                    </button>
                  </>
                )}
              </div>
            </aside>
          </div>
        )}

        <section className="pro-hero">
          <div className="pro-hero-inner">
            <div className="pro-hero-copy">
              <span className="hero-kicker">
                <span />{" "}
                {lang === "SOM"
                  ? "JOOGITAAN IYO XAFLADO"
                  : "STAYS & CELEBRATIONS"}
              </span>
              <h1>
                {lang === "SOM" ? (
                  <>
                    Meesha saxda ah.
                    <br />
                    <em>Xusuus wanaagsan.</em>
                  </>
                ) : (
                  <>
                    The right place.
                    <br />
                    <em>A better experience.</em>
                  </>
                )}
              </h1>
              <p>
                {lang === "SOM"
                  ? "Soo hel hoteello, apartments iyo hoolal ku habboon qorshahaaga. Isbarbardhig qiimaha, dooro taariikhaha, kuna bixi goobta."
                  : "Find a hotel, apartment or event space that fits your plans. Compare options, choose your dates and pay at the property."}
              </p>
              <div className="hero-promise">
                <CheckCircle2 size={18} />
                {lang === "SOM" ? "Qiimo muuqda" : "Visible prices"}
                <span>·</span>
                <Headphones size={18} />
                {lang === "SOM" ? "Taageerada XASIL" : "XASIL support"}
              </div>
            </div>
            <div className="hero-photo-frame">
              <img
                src={HERO_IMAGE}
                alt={
                  lang === "SOM"
                    ? "Sawirka soo dhoweynta XASIL"
                    : "XASIL welcome image"
                }
              />
              <div className="hero-photo-caption">
                <span>XASIL COLLECTION</span>
                <strong>
                  {lang === "SOM"
                    ? "Safarkaagu halkan ayuu ka bilaabmaa."
                    : "Your next chapter starts here."}
                </strong>
              </div>
              <span className="hero-photo-mark">X.</span>
            </div>
          </div>
          <div className="pro-search-shell">
            <div className="pro-search-tabs">
              <button
                type="button"
                className={`x-tab ${selectedCategory === "Stay" ? "x-tab-active" : ""}`}
                onClick={() => {
                  setSelectedCategory("Stay");
                  setSearchGuests(1);
                  setCustomHallGuests("");
                }}
              >
                <BedDouble size={20} />
                <span>
                  {lang === "SOM"
                    ? "Hoteello & Apartments"
                    : "Hotels & Apartments"}
                  <small>
                    {lang === "SOM" ? "Hoygaaga xiga" : "Your next stay"}
                  </small>
                </span>
              </button>
              <button
                type="button"
                className={`x-tab ${selectedCategory === "Hall" ? "x-tab-active" : ""}`}
                onClick={() => {
                  setSelectedCategory("Hall");
                  setSearchGuests(25);
                  setCustomHallGuests("");
                }}
              >
                <Building2 size={20} />
                <span>
                  {lang === "SOM" ? "Hoolal & Xaflado" : "Halls & Events"}
                  <small>
                    {lang === "SOM"
                      ? "Maalmaha muhiimka ah"
                      : "For your special occasions"}
                  </small>
                </span>
              </button>
            </div>
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/97 backdrop-blur-xl rounded-[1.6rem] shadow-[0_22px_60px_rgba(15,23,42,.18)] border border-white p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
            >
              <div className="lg:col-span-3">
                <label className="x-field-label">
                  {lang === "SOM" ? "Magaalada" : "City"}
                </label>
                <div className="x-field">
                  <MapPin className="w-4 h-4" />
                  <select
                    aria-label={lang === "SOM" ? "Magaalada" : "City"}
                    value={searchDestination.split("::")[0]}
                    onChange={(e) => {
                      const city = e.target.value;
                      setSearchDestination(`${city}::All`);
                    }}
                    className="x-select"
                  >
                    <option value="All">
                      {lang === "SOM" ? "Magaalo kasta" : "All cities"}
                    </option>
                    {CITY_LIST.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </div>
              </div>
              <div className="lg:col-span-2">
                <label className="x-field-label">
                  {lang === "SOM" ? "Degmada" : "District"}
                </label>
                <div className="x-field">
                  <MapIcon className="w-4 h-4" />
                  <select
                    aria-label={lang === "SOM" ? "Degmada" : "District"}
                    value={searchDestination.split("::")[1]}
                    disabled={searchDestination.split("::")[0] === "All"}
                    onChange={(e) =>
                      setSearchDestination(
                        `${searchDestination.split("::")[0]}::${e.target.value}`,
                      )
                    }
                    className="x-select disabled:opacity-50"
                  >
                    <option value="All">
                      {lang === "SOM" ? "Degmo kasta" : "All districts"}
                    </option>
                    {searchDestination.split("::")[0] !== "All" &&
                      CITIES[searchDestination.split("::")[0]].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </div>
              </div>
              <DateRangePicker
                single={selectedCategory === "Hall"}
                start={selectedCategory === "Hall" ? eventDate : checkInDate}
                end={selectedCategory === "Hall" ? "" : checkOutDate}
                onChange={(a, b) => {
                  if (selectedCategory === "Hall") setEventDate(a);
                  else {
                    setCheckInDate(a);
                    setCheckOutDate(b);
                  }
                }}
                lang={lang}
              />
              <div className="lg:col-span-1">
                <label className="x-field-label">
                  {lang === "SOM" ? "Martida" : "Guests"}
                </label>
                <div className="x-field">
                  <Users className="w-4 h-4" />
                  <select
                    aria-label={t.guests}
                    value={searchGuests}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setSearchGuests(v);
                      if (v !== 0) setCustomHallGuests("");
                    }}
                    className="x-select"
                  >
                    {selectedCategory === "Stay" ? (
                      <>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        {[5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </>
                    ) : (
                      <>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={0}>Custom</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <button type="submit" className="x-search-btn lg:col-span-2">
                <Search className="w-5 h-5" />
                {t.search}
              </button>
              {selectedCategory === "Hall" && searchGuests === 0 && (
                <div className="md:col-span-2 lg:col-span-12">
                  <input
                    type="number"
                    min="1"
                    placeholder={
                      lang === "SOM"
                        ? "Qor tirada martida"
                        : "Enter guest capacity"
                    }
                    value={customHallGuests}
                    onChange={(e) => setCustomHallGuests(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a5147]"
                  />
                </div>
              )}
            </form>
            <div className="search-footnote">
              <CreditCard size={16} />
              {lang === "SOM"
                ? "Hadda lacag lagaa qaadi maayo. Xaqiijinta hantida ayaa xigta."
                : "No payment now. Requests are subject to property confirmation."}
            </div>
          </div>
        </section>
        <section
          id="popular-destinations"
          className="city-shortcuts"
          aria-label={lang === "SOM" ? "Magaalooyinka" : "Explore cities"}
        >
          <span>{lang === "SOM" ? "Halkee u socotaa?" : "Where to?"}</span>
          {CITY_LIST.map((city) => (
            <button
              key={city}
              className={selectedCity === city ? "active" : ""}
              onClick={() => {
                setSearchDestination(city + "::All");
                setSelectedCity(city);
                setSelectedDistrict("All");
                document
                  .getElementById("xasil-results")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <MapPin size={15} />
              {city}
              <ArrowRight size={14} />
            </button>
          ))}
        </section>
        <Discovery
          properties={filteredProperties}
          loading={propertiesLoading}
          error={propertiesError}
          onRetry={fetchProperties}
          onOpen={setDetailsProperty}
          lang={lang}
          category={selectedCategory}
          city={selectedCity}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={() => {
            setSelectedCity("All");
            setSelectedDistrict("All");
            setSearchDestination("All::All");
            setSearchGuests(1);
            setCustomHallGuests("");
          }}
        />
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-5 pb-12">
          <div
            className="relative overflow-hidden rounded-3xl min-h-[220px] shadow-xl border border-slate-200 flex items-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(5,47,42,.96), rgba(6,61,53,.83) 55%, rgba(6,61,53,.30)), url(${HALL_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative w-full p-6 md:p-9 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left min-w-0">
                <div className="inline-flex items-center space-x-2 bg-black/20 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/15">
                  <Handshake className="w-3.5 h-3.5" />
                  <span>XASIL Partner Network</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-snug break-words">
                  {t.partnerBannerTitle}
                </h3>
                <p className="text-xs md:text-sm text-white/75 max-w-xl leading-relaxed">
                  {t.partnerBannerSub}
                </p>
              </div>
              <button
                onClick={() => setIsPartnerOpen(true)}
                className="bg-[#0a5147] hover:bg-[#063d35] text-white font-black px-6 py-3.5 rounded-full text-xs transition shadow-lg shrink-0 w-full md:w-auto text-center"
              >
                {t.registerPropertyBtn}
              </button>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#052f2a] text-white pt-14 pb-8 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
            <div className="space-y-4 lg:pr-8">
              <div className="bg-white rounded-2xl px-3 py-2 inline-flex">
                <XasilLogo />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {lang === "SOM"
                  ? "XASIL waxay kuu fududaynaysaa helitaanka iyo qabashada hoteello, apartments iyo hoolal la isku hallayn karo."
                  : "XASIL makes it simple to discover and book trusted hotels, apartments and event venues."}
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300">
                  {lang === "SOM"
                    ? "Qabasho ammaan ah & taageero toos ah"
                    : "Secure booking & direct support"}
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black mb-4">
                {lang === "SOM" ? "Soo hel" : "Explore"}
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <button
                  onClick={() => {
                    setSelectedCategory("Stay");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="block hover:text-white transition"
                >
                  {lang === "SOM"
                    ? "Hoteello & Apartments"
                    : "Hotels & Apartments"}
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("Hall");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="block hover:text-white transition"
                >
                  {lang === "SOM" ? "Hoolal & Xaflado" : "Halls & Events"}
                </button>
                <button
                  onClick={() => setIsPartnerOpen(true)}
                  className="block hover:text-white transition"
                >
                  {lang === "SOM" ? "Ku dar hantidaada" : "List your property"}
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black mb-4">
                {lang === "SOM" ? "Taageero" : "Support"}
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <a
                  href="#preview"
                  onClick={(e) => {
                    e.preventDefault();
                    notify(lang === "SOM" ? "Hordhac keliya — WhatsApp lagama heli karo." : "Preview only — WhatsApp is unavailable.");
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-white transition"
                >
                  WhatsApp Support
                </a>
                <button
                  type="button"
                  onClick={() => setIsAboutOpen(true)}
                  className="block hover:text-white transition"
                >
                  {lang === "SOM" ? "Ku saabsan XASIL" : "About XASIL"}
                </button>
                <button
                  onClick={() => {
                    setLegalTab("terms");
                    setIsLegalOpen(true);
                  }}
                  className="block hover:text-white transition"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => {
                    setLegalTab("privacy");
                    setIsLegalOpen(true);
                  }}
                  className="block hover:text-white transition"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black mb-4">
                {lang === "SOM" ? "Nala soco" : "Connect"}
              </h4>
              <div className="flex items-center gap-2 mb-4">
                <a
                  href="https://www.facebook.com/people/Xasil/61593925216648/?mibextid=wwXIfr&rdid=tYUIhhaiLJMZhYY5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BtUFsYeom%2F%3Fmibextid%3DwwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@xasilbooking?_r=1&_t=ZS-99ct86lR24y"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href="#preview"
                  onClick={(e) => {
                    e.preventDefault();
                    notify(lang === "SOM" ? "Hordhac keliya — WhatsApp lagama heli karo." : "Preview only — WhatsApp is unavailable.");
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-500">
                {lang === "SOM"
                  ? "Taageerada booking-ka waxaa lagu heli karaa WhatsApp."
                  : "Booking support is available via WhatsApp."}
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © 2026 XASIL. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">Stability, booked.</p>
          </div>
        </div>
      </footer>

      {toast && (
        <div
          className={`x-toast x-toast-${toast.type}`}
          role="status"
          aria-live="polite"
        >
          {toast.type === "error" ? (
            <AlertTriangle className="w-5 h-5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {isCustomerAuthOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 md:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsCustomerAuthOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#edf5f2] text-[#063d35] flex items-center justify-center mb-4">
                {customerAuthMode === "login" ? (
                  <LogIn className="w-5 h-5" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {customerAuthMode === "login"
                  ? lang === "SOM"
                    ? "Ku soo gal XASIL"
                    : "Log in to XASIL"
                  : lang === "SOM"
                    ? "Samee akoon"
                    : "Create your account"}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {lang === "SOM"
                  ? "Isticmaal email-kaaga si aad u maamusho khibraddaada booking-ka."
                  : "Use your email to manage your booking experience."}
              </p>
            </div>
            <form onSubmit={handleCustomerAuth} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-2xl p-3.5 text-sm outline-none focus:border-[#0a5147]"
              />
              <input
                type="password"
                minLength="6"
                required
                placeholder="Password"
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-2xl p-3.5 text-sm outline-none focus:border-[#0a5147]"
              />
              {customerAuthError && (
                <p className="text-xs font-bold text-red-500">
                  {customerAuthError}
                </p>
              )}
              {customerAuthMessage && (
                <p className="text-xs font-bold text-emerald-600">
                  {customerAuthMessage}
                </p>
              )}
              <button className="w-full bg-[#063d35] hover:bg-[#0a5147] text-white font-black py-3.5 rounded-2xl transition">
                {customerAuthMode === "login"
                  ? lang === "SOM"
                    ? "Gal"
                    : "Log in"
                  : lang === "SOM"
                    ? "Isdiiwaan geli"
                    : "Create account"}
              </button>
            </form>
            <button
              onClick={() => {
                setCustomerAuthMode(
                  customerAuthMode === "login" ? "register" : "login",
                );
                setCustomerAuthError("");
                setCustomerAuthMessage("");
              }}
              className="w-full mt-4 text-xs font-bold text-[#063d35] hover:underline"
            >
              {customerAuthMode === "login"
                ? lang === "SOM"
                  ? "Akoon ma lihid? Isdiiwaan geli"
                  : "New to XASIL? Create an account"
                : lang === "SOM"
                  ? "Akoon hore ma leedahay? Gal"
                  : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      )}

      {detailsProperty && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-5">
          <div
            className="details-shell dialog-enter bg-white rounded-[2rem] max-w-6xl w-full overflow-y-auto relative shadow-2xl"
            style={{ maxHeight: "94vh" }}
          >
            <button
              onClick={() => setDetailsProperty(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/95 shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-5 md:p-7 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6 pr-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-black text-[#063d35] bg-[#edf5f2] uppercase tracking-wider px-3 py-1 rounded-full">
                      {detailsProperty.subType || detailsProperty.type}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#063d35] bg-[#D6A64A]/15 border border-[#D6A64A]/30 px-3 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {lang === "SOM" ? "Taageerada XASIL" : "XASIL support"}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-black text-slate-800">
                      <Star className="w-4 h-4 text-[#D6A64A] fill-[#D6A64A]" />
                      {detailsProperty.rating || "—"}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {detailsProperty.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#063d35]" />
                      <span>
                        {detailsProperty.district}, {detailsProperty.city}
                      </span>
                    </p>

                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(detailsProperty.lat != null && detailsProperty.lng != null ? `${detailsProperty.lat},${detailsProperty.lng}` : `${detailsProperty.title}, ${detailsProperty.district}, ${detailsProperty.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063d35] hover:underline"
                    >
                      <MapIcon className="w-4 h-4" />
                      {lang === "SOM" ? "Ka eeg khariidadda" : "View on map"}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:text-right">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                    {lang === "SOM"
                      ? "Qiimaha wuxuu ka bilaabmaa"
                      : "Starting from"}
                  </span>

                  <div className="flex lg:justify-end items-baseline gap-2 mt-1">
                    <strong className="text-3xl font-black text-[#063d35]">
                      ${detailsProperty.rooms?.[0]?.price ?? "—"}
                    </strong>

                    <span className="text-sm text-slate-500">
                      /{detailsProperty.rooms?.[0]?.period || "night"}
                    </span>
                  </div>
                </div>
              </div>

              <nav
                className="detail-navigation"
                aria-label={
                  lang === "SOM" ? "Qaybaha hantida" : "Property sections"
                }
              >
                <button
                  onClick={() =>
                    document
                      .querySelector(".hotel-gallery")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {lang === "SOM" ? "Sawirrada" : "Photos"}
                </button>
                <button
                  onClick={() =>
                    document
                      .querySelector(".xasil-room-options")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {lang === "SOM" ? "Qolalka & Qiimaha" : "Rooms & prices"}
                </button>
                <button
                  onClick={() =>
                    document
                      .querySelector(".facilities-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {lang === "SOM" ? "Adeegyada" : "Facilities"}
                </button>
              </nav>
             <HotelGallery
  lang={lang}
  hotelName={detailsProperty.title}
  images={[
    ...new Set(
      [
        detailsProperty.image,
        ...(detailsProperty.galleryImages || []),
        ...(detailsProperty.rooms || []).map((room) => room.image),
      ].filter(Boolean),
    ),
  ]}
/>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-8 mt-6 lg:mt-8">
                <div className="min-w-0">
                  <section className="xasil-room-options">
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-[.18em] font-black text-[#D6A64A]">
                        {lang === "SOM"
                          ? "Doorashooyinka hantida"
                          : "Listed options"}
                      </p>

                      <h4 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                        {detailsProperty.type === "Hall"
                          ? lang === "SOM"
                            ? "Dooro hoolka"
                            : "Choose your hall option"
                          : lang === "SOM"
                            ? "Dooro qolkaaga"
                            : "Choose your room"}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {!detailsProperty.rooms?.length && (
                        <p className="rounded-xl bg-stone-50 p-4">
                          {lang === "SOM"
                            ? "Qolal lama soo bandhigin. La xiriir taageerada."
                            : "No room options are listed. Contact support."}
                        </p>
                      )}
                      {(detailsProperty.rooms || []).map((room) => (
                        <article
                          key={room.id}
                          className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                        >
                          <div className="room-card-grid grid md:grid-cols-[220px_1fr]">
                            <div className="h-48 md:h-full min-h-[190px] bg-slate-100 relative">
                              <img
                                src={room.image || detailsProperty.image}
                                alt={room.name}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src =
                                    "/images/placeholder.svg";
                                }}
                              />
                            </div>

                            <div className="p-5 flex flex-col justify-between gap-4">
                              <div>
                                <div className="flex flex-wrap justify-between gap-3">
                                  <div>
                                    <h5 className="font-black text-slate-900 text-lg">
                                      {room.name}
                                    </h5>

                                    {room.desc && (
                                      <p className="text-sm text-slate-500 mt-1 leading-6">
                                        {room.desc}
                                      </p>
                                    )}
                                  </div>

                                  {room.originalPrice &&
                                    room.originalPrice > room.price && (
                                      <span className="self-start bg-[#D6A64A]/15 text-[#9B6B16] border border-[#D6A64A]/30 text-xs font-black px-3 py-1 rounded-full">
                                        Save{" "}
                                        {Math.round(
                                          ((room.originalPrice - room.price) /
                                            room.originalPrice) *
                                            100,
                                        )}
                                        %
                                      </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3 mt-4 text-xs font-bold text-slate-600">
                                  <span className="inline-flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-[#063d35]" />
                                    {room.capacity || 1}{" "}
                                    {lang === "SOM" ? "qof" : "guests"}
                                  </span>

                                  <span className="inline-flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#063d35]" />
                                    {lang === "SOM"
                                      ? "Bixi goobta"
                                      : "Pay at property"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t border-slate-100">
                                <div>
                                  {room.originalPrice &&
                                    room.originalPrice > room.price && (
                                      <span className="text-xs line-through text-slate-400 block">
                                        ${room.originalPrice}
                                      </span>
                                    )}

                                  <div className="flex items-baseline gap-1.5">
                                    <strong className="text-2xl font-black text-[#063d35]">
                                      ${room.price}
                                    </strong>
                                    <span className="text-xs text-slate-500">
                                      /{room.period}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setBookingError("");
                                    setBookingProperty(detailsProperty);
                                    setSelectedRoom(room);

                                    const initialGuests =
                                      selectedCategory === "Hall" &&
                                      searchGuests === 0 &&
                                      customHallGuests
                                        ? Number(customHallGuests)
                                        : Math.max(
                                            1,
                                            Number(searchGuests) || 1,
                                          );

                                    setBookingGuests(
                                      Math.min(
                                        initialGuests,
                                        Number(room.capacity) || initialGuests,
                                      ),
                                    );

                                    setDetailsProperty(null);
                                  }}
                                  className="bg-[#063d35] hover:bg-[#0a5147] text-white font-black px-6 py-3 rounded-2xl text-sm transition shadow-sm"
                                >
                                  {t.bookNow}
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="mb-8">
                    <p className="text-xs uppercase tracking-[.18em] font-black text-[#D6A64A] mb-2">
                      {lang === "SOM"
                        ? "Ku saabsan hantidan"
                        : "About this property"}
                    </p>

                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
                      {lang === "SOM"
                        ? "Deganaan raaxo leh oo si fiican loo diyaariyay"
                        : "A comfortable stay, thoughtfully prepared"}
                    </h4>

                    <p className="text-sm md:text-base text-slate-600 leading-7">
                      {detailsProperty.description ||
                        (lang === "SOM"
                          ? "Faahfaahin dheeraad ah oo ku saabsan hantidan ayaa dhowaan lagu dari doonaa."
                          : "More information about this property will be added soon.")}
                    </p>

                    <div className="grid sm:grid-cols-3 gap-3 mt-5">
                      <div className="flex items-center gap-2.5 bg-[#f7faf8] border border-slate-200 rounded-2xl p-3">
                        <ShieldCheck className="w-5 h-5 text-[#063d35]" />
                        <span className="text-xs font-bold text-slate-700">
                          {lang === "SOM"
                            ? "Faahfaahinta hantida"
                            : "Property information"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 bg-[#f7faf8] border border-slate-200 rounded-2xl p-3">
                        <CreditCard className="w-5 h-5 text-[#063d35]" />
                        <span className="text-xs font-bold text-slate-700">
                          {lang === "SOM"
                            ? "Booking ammaan ah"
                            : "Secure booking"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 bg-[#f7faf8] border border-slate-200 rounded-2xl p-3">
                        <Headphones className="w-5 h-5 text-[#063d35]" />
                        <span className="text-xs font-bold text-slate-700">
                          {lang === "SOM"
                            ? "Taageero toos ah"
                            : "Direct support"}
                        </span>
                      </div>
                    </div>
                  </section>

                  <FacilitiesGrid
                    lang={lang}
                    title={
                      lang === "SOM"
                        ? "Adeegyada ugu caansan"
                        : "Most popular facilities"
                    }
                    facilities={detailsProperty.amenities || []}
                  />

                  <section className="mt-9">
                    <p className="text-xs uppercase tracking-[.18em] font-black text-[#D6A64A]">
                      {lang === "SOM"
                        ? "Waxyaabaha muhiimka ah"
                        : "Good to know"}
                    </p>

                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mt-1 mb-4">
                      {lang === "SOM"
                        ? "Shuruudaha hantida"
                        : "Property policies"}
                    </h4>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="border border-slate-200 rounded-2xl p-4">
                        <Clock3 className="w-5 h-5 text-[#063d35] mb-3" />
                        <strong className="text-sm text-slate-900 block">
                          Check-in
                        </strong>
                        <span className="text-xs text-slate-500">
                          {lang === "SOM"
                            ? "Ka xaqiiji hantida"
                            : "Confirm with property"}
                        </span>
                      </div>

                      <div className="border border-slate-200 rounded-2xl p-4">
                        <Clock3 className="w-5 h-5 text-[#063d35] mb-3" />
                        <strong className="text-sm text-slate-900 block">
                          Check-out
                        </strong>
                        <span className="text-xs text-slate-500">
                          {lang === "SOM"
                            ? "Ka xaqiiji hantida"
                            : "Confirm with property"}
                        </span>
                      </div>

                      <div className="border border-slate-200 rounded-2xl p-4">
                        <ShieldCheck className="w-5 h-5 text-[#063d35] mb-3" />
                        <strong className="text-sm text-slate-900 block">
                          {lang === "SOM" ? "Joojinta" : "Cancellation"}
                        </strong>
                        <span className="text-xs text-slate-500">
                          {lang === "SOM"
                            ? "Waxay ku xirnaan kartaa booking-ka la doortay"
                            : "Depends on the selected booking option"}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>

                <aside className="lg:sticky lg:top-4 self-start">
                  <div className="bg-[#f7faf8] border border-slate-200 rounded-3xl p-5 shadow-sm">
                    <span className="text-xs uppercase tracking-wider font-black text-slate-400">
                      {lang === "SOM"
                        ? "Qiimaha wuxuu ka bilaabmaa"
                        : "Starting from"}
                    </span>

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <strong className="text-3xl font-black text-[#063d35]">
                        ${detailsProperty.rooms?.[0]?.price ?? "—"}
                      </strong>
                      <span className="text-sm text-slate-500">
                        /{detailsProperty.rooms?.[0]?.period || "night"}
                      </span>
                    </div>

                    <div className="space-y-3 mt-5 py-5 border-y border-slate-200">
                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <ShieldCheck className="w-5 h-5 text-[#063d35]" />
                        <span>
                          {lang === "SOM"
                            ? "Booking ammaan ah"
                            : "Secure booking"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-[#063d35]" />
                        <span>
                          {lang === "SOM"
                            ? "Taageerada XASIL"
                            : "XASIL support"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CreditCard className="w-5 h-5 text-[#063d35]" />
                        <span>
                          {lang === "SOM" ? "Bixi goobta" : "Pay at property"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        document
                          .querySelector(".xasil-room-options")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full mt-5 bg-[#063d35] hover:bg-[#0a5147] text-white font-black py-3.5 rounded-2xl transition"
                    >
                      {lang === "SOM" ? "Eeg qolalka" : "View available rooms"}
                    </button>

                    <p className="text-[11px] text-center text-slate-400 mt-3">
                      {lang === "SOM"
                        ? "Hadda lacag lagaa qaadi maayo."
                        : "You won't be charged yet."}
                    </p>
                  </div>
                </aside>
              </div>
            </div>
            <div className="mobile-booking">
              <span>
                <strong>${detailsProperty.rooms?.[0]?.price ?? "—"}</strong>
                <small className="block">
                  /{detailsProperty.rooms?.[0]?.period || "—"}
                </small>
              </span>
              <button
                type="button"
                disabled={!detailsProperty.rooms?.length}
                onClick={() =>
                  document
                    .querySelector(".xasil-room-options")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.bookNow}
              </button>
            </div>
          </div>
        </div>
      )}

      {propertyPendingDelete && (
        <div className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 md:p-7">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-5">
                <Trash2 className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-black text-slate-900">
                {lang === "SOM"
                  ? "Ma tirtirtaa hantidan?"
                  : "Delete this property?"}
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                {lang === "SOM"
                  ? `${propertyPendingDelete.title} waa laga saari doonaa XASIL. Ficilkan dib looguma noqon karo.`
                  : `${propertyPendingDelete.title} will be removed from XASIL. This action cannot be undone.`}
              </p>

              <div className="flex gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => setPropertyPendingDelete(null)}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-black py-3 rounded-2xl transition"
                >
                  {lang === "SOM" ? "Ka noqo" : "Cancel"}
                </button>

                <button
                  type="button"
                  onClick={confirmDeleteProperty}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-2xl transition"
                >
                  {lang === "SOM" ? "Tirtir" : "Delete property"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookingSuccess && (
        <BookingReceipt
          booking={bookingSuccess}
          lang={lang}
          onClose={() => setBookingSuccess(null)}
        />
      )}
      {receiptPreview && (
        <BookingReceipt
          booking={receiptPreview}
          lang={lang}
          onClose={() => setReceiptPreview(null)}
        />
      )}

      {isPartnerOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setIsPartnerOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="w-6 h-6 text-[#063d35]" />
              <h3 className="text-xl font-extrabold text-slate-900">
                Diwaan-geli Hantidaada
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Ku soo dar Hotel-kaaga ama Hoolkaaga XASIL si aad u hesho
              macaamiil toos ah.
            </p>

            <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Magaca Hotel-ka / Hoolka
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jazira Hotel"
                  value={partnerPropertyName}
                  onChange={(e) => setPartnerPropertyName(e.target.value)}
                  className="w-full border rounded-xl p-3 text-xs font-semibold bg-slate-50"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nooca
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="x-form-control"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Guest House">Guest House</option>
                    <option value="Event Hall">Hoolka Xafladaha</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Magaalada
                  </label>
                  <select
                    value={partnerCity}
                    onChange={(e) => {
                      const city = e.target.value;
                      setPartnerCity(city);
                      setPartnerDistrict(CITIES[city][0]);
                    }}
                    className="x-form-control"
                  >
                    {CITY_LIST.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Degmada
                  </label>
                  <select
                    value={partnerDistrict}
                    onChange={(e) => setPartnerDistrict(e.target.value)}
                    className="x-form-control"
                  >
                    {CITIES[partnerCity].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Magaca Mulkiilaha ama Maamulaha
                </label>
                <input
                  type="text"
                  required
                  placeholder="Magacaaga Buuxa"
                  value={partnerOwnerName}
                  onChange={(e) => setPartnerOwnerName(e.target.value)}
                  className="w-full border rounded-xl p-3 text-xs font-semibold bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nambarka WhatsApp-ka
                </label>
                <input
                  type="tel"
                  aria-label={t.phoneNumber}
                  autoComplete="tel"
                  required
                  placeholder="+252 61 ..."
                  value={partnerPhone}
                  onChange={(e) => setPartnerPhone(e.target.value)}
                  className="w-full border rounded-xl p-3 text-xs font-semibold bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#063d35] hover:bg-[#0a5147] text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center space-x-2 transition mt-2"
              >
                <Send className="w-4 h-4" />
                <span>U Dir WhatsApp-ka XASIL</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {isAboutOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-y-auto relative"
            style={{ maxHeight: "92vh" }}
          >
            <button
              type="button"
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-10">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[.2em] font-black text-[#D6A64A]">
                  {lang === "SOM" ? "Ku saabsan XASIL" : "About XASIL"}
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-[#052f2a] mt-2">
                  {lang === "SOM"
                    ? "Booking sahlan. Meelo lagu kalsoonaan karo."
                    : "Simple booking. Trusted places."}
                </h2>

                <p className="text-slate-600 mt-4 leading-7">
                  {lang === "SOM"
                    ? "XASIL waa madal booking ah oo isku xirta martida iyo hoteello, apartments, guest houses iyo hoolal xafladeed oo la xaqiijiyay."
                    : "XASIL is a booking platform connecting guests with verified hotels, apartments, guest houses and event venues."}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-9">
                <div className="border border-slate-200 rounded-3xl p-5">
                  <ShieldCheck className="w-7 h-7 text-[#063d35]" />
                  <h3 className="font-black text-slate-900 mt-3">
                    {lang === "SOM" ? "Hadafkeena" : "Our Mission"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {lang === "SOM"
                      ? "Inaan booking-ka ka dhigno mid sahlan, cad oo lagu kalsoonaan karo."
                      : "To make booking simple, transparent and trustworthy."}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-3xl p-5">
                  <Sparkles className="w-7 h-7 text-[#D6A64A]" />
                  <h3 className="font-black text-slate-900 mt-3">
                    {lang === "SOM" ? "Aragtideena" : "Our Vision"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {lang === "SOM"
                      ? "In XASIL noqoto madasha booking-ka ee lagu kalsoonaan karo ee Soomaaliya iyo Geeska Afrika."
                      : "To become a trusted booking platform for Somalia and the wider Horn of Africa."}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-3xl p-5">
                  <Heart className="w-7 h-7 text-[#063d35]" />
                  <h3 className="font-black text-slate-900 mt-3">
                    {lang === "SOM" ? "Waxaan Qiimeyno" : "Our Values"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {lang === "SOM"
                      ? "Kalsooni, daahfurnaan, adeeg wanaagsan iyo khibrad isticmaale oo fudud."
                      : "Trust, transparency, helpful service and a simple user experience."}
                  </p>
                </div>
              </div>

              <div className="mt-9 bg-[#f7faf8] border border-slate-200 rounded-3xl p-6">
                <h3 className="font-black text-slate-900 text-lg">
                  {lang === "SOM" ? "Sida XASIL u shaqeyso" : "How XASIL works"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  <div>
                    <span className="text-[#D6A64A] font-black">01</span>
                    <h4 className="font-black mt-1">
                      {lang === "SOM" ? "Raadi" : "Search"}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {lang === "SOM"
                        ? "Dooro magaalo, degmo, taariikh iyo tirada martida."
                        : "Choose your city, district, dates and guests."}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#D6A64A] font-black">02</span>
                    <h4 className="font-black mt-1">
                      {lang === "SOM" ? "Isbarbar dhig" : "Compare"}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {lang === "SOM"
                        ? "Eeg sawirada, adeegyada, qiimaha iyo qolalka."
                        : "Review photos, facilities, prices and room options."}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#D6A64A] font-black">03</span>
                    <h4 className="font-black mt-1">
                      {lang === "SOM" ? "Qabso" : "Book"}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {lang === "SOM"
                        ? "Xaqiiji booking-ka kadibna hel booking reference."
                        : "Confirm your booking and receive a booking reference."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLegalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-xl w-full overflow-y-auto p-6 relative shadow-2xl text-left"
            style={{ maxHeight: "85vh" }}
          >
            <button
              onClick={() => setIsLegalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex border-b border-slate-200 mb-4">
              <button
                onClick={() => setLegalTab("terms")}
                className={`py-2 px-4 text-xs font-bold border-b-2 transition ${
                  legalTab === "terms"
                    ? "border-teal-800 text-[#063d35]"
                    : "border-transparent text-slate-400"
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setLegalTab("privacy")}
                className={`py-2 px-4 text-xs font-bold border-b-2 transition ${
                  legalTab === "privacy"
                    ? "border-teal-800 text-[#063d35]"
                    : "border-transparent text-slate-400"
                }`}
              >
                Privacy Policy
              </button>
            </div>

            {legalTab === "terms" ? (
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Terms of Service — Shuruudaha Adeegga
                </h4>
                <p className="font-semibold text-slate-800">TL;DR</p>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    XASIL waa madal kuu oggolaanaysa inaad raadiso hoteello,
                    aragto adeegyada iyo qiimaha, kadibna samaysato booking.
                  </li>
                  <li>
                    XASIL ma aha milkiilaha hoteellada; hotel kasta ayaa mas'uul
                    ka ah adeegga uu bixiyo.
                  </li>
                  <li>
                    Booking-kaaga wuxuu ku xirnaanayaa availability-ga iyo
                    policies-ka hotelka.
                  </li>
                  <li>
                    Pay at Hotel: lacagta waxaad si toos ah ugu bixinaysaa
                    hotelka, iyadoo la raacayo shuruudahooda.
                  </li>
                  <li>
                    Cancellation iyo refund waxay ku xirnaanayaan policy-ga
                    hotelka ee lagu tusay markaad booking samaynaysay.
                  </li>
                  <li>
                    Isticmaaluhu waa inuu bixiyo xog sax ah, mana isticmaali
                    karo XASIL si khiyaano ama sharci-darro ah.
                  </li>
                  <li>
                    XASIL waxay xaq u leedahay inay joojiso ama diido booking
                    shaki leh ama jebinaya Terms-ka.
                  </li>
                  <li>
                    XASIL waxay isku dayaysaa inay xogta hotelka iyo
                    availability-ga ka dhigto mid sax ah, laakiin khaladaad ama
                    isbeddello way dhici karaan.
                  </li>
                  <li>
                    Markaad booking samayso, waxaad oggolaanaysaa Terms-kan.
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Privacy Policy — Siyaasadda Asturnaanta
                </h4>
                <p className="font-semibold text-slate-800">TL;DR</p>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    XASIL waxay ururin kartaa magaca, telefoonka, iyo xogta
                    booking-kaaga.
                  </li>
                  <li>
                    Xogtan waxaa loo isticmaalaa booking-ka, xiriirka
                    customer-ka, support-ka iyo amniga platform-ka.
                  </li>
                  <li>Xogta lagama iibinayo third parties.</li>
                  <li>
                    Xogta lagama maarmaanka ah waxaa lala wadaagi karaa hotelka
                    aad booking-ka ka samaysatay si ay kuu siiyaan adeegga.
                  </li>
                  <li>
                    XASIL waxay isticmaali kartaa cookies iyo xog farsamo sida
                    browser/device information si website-ku u shaqeeyo una
                    horumaro.
                  </li>
                  <li>
                    Waxaan qaadnaa tallaabooyin amni oo macquul ah si loo
                    ilaaliyo xogtaada, laakiin internet-ka 100% ammaan ma aha.
                  </li>
                  <li>
                    Xogta waxaa la hayn doonaa inta loo baahan yahay si loo
                    bixiyo adeegga, loo xalliyo disputes, loona buuxiyo
                    waajibaadka sharci.
                  </li>
                  <li>
                    Waxaad xaq u leedahay inaad codsato in xogtaada la saxo ama,
                    marka ay khuseyso, la tirtiro.
                  </li>
                  <li>
                    Haddii Privacy Policy-ga la beddelo, version-ka cusub ayaa
                    lagu daabici doonaa website-ka.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {isAdminOpen && (
  <div className="fixed inset-0 z-50 bg-[#f5f7f6] overflow-y-auto">
    <div className="min-h-screen w-full bg-[#f5f7f6]">

            {!isAuthenticated ? (
  <div className="min-h-screen grid lg:grid-cols-[1.05fr_0.95fr] bg-white">

    {/* LEFT BRAND PANEL */}
    <div className="hidden lg:flex relative overflow-hidden bg-[#063d35] text-white p-12 xl:p-16 flex-col justify-between">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-[#D6A64A]" />
        </div>

        <div>
          <div className="text-2xl font-black tracking-tight">XASIL</div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-bold">
            Management
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white/80 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#D6A64A]" />
          XASIL Administration
        </div>

        <h1 className="text-4xl xl:text-5xl font-black leading-[1.08] tracking-tight">
          Manage bookings and properties from one place.
        </h1>

        <p className="mt-5 text-sm xl:text-base leading-7 text-white/65 max-w-md">
          Review booking requests, update reservation status and manage
          XASIL properties through your secure administration workspace.
        </p>
      </div>

      <div className="relative z-10 text-xs text-white/40">
        © XASIL Booking
      </div>
    </div>

    {/* LOGIN SIDE */}
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9f8] px-5 py-10 sm:px-8">
      <div className="w-full max-w-[420px]">

        {/* MOBILE BRAND */}
        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-2xl bg-[#063d35] flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#D6A64A]" />
          </div>

          <div>
            <div className="text-xl font-black text-[#063d35] leading-none">
              XASIL
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
              Management
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 sm:p-8">

          <div className="mb-7">
            <div className="w-12 h-12 rounded-2xl bg-[#063d35]/8 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6 text-[#063d35]" />
            </div>

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Admin sign in
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              Sign in with your authorized XASIL administrator account.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email address
              </label>

              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@xasilbooking.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full h-12 border border-slate-200 rounded-xl px-4 text-sm font-medium text-slate-900 bg-white outline-none transition focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 placeholder:text-slate-300"
              />
            </div>

            <div>
  <label className="block text-xs font-bold text-slate-700 mb-2">
    Password
  </label>

  <div className="relative">
    <input
      type={showAdminPassword ? "text" : "password"}
      required
      autoComplete="current-password"
      placeholder="Enter your password"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
      className="w-full h-12 border border-slate-200 rounded-xl pl-4 pr-12 text-sm font-medium text-slate-900 bg-white outline-none transition focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 placeholder:text-slate-300"
    />

    <button
      type="button"
      onClick={() => setShowAdminPassword((current) => !current)}
      aria-label={showAdminPassword ? "Hide password" : "Show password"}
      title={showAdminPassword ? "Hide password" : "Show password"}
      className="absolute inset-y-0 right-0 w-12 flex items-center justify-center text-slate-400 hover:text-[#063d35] transition"
    >
      {showAdminPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  </div>
</div>

            {authError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs font-semibold text-red-700">
                  {authError}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#063d35] hover:bg-[#0a5147] text-white text-sm font-bold shadow-sm transition-all active:scale-[0.99]"
            >
              Sign in to dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure XASIL administration access</span>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">
          Authorized administrators only
        </p>
      </div>
    </div>
  </div>
) : (
  <div className="min-h-screen bg-[#f5f7f6] lg:flex">

    {/* ADMIN SIDEBAR */}
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-[260px] bg-[#063d35] text-white lg:flex lg:flex-col shadow-xl z-30">

      {/* BRAND */}
      <div className="h-[76px] px-6 flex items-center border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#D6A64A]" />
        </div>

        <div className="ml-3">
          <div className="text-lg font-black tracking-tight leading-none">
            XASIL
          </div>
          <div className="text-[9px] uppercase tracking-[0.22em] text-white/45 font-bold mt-1.5">
            Administration
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex lg:flex-col gap-2 lg:gap-1 p-3 lg:p-4 overflow-x-auto lg:overflow-visible">

        <button
          type="button"
          onClick={() => setAdminTab("orders")}
          className={`min-w-max lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
            adminTab === "orders"
              ? "bg-white text-[#063d35] shadow-sm"
              : "text-white/65 hover:text-white hover:bg-white/10"
          }`}
        >
          <ShoppingBag className="w-[18px] h-[18px]" />
          <span>Bookings</span>

          <span
            className={`ml-auto text-[10px] min-w-6 h-6 px-1.5 rounded-lg flex items-center justify-center ${
              adminTab === "orders"
                ? "bg-[#063d35]/10 text-[#063d35]"
                : "bg-white/10 text-white/70"
            }`}
          >
            {orders.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab("manage")}
          className={`min-w-max lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
            adminTab === "manage"
              ? "bg-white text-[#063d35] shadow-sm"
              : "text-white/65 hover:text-white hover:bg-white/10"
          }`}
        >
          <Building2 className="w-[18px] h-[18px]" />
          <span>Properties</span>

          <span
            className={`ml-auto text-[10px] min-w-6 h-6 px-1.5 rounded-lg flex items-center justify-center ${
              adminTab === "manage"
                ? "bg-[#063d35]/10 text-[#063d35]"
                : "bg-white/10 text-white/70"
            }`}
          >
            {properties.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setAdminTab("add");
            setEditingPropertyId(null);
          }}
          className={`min-w-max lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
            adminTab === "add"
              ? "bg-white text-[#063d35] shadow-sm"
              : "text-white/65 hover:text-white hover:bg-white/10"
          }`}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span>Add property</span>
        </button>
      </nav>

      {/* SIDEBAR BOTTOM */}
      <div className="hidden lg:block mt-auto p-4 border-t border-white/10">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition"
        >
          <ExternalLink className="w-[17px] h-[17px]" />
          <span>View public site</span>
        </a>

        <button
          type="button"
          onClick={handleAdminLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-red-500/15 transition"
        >
          <LogIn className="w-[17px] h-[17px] rotate-180" />
          <span>Log out</span>
        </button>
      </div>
    </aside>

    {/* ADMIN WORKSPACE */}
    <main className="flex-1 lg:ml-[260px] min-w-0">

      {/* TOP BAR */}
      <header className="h-[76px] bg-white border-b border-slate-200/80 px-5 sm:px-7 lg:px-9 flex items-center justify-between sticky top-0 z-20">

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-bold">
            XASIL Management
          </p>

          <h1 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
            {adminTab === "orders"
              ? "Bookings"
              : adminTab === "manage"
                ? "Properties"
                : editingPropertyId
                  ? "Edit property"
                  : "Add property"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-800">
              Administrator
            </p>
            <p className="text-[10px] text-slate-400">
              XASIL Admin
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#063d35] text-white flex items-center justify-center">
            <CircleUserRound className="w-5 h-5" />
          </div>

          <button
            type="button"
            onClick={handleAdminLogout}
            className="lg:hidden text-xs font-bold text-red-600 px-3 py-2 rounded-lg bg-red-50"
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div className="p-4 sm:p-6 lg:p-9 max-w-[1500px] mx-auto">

                {adminTab === "orders" && (
  <div className="space-y-7 text-left">

    {/* DASHBOARD INTRO */}
    <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#063d35] bg-[#063d35]/5 border border-[#063d35]/10 px-3 py-1.5 rounded-full mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Booking management
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Booking overview
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-6">
          Track reservation requests and manage booking statuses across all
          XASIL properties.
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setAdminTab("add");
          setEditingPropertyId(null);
        }}
        className="h-11 px-5 rounded-xl bg-[#063d35] hover:bg-[#0a5147] text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-sm transition shrink-0"
      >
        <Plus className="w-4 h-4" />
        Add property
      </button>
    </div>

    {/* OVERVIEW STATS */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">

      {/* TOTAL BOOKINGS */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Total bookings
            </p>

            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-[18px] h-[18px] text-[#063d35]" />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          All reservation requests
        </p>
      </div>

      {/* PENDING */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Pending
            </p>

            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {orders.filter((order) => order.status === "Pending").length}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Clock3 className="w-[18px] h-[18px] text-amber-600" />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          Waiting for review
        </p>
      </div>

      {/* CONFIRMED */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Confirmed
            </p>

            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {orders.filter((order) => order.status === "Confirmed").length}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-600" />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          Approved reservations
        </p>
      </div>

      {/* PROPERTIES */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Properties
            </p>

            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {properties.length}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            <Building2 className="w-[18px] h-[18px] text-slate-700" />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          Active XASIL listings
        </p>
      </div>

    </div>
                    {/* WEEKLY PROPERTY PERFORMANCE */}
<div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

  <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center shrink-0">
        <TrendingUp className="w-[18px] h-[18px] text-[#063d35]" />
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900">
          Weekly booking activity
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          Booking requests received by property
        </p>
      </div>
    </div>

    <div className="inline-flex self-start sm:self-auto items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      This week
    </div>
  </div>

  <div className="p-5 sm:p-6">
    {Object.keys(propertyWeeklyCounts).length === 0 ? (
      <div className="min-h-[150px] flex flex-col items-center justify-center text-center">
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
          <TrendingUp className="w-5 h-5 text-slate-400" />
        </div>

        <p className="text-sm font-bold text-slate-700">
          No booking activity yet
        </p>

        <p className="text-xs text-slate-400 mt-1">
          Weekly property activity will appear here.
        </p>
      </div>
    ) : (
      <div className="space-y-5">
        {Object.entries(propertyWeeklyCounts).map(([title, count]) => {
          const percentage =
            maxOrdersCount > 0
              ? Math.round((count / maxOrdersCount) * 100)
              : 0;

          return (
            <div key={title}>
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-700 truncate">
                    {title}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-black text-slate-900">
                    {count}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {count === 1 ? "Booking" : "Bookings"}
                  </span>
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#063d35] rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>

                    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

  {/* BOOKINGS HEADER */}
  <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            All bookings
          </h3>

          <span className="min-w-6 h-6 px-2 rounded-lg bg-[#063d35]/8 text-[#063d35] text-[11px] font-black flex items-center justify-center">
            {filteredOrdersList.length}
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-1">
          Review customers, properties and reservation status.
        </p>
      </div>

      {/* PROPERTY FILTER */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
          <Filter className="w-4 h-4 text-slate-500" />
        </div>

        <select
          value={orderFilterHotel}
          onChange={(e) => setOrderFilterHotel(e.target.value)}
          className="h-10 min-w-[190px] bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
        >
          <option value="All">All properties</option>

          {properties.map((p) => (
            <option key={p.id} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

    </div>
  </div>

  {/* BOOKINGS CONTENT */}
  <div className="p-4 sm:p-5">

                      {/* PROFESSIONAL BOOKINGS LIST */}
<div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">

  {ordersLoading ? (
    <div className="min-h-[180px] flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center mb-3">
        <div className="w-4 h-4 border-2 border-[#063d35]/20 border-t-[#063d35] rounded-full animate-spin" />
      </div>

      <p className="text-sm font-bold text-slate-700">
        Loading bookings...
      </p>

      <p className="text-xs text-slate-400 mt-1">
        Please wait while reservations are loaded.
      </p>
    </div>
  ) : filteredOrdersList.length === 0 ? (
    <div className="min-h-[200px] flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
        <ShoppingBag className="w-5 h-5 text-slate-400" />
      </div>

      <p className="text-sm font-black text-slate-700">
        No bookings found
      </p>

      <p className="text-xs text-slate-400 mt-1 max-w-sm">
        There are no reservation requests matching the selected property.
      </p>
    </div>
  ) : (
    filteredOrdersList.map((ord) => {
      const totalVal =
        ord.period === "habeenkii"
          ? ord.price * (ord.days || 1)
          : ord.price;

      return (
        <div
          key={ord.id}
          className="group border border-slate-200/80 rounded-2xl bg-white hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all overflow-hidden"
        >
          <div className="p-4 sm:p-5">

            {/* TOP ROW */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* BOOKING + PROPERTY */}
              <div className="min-w-0 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-[17px] h-[17px] text-[#063d35]" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-black text-slate-900">
                      {ord.id}
                    </p>

                    <span className="w-1 h-1 rounded-full bg-slate-300" />

                    <span className="text-[11px] font-semibold text-slate-400">
                      {ord.date}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#063d35] mt-1 truncate">
                    {ord.propertyTitle}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <select
                value={ord.status}
                onChange={(e) =>
                  handleOrderStatusChange(
                    ord.id,
                    e.target.value,
                  )
                }
                className={`h-9 px-3 rounded-xl text-[11px] font-black outline-none cursor-pointer border transition ${
                  ord.status === "Confirmed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : ord.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            {/* BOOKING DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100">

              {/* CUSTOMER */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] font-black text-slate-400 mb-1.5">
                  Customer
                </p>

                <p className="text-sm font-bold text-slate-800 truncate">
                  {ord.customerName}
                </p>

                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {ord.customerPhone}
                </p>
              </div>

              {/* ROOM */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] font-black text-slate-400 mb-1.5">
                  Room / Package
                </p>

                <p className="text-sm font-bold text-slate-800">
                  {ord.roomName}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  {ord.period === "habeenkii"
                    ? `${ord.days || 1} ${
                        (ord.days || 1) === 1
                          ? "night"
                          : "nights"
                      }`
                    : "Event booking"}
                </p>
              </div>

              {/* PROPERTY */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] font-black text-slate-400 mb-1.5">
                  Property
                </p>

                <p className="text-sm font-bold text-slate-800 truncate">
                  {ord.propertyTitle}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  XASIL property
                </p>
              </div>

              {/* TOTAL */}
              <div className="sm:text-right xl:text-right">
                <p className="text-[10px] uppercase tracking-[0.1em] font-black text-slate-400 mb-1.5">
                  Booking value
                </p>

                <p className="text-lg font-black text-[#063d35]">
                  ${Number(totalVal || 0).toLocaleString()}
                </p>

                <p className="text-[11px] text-slate-400 mt-0.5">
  Total amount
</p>
</div>

{/* closes BOOKING DETAILS grid */}
</div>

{/* WHATSAPP CUSTOMER ACTION */}
<div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  <p className="text-[11px] text-slate-400">
    Status changes are saved automatically.
  </p>

  <button
    type="button"
    onClick={() => handleBookingWhatsApp(ord)}
    className="h-10 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black inline-flex items-center justify-center gap-2 transition shadow-sm"
  >
    <MessageCircle className="w-4 h-4" />

    {ord.status === "Confirmed"
      ? "Send confirmation"
      : ord.status === "Cancelled"
        ? "Send cancellation"
        : "WhatsApp customer"}
  </button>
</div>

{/* closes booking content */}
</div>

{/* closes booking card */}
</div>

);
})
)}
</div>

                      {/* closes BOOKINGS CONTENT */}
                    </div>

                    {/* closes ALL BOOKINGS card */}
                  </div>
                </div>
              )}

              {adminTab === "add" && (
  <form
    onSubmit={handleCreateOrUpdateProperty}
    className="space-y-7 text-left"
  >

    {/* PROPERTY EDITOR HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#063d35]/5 border border-[#063d35]/10 text-[11px] font-bold text-[#063d35] mb-3">
          {editingPropertyId ? (
            <Edit className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}

          {editingPropertyId ? "Property editor" : "New property"}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {editingPropertyId ? "Edit property" : "Add property"}
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-6">
          {editingPropertyId
            ? "Update property information, location, amenities, rooms and pricing."
            : "Create a new hotel, apartment, guest house or event venue for XASIL."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setAdminTab("manage")}
        className="h-11 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold inline-flex items-center justify-center gap-2 transition"
      >
        <Building2 className="w-4 h-4" />
        View properties
      </button>
    </div>

    {/* BASIC INFORMATION CARD */}
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center">
            <Building2 className="w-[18px] h-[18px] text-[#063d35]" />
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-900">
              Basic information
            </h3>

            <p className="text-xs text-slate-400 mt-0.5">
              Property name, location and category
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">

                    <div>
                      <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                        MAGACA DHISMAHA/HOOLKA
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dhismaha ama Hoolka..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-slate-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                          MAGAALADA
                        </label>
                        <select
                          value={newCity}
                          onChange={(e) => {
                            const city = e.target.value;
                            setNewCity(city);
                            setNewDistrict(CITIES[city][0]);
                          }}
                          className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-slate-50"
                        >
                          {CITY_LIST.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                          DEGMADA
                        </label>
                        <select
                          value={newDistrict}
                          onChange={(e) => setNewDistrict(e.target.value)}
                          className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-slate-50"
                        >
                          {CITIES[newCity].map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                          CATEGORY MAIN
                        </label>
                        <select
                          value={newType}
                          onChange={(e) => setNewType(e.target.value)}
                          className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-slate-50"
                        >
                          <option value="Stay">Stay (Hoy)</option>
                          <option value="Hall">Hall (Event & Wedding)</option>
                        </select>
                      </div>

                      {newType === "Stay" && (
                        <div>
                          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                            NOOCA HOYGA (SUB-TYPE)
                          </label>
                          <select
                            value={newSubType}
                            onChange={(e) => setNewSubType(e.target.value)}
                            className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-slate-50"
                          >
                            <option value="Hotel">Hotel</option>
<option value="Apartment">Apartment</option>
<option value="Guest House">Guest House</option>
</select>
</div>
)}
</div>

{/* closes BASIC INFORMATION content */}
</div>

{/* closes BASIC INFORMATION card */}
</div>

{/* MEDIA & DESCRIPTION */}
<div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

  <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center">
        <ImageIcon className="w-[18px] h-[18px] text-[#063d35]" />
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900">
          Media & description
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          Add the main property image and description
        </p>
      </div>
    </div>
  </div>

  <div className="p-5 sm:p-6 space-y-5">

    {/* MAIN PROPERTY IMAGE */}
<div>
  <label className="text-xs font-bold text-slate-700 block mb-2">
    Main property photo
  </label>

  {!newMainImage ? (
    <label className="group min-h-[220px] border-2 border-dashed border-slate-200 hover:border-[#063d35]/40 rounded-2xl bg-slate-50/70 hover:bg-[#063d35]/[0.02] flex flex-col items-center justify-center text-center px-6 cursor-pointer transition">
      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:border-[#063d35]/20 transition">
        <ImageIcon className="w-5 h-5 text-[#063d35]" />
      </div>

      <p className="text-sm font-black text-slate-800">
        Upload property photo
      </p>

      <p className="text-xs text-slate-400 mt-1.5">
        Click to choose an image from your computer or phone
      </p>

      <div className="mt-4 inline-flex items-center px-4 h-9 rounded-xl bg-[#063d35] text-white text-xs font-bold">
        Choose image
      </div>

      <p className="text-[10px] text-slate-400 mt-3">
        JPG, PNG or WebP · Maximum 5 MB
      </p>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleMainImageUpload}
        className="hidden"
      />
    </label>
  ) : (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">

      {/* PREVIEW */}
      <div className="relative">
        <img
          src={newMainImage}
          alt="Property preview"
          className="w-full h-56 sm:h-72 object-cover bg-slate-100"
        />

        <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
          Main photo
        </div>
      </div>

      {/* IMAGE ACTIONS */}
      <div className="p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <p className="text-xs font-bold text-slate-700">
            Property photo uploaded
          </p>

          <p className="text-[10px] text-slate-400 mt-0.5">
            This image will appear on the XASIL property listing.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <label className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center justify-center cursor-pointer transition">
            Change photo

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleMainImageUpload}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => setNewMainImage("")}
            className="h-9 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition"
          >
            Remove
          </button>

               </div>
      </div>
    </div>
  )}
</div>

{/* PROPERTY GALLERY */}
<div className="space-y-3">
  <div className="flex items-start justify-between gap-4">
    <div>
      <label className="text-xs font-bold text-slate-700 block">
        Property gallery
      </label>

      <p className="text-[11px] text-slate-400 mt-1">
        Add multiple photos so guests can explore the property.
      </p>
    </div>

    {newGalleryImages.length > 0 && (
      <span className="shrink-0 px-2.5 py-1 rounded-lg bg-[#063d35]/5 text-[#063d35] text-[10px] font-black">
        {newGalleryImages.length}{" "}
        {newGalleryImages.length === 1 ? "PHOTO" : "PHOTOS"}
      </span>
    )}
  </div>

  <label className="group min-h-[150px] border-2 border-dashed border-slate-200 hover:border-[#063d35]/40 rounded-2xl bg-slate-50/70 hover:bg-[#063d35]/[0.02] flex flex-col items-center justify-center text-center px-6 cursor-pointer transition">
    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-3">
      <ImageIcon className="w-5 h-5 text-[#063d35]" />
    </div>

    <p className="text-sm font-black text-slate-800">
      Upload gallery photos
    </p>

    <p className="text-[11px] text-slate-400 mt-1">
      Choose several photos from your computer at the same time
    </p>

    <span className="mt-3 h-9 px-4 rounded-xl bg-[#063d35] text-white text-xs font-bold inline-flex items-center justify-center">
      Choose multiple images
    </span>

    <p className="text-[10px] text-slate-400 mt-2">
      JPG, PNG or WebP · Maximum 5 MB each
    </p>

    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      multiple
      onChange={handleGalleryImagesUpload}
      className="hidden"
    />
  </label>

  {newGalleryImages.length > 0 && (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {newGalleryImages.map((imageUrl, index) => (
        <div
          key={`${imageUrl}-${index}`}
          className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 group"
        >
          <img
            src={imageUrl}
            alt={`Property gallery ${index + 1}`}
            className="w-full h-32 sm:h-36 object-cover"
          />

          <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-white text-[9px] font-bold">
            Photo {index + 1}
          </div>

          <button
            type="button"
            onClick={() =>
              setNewGalleryImages((currentImages) =>
                currentImages.filter(
                  (_, imageIndex) => imageIndex !== index,
                ),
              )
            }
            className="absolute top-2 right-2 h-8 px-2.5 rounded-lg bg-white/95 hover:bg-red-50 text-red-600 text-[10px] font-bold shadow-sm transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>

{/* DESCRIPTION */}
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="text-xs font-bold text-slate-700">
          Property description
        </label>

        <span className="text-[10px] text-slate-400">
          {newDesc.length} characters
        </span>
      </div>

      <textarea
        rows={5}
        placeholder="Describe the property, location, atmosphere and what guests can expect..."
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium bg-white outline-none resize-y focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
      />

      <p className="text-[11px] text-slate-400 mt-2">
        A clear description helps guests understand the property before booking.
      </p>
    </div>

  </div>
</div>

                    {/* LOCATION & AMENITIES */}
<div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

  {/* CARD HEADER */}
  <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center">
        <MapPin className="w-[18px] h-[18px] text-[#063d35]" />
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900">
          Location & amenities
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          Map coordinates and services available at this property
        </p>
      </div>
    </div>
  </div>

  <div className="p-5 sm:p-6 space-y-6">

    {/* MAP COORDINATES */}
    <div>
      <div className="mb-4">
        <h4 className="text-xs font-black text-slate-800">
          Map coordinates
        </h4>

        <p className="text-[11px] text-slate-400 mt-1">
          Enter the exact latitude and longitude so guests can locate the property.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* LATITUDE */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">
            Latitude
          </label>

          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <input
              type="number"
              step="any"
              placeholder="2.0469"
              value={newLat}
              onChange={(e) => setNewLat(Number(e.target.value))}
              className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
            />
          </div>

          <p className="text-[10px] text-slate-400 mt-1.5">
            Example: 2.0469
          </p>
        </div>

        {/* LONGITUDE */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">
            Longitude
          </label>

          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <input
              type="number"
              step="any"
              placeholder="45.3182"
              value={newLng}
              onChange={(e) => setNewLng(Number(e.target.value))}
              className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
            />
          </div>

          <p className="text-[10px] text-slate-400 mt-1.5">
            Example: 45.3182
          </p>
        </div>

      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-slate-100" />

    {/* AMENITIES */}
    <div>
      <label className="text-xs font-bold text-slate-700 block mb-2">
        Property amenities
      </label>

      <input
        type="text"
        placeholder="Free Wi-Fi, Koronto 24/7, Qaboojiye (AC), Parking"
        value={newAmenitiesInput}
        onChange={(e) => setNewAmenitiesInput(e.target.value)}
        className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
      />

      <div className="mt-3 flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
        <Check className="w-4 h-4 text-[#063d35] mt-0.5 shrink-0" />

        <p className="text-[11px] text-slate-500 leading-5">
          Separate each amenity with a comma. For example:
          <span className="font-bold text-slate-600">
            {" "}Free Wi-Fi, Parking, AC, 24/7 Electricity
          </span>
        </p>
      </div>

      {/* AMENITY PREVIEW */}
      {newAmenitiesInput.trim() && (
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.1em] font-black text-slate-400 mb-2.5">
            Preview
          </p>

          <div className="flex flex-wrap gap-2">
            {newAmenitiesInput
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
              .map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#063d35]/5 border border-[#063d35]/10 text-[11px] font-bold text-[#063d35]"
                >
                  <Check className="w-3 h-3" />
                  {item}
                </span>
                           ))}
          </div>
        </div>
      )}
    </div>

  </div>
</div>

                 {/* ROOMS & PRICING */}
<div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

  {/* HEADER */}
  <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#063d35]/8 flex items-center justify-center">
        <Building2 className="w-[18px] h-[18px] text-[#063d35]" />
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900">
          Rooms & pricing
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          Add rooms, halls, photos, descriptions and prices
        </p>
      </div>
    </div>

    <button
      type="button"
      onClick={handleAddRoomField}
      className="h-10 px-4 rounded-xl bg-[#063d35] hover:bg-[#0a5147] text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition"
    >
      <Plus className="w-4 h-4" />
      Add room / hall
    </button>
  </div>

  {/* ROOMS */}
  <div className="p-5 sm:p-6 space-y-5">

    {newRooms.map((rm, idx) => (
      <div
        key={idx}
        className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
      >

        {/* ROOM HEADER */}
        <div className="px-4 sm:px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">

          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] font-black text-slate-400">
              {newType === "hall" ? "Event space" : "Room"}
            </p>

            <p className="text-sm font-black text-slate-800 mt-0.5">
              {rm.name || `${newType === "hall" ? "Hall" : "Room"} ${idx + 1}`}
            </p>
          </div>

          {newRooms.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveRoomField(idx)}
              className="w-9 h-9 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition"
              aria-label="Remove room"
              title="Remove room"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

        </div>

        <div className="p-4 sm:p-5 space-y-5">

          {/* ROOM NAME */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              {newType === "hall" ? "Hall name" : "Room name"}
            </label>

            <input
              type="text"
              placeholder={
                newType === "hall"
                  ? "e.g. Grand Wedding Hall"
                  : "e.g. Deluxe Double Room"
              }
              required
              value={rm.name}
              onChange={(e) => {
                const updated = [...newRooms];
                updated[idx].name = e.target.value;
                setNewRooms(updated);
              }}
              className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
            />
          </div>

          {/* ROOM IMAGE */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              {newType === "hall" ? "Hall photo" : "Room photo"}
            </label>

            {!rm.image ? (
              <label className="min-h-[180px] border-2 border-dashed border-slate-200 hover:border-[#063d35]/40 rounded-2xl bg-slate-50/70 hover:bg-[#063d35]/[0.02] flex flex-col items-center justify-center text-center px-5 cursor-pointer transition">

                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                  <ImageIcon className="w-5 h-5 text-[#063d35]" />
                </div>

                <p className="text-sm font-black text-slate-800">
                  Upload {newType === "hall" ? "hall" : "room"} photo
                </p>

                <p className="text-[11px] text-slate-400 mt-1">
                  Choose an image from your computer or phone
                </p>

                <span className="mt-3 h-9 px-4 rounded-xl bg-[#063d35] text-white text-xs font-bold inline-flex items-center justify-center">
                  Choose image
                </span>

                <p className="text-[10px] text-slate-400 mt-2">
                  JPG, PNG or WebP · Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleRoomImageUpload(e, idx)}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">

                <div className="relative">
                  <img
                    src={rm.image}
                    alt={rm.name || "Room preview"}
                    className="w-full h-52 sm:h-64 object-cover bg-slate-100"
                  />

                  <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/60 text-white text-[10px] font-bold">
                    {newType === "hall" ? "Hall photo" : "Room photo"}
                  </div>
                </div>

                <div className="p-3 bg-white flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-bold text-slate-600">
                    Photo uploaded
                  </p>

                  <div className="flex items-center gap-2">
                    <label className="h-9 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 inline-flex items-center cursor-pointer transition">
                      Change photo

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleRoomImageUpload(e, idx)}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...newRooms];
                        updated[idx] = {
                          ...updated[idx],
                          image: "",
                        };
                        setNewRooms(updated);
                      }}
                      className="h-9 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>

               </div>
)}
</div>



{/* DESCRIPTION */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              {newType === "hall" ? "Hall description" : "Room description"}
            </label>

            <textarea
              rows={3}
              placeholder={
                newType === "hall"
                  ? "Describe the hall, capacity and facilities..."
                  : "Describe the room, beds, view and included facilities..."
              }
              value={rm.desc || ""}
              onChange={(e) => {
                const updated = [...newRooms];
                updated[idx].desc = e.target.value;
                setNewRooms(updated);
              }}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium bg-white outline-none resize-y focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
            />
          </div>

          {/* PRICING */}
          <div className="pt-1">
            <div className="mb-3">
              <h4 className="text-xs font-black text-slate-800">
                Pricing
              </h4>

              <p className="text-[11px] text-slate-400 mt-1">
                Set the normal price, selling price and booking period.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* ORIGINAL PRICE */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Original price ($)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="160"
                  value={rm.originalPrice || ""}
                  onChange={(e) => {
                    const updated = [...newRooms];
                    updated[idx].originalPrice = Number(e.target.value);
                    setNewRooms(updated);
                  }}
                  className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
                />
              </div>

              {/* SELLING PRICE */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Selling price ($)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="150"
                  required
                  value={rm.price}
                  onChange={(e) => {
                    const updated = [...newRooms];
                    updated[idx].price = Number(e.target.value);
                    setNewRooms(updated);
                  }}
                  className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
                />
              </div>

              {/* PERIOD */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Booking period
                </label>

                <select
                  value={rm.period}
                  onChange={(e) => {
                    const updated = [...newRooms];
                    updated[idx].period = e.target.value;
                    setNewRooms(updated);
                  }}
                  className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm font-medium bg-white outline-none focus:border-[#063d35] focus:ring-4 focus:ring-[#063d35]/10 transition"
                >
                  <option value="habeenkii">Per night</option>
                  <option value="xafladdii">Per event</option>
                </select>
              </div>

            </div>
          </div>

        </div>
      </div>
    ))}

    {/* ADD ANOTHER */}
    <button
      type="button"
      onClick={handleAddRoomField}
      className="w-full min-h-[54px] border-2 border-dashed border-slate-200 hover:border-[#063d35]/30 rounded-2xl text-[#063d35] text-xs font-black flex items-center justify-center gap-2 hover:bg-[#063d35]/[0.02] transition"
    >
      <Plus className="w-4 h-4" />
      Add another {newType === "hall" ? "hall" : "room"}
    </button>

  </div>
</div>

                    <button
                      type="submit"
                      className="w-full bg-[#063d35] hover:bg-[#0a5147] text-white font-bold py-3.5 rounded-full text-xs shadow-md transition mt-2"
                    >
                      {editingPropertyId
                        ? "Cusbooneysii Hantida"
                        : "Kaydi Hantida Cusub"}
                    </button>
                  </form>
                )}

                {adminTab === "manage" && (
  <div className="space-y-7 text-left">

    {/* PROPERTIES PAGE HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#063d35]/5 border border-[#063d35]/10 text-[11px] font-bold text-[#063d35] mb-3">
          <Building2 className="w-3.5 h-3.5" />
          Property management
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Properties
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-6">
          Manage the hotels, apartments and event venues available through
          XASIL.
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setAdminTab("add");
          setEditingPropertyId(null);
        }}
        className="h-11 px-5 rounded-xl bg-[#063d35] hover:bg-[#0a5147] text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-sm transition"
      >
        <Plus className="w-4 h-4" />
        Add property
      </button>
    </div>

    {/* PROPERTY SUMMARY */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Total properties
            </p>

            <p className="text-3xl font-black text-slate-900 mt-2">
              {properties.length}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Listings currently in XASIL
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-[#063d35]/8 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#063d35]" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Booking records
            </p>

            <p className="text-3xl font-black text-slate-900 mt-2">
              {orders.length}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Reservations across your properties
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-slate-700" />
          </div>
        </div>
      </div>

    </div>

    {/* PROPERTY LIST */}
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">

      {/* LIST HEADER */}
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              All properties
            </h3>

            <span className="min-w-6 h-6 px-2 rounded-lg bg-[#063d35]/8 text-[#063d35] text-[11px] font-black flex items-center justify-center">
              {properties.length}
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">
            Edit property information or remove a listing.
          </p>
        </div>
      </div>

      {/* LIST CONTENT */}
      {properties.length === 0 ? (
        <div className="min-h-[260px] flex flex-col items-center justify-center text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-slate-400" />
          </div>

          <h4 className="text-sm font-black text-slate-800">
            No properties yet
          </h4>

          <p className="text-xs text-slate-400 mt-1.5 max-w-sm leading-5">
            Add your first hotel, apartment or event venue to start accepting
            booking requests.
          </p>

          <button
            type="button"
            onClick={() => {
              setAdminTab("add");
              setEditingPropertyId(null);
            }}
            className="mt-5 h-10 px-4 rounded-xl bg-[#063d35] text-white text-xs font-bold inline-flex items-center gap-2 hover:bg-[#0a5147] transition"
          >
            <Plus className="w-4 h-4" />
            Add first property
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {properties.map((p) => (
            <div
              key={p.id}
              className="p-4 sm:p-5 hover:bg-slate-50/70 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* PROPERTY IMAGE */}
                <div className="relative shrink-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full sm:w-24 h-40 sm:h-20 rounded-xl object-cover bg-slate-100"
                  />

                  <div className="absolute top-2 left-2 sm:hidden px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wide">
                    {p.subType || p.type}
                  </div>
                </div>

                {/* PROPERTY INFORMATION */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm sm:text-base font-black text-slate-900 truncate">
                      {p.title}
                    </h4>

                    <span className="hidden sm:inline-flex px-2 py-1 rounded-md bg-[#063d35]/7 text-[#063d35] text-[9px] font-black uppercase tracking-wide">
                      {p.subType || p.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{p.district}</span>
                    </div>

                    {p.rooms && (
                      <div className="text-xs text-slate-400">
                        {p.rooms.length}{" "}
                        {p.rooms.length === 1 ? "room/package" : "rooms/packages"}
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 sm:ml-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEditClick(p)}
                    className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-[#063d35]/7 hover:bg-[#063d35]/12 text-[#063d35] text-xs font-bold inline-flex items-center justify-center gap-2 transition"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteProperty(p)}
                    aria-label={`Delete ${p.title}`}
                    title="Delete property"
                    className="w-10 h-10 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-red-600 inline-flex items-center justify-center transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
)}

        {/* closes PAGE CONTENT */}
      </div>

      {/* closes ADMIN WORKSPACE */}
    </main>

    {/* closes authenticated admin shell */}
  </div>
)}

</div>
</div>
)}

{bookingProperty && selectedRoom && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="booking-dialog dialog-enter bg-white rounded-3xl max-w-md w-full p-6 relative">
            <button
              disabled={bookingBusy}
              onClick={() => setBookingProperty(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              {lang === "SOM" ? "Xaqiiji Qabsashada" : "Confirm your request"}
            </h3>
            <p className="text-xs text-[#063d35] font-bold mb-0.5">
              {bookingProperty.title} — {selectedRoom.name}
            </p>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mb-4">
              {lang === "SOM"
                ? "Lacagta ku bixi goobta"
                : "Pay at property · No payment now"}
            </span>
            <p className="mb-4 rounded-xl border border-[#e6d5ad] bg-[#fbf6e9] px-3.5 py-2.5 text-xs leading-5 text-[#66542d]">
              {lang === "SOM"
                ? "Hordhac keliya — wax booking ah lama dirayo ama lama kaydinayo."
                : "Preview only — no booking request will be sent or saved."}
            </p>

            <form
              noValidate
              aria-busy={bookingBusy}
              onSubmit={handleBookingSubmit}
              className="space-y-3.5"
            >
              {bookingError && (
                <p role="alert" className="inline-error">
                  {bookingError}
                </p>
              )}
              <DateRangePicker
                single={selectedRoom.period !== "habeenkii"}
                start={
                  selectedRoom.period === "habeenkii" ? checkInDate : eventDate
                }
                end={selectedRoom.period === "habeenkii" ? checkOutDate : ""}
                onChange={(a, b) => {
                  if (selectedRoom.period === "habeenkii") {
                    setCheckInDate(a);
                    setCheckOutDate(b);
                  } else setEventDate(a);
                }}
                lang={lang}
              />{" "}
              <p className="text-xs text-slate-500">
                {selectedRoom.period === "habeenkii" ? (
                  <>
                    {" "}
                    {checkInDate} → {checkOutDate}
                  </>
                ) : (
                  eventDate
                )}{" "}
                ·{" "}
                {selectedRoom.period === "habeenkii"
                  ? nightsBetween(checkInDate, checkOutDate)
                  : 1}{" "}
                {lang === "SOM" ? "habeen / xaflad" : "nights / event"} ·{" "}
                {bookingGuests} {lang === "SOM" ? "qof" : "guests"}
              </p>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  aria-label={t.fullName}
                  autoComplete="name"
                  required
                  placeholder="Cali Maxamed"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border rounded-xl p-3 text-xs font-semibold bg-slate-50"
                />
              </div>
              <div className="space-y-1.5">
  <label className="text-xs font-extrabold text-slate-700 flex items-center justify-between">
    <span>
      {lang === "SOM" ? "Nambarka WhatsApp-ka" : "WhatsApp number"}
    </span>

    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
      {lang === "SOM" ? "Soomaaliya" : "Somalia"}
    </span>
  </label>

  <div
    className="
      group flex items-stretch overflow-hidden
      rounded-2xl border border-slate-200 bg-white
      shadow-[0_4px_18px_rgba(15,23,42,0.04)]
      transition-all duration-300
      focus-within:border-[#063d35]
      focus-within:ring-4 focus-within:ring-[#063d35]/10
      focus-within:shadow-[0_8px_30px_rgba(6,61,53,0.10)]
      focus-within:-translate-y-[1px]
    "
  >
    <div
      className="
        flex items-center gap-2
        bg-[#f3f8f6]
        border-r border-slate-200
        px-3.5 sm:px-4
        select-none
      "
    >
      <span className="text-xl leading-none" aria-hidden="true">
        SO
      </span>

      <span className="text-sm font-black text-[#063d35] whitespace-nowrap">
        +252
      </span>
    </div>

    <input
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      aria-label={
        lang === "SOM"
          ? "Nambarka telefoonka Soomaaliya"
          : "Somali phone number"
      }
      required
      maxLength={9}
      placeholder="61 1234567"
      value={customerPhone}
      onChange={(e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.startsWith("252")) {
          value = value.slice(3);
        }

        if (value.startsWith("0")) {
          value = value.slice(1);
        }

        setCustomerPhone(value.slice(0, 9));
        setBookingError("");
      }}
      className="
        min-w-0 flex-1 bg-transparent
        px-4 py-3.5
        text-sm font-bold text-slate-900
        tracking-[0.04em]
        outline-none
        placeholder:text-slate-300
      "
    />

    {customerPhone.length === 9 && (
      <div className="flex items-center pr-3 animate-[fadeIn_.2s_ease-out]">
        <span
          className="
            flex h-6 w-6 items-center justify-center
            rounded-full bg-emerald-100 text-emerald-700
          "
          title={lang === "SOM" ? "Nambar dhameystiran" : "Number complete"}
        >
          <Check size={14} strokeWidth={3} />
        </span>
      </div>
    )}
  </div>

  <div className="flex items-center justify-between gap-3 px-1">
    <p className="text-[10px] font-medium text-slate-400">
      {lang === "SOM"
        ? "Geli 9-ka lambar oo keliya — +252 si otomaatig ah ayaa loogu daraa."
        : "Enter only the 9 digits — +252 is added automatically."}
    </p>

    <span
      className={`shrink-0 text-[10px] font-extrabold transition-colors duration-200 ${
        customerPhone.length === 9
          ? "text-emerald-600"
          : "text-slate-300"
      }`}
    >
      {customerPhone.length}/9
    </span>
  </div>

  <div className="pt-2">
    <label className="text-xs font-extrabold text-slate-700 block mb-1.5">
      {lang === "SOM" ? "Email" : "Email address"}

      <span className="ml-1.5 font-medium text-slate-400">
        ({lang === "SOM" ? "ikhtiyaari" : "optional"})
      </span>
    </label>

    <div
      className="
        flex items-center gap-3
        rounded-2xl border border-slate-200 bg-white
        px-4
        shadow-[0_4px_18px_rgba(15,23,42,0.04)]
        transition-all duration-300
        focus-within:border-[#063d35]
        focus-within:ring-4 focus-within:ring-[#063d35]/10
        focus-within:shadow-[0_8px_30px_rgba(6,61,53,0.08)]
        focus-within:-translate-y-[1px]
      "
    >
      <Mail
        size={17}
        className="shrink-0 text-slate-400 transition-colors duration-300"
      />

      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="magaca@email.com"
        value={customerBookingEmail}
        onChange={(e) => {
          setCustomerBookingEmail(e.target.value);
          setBookingError("");
        }}
        className="
          min-w-0 flex-1 bg-transparent
          py-3.5
          text-sm font-semibold text-slate-900
          outline-none
          placeholder:text-slate-300
        "
      />
    </div>

    <p className="mt-1.5 px-1 text-[10px] font-medium text-slate-400">
      {lang === "SOM"
        ? "Ikhtiyaari — waxaa loo isticmaali karaa xaqiijinta booking-ka."
        : "Optional — it can be used for booking confirmation."}
    </p>
  </div>
</div>
              <div className="bg-stone-100 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-600">
                  <span>
                    {lang === "SOM" ? "Martida / Tirada Dadka:" : "Guests:"}
                  </span>

                  <input
                    type="number"
                    aria-label={t.guests}
                    min="1"
                    max={selectedRoom.capacity || 1}
                    value={bookingGuests}
                    onChange={(e) => {
                      const maxGuests = Number(selectedRoom.capacity) || 1;

                      const value = Math.max(
                        1,
                        Math.min(Number(e.target.value) || 1, maxGuests),
                      );

                      setBookingGuests(value);
                    }}
                    className="w-24 border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs font-black text-[#063d35] text-center outline-none focus:border-[#063d35]"
                  />
                </div>

                <p className="text-[11px] text-slate-400 text-right">
                  {lang === "SOM"
                    ? `Ugu badnaan ${selectedRoom.capacity || 1} qof`
                    : `Maximum ${selectedRoom.capacity || 1} guests`}
                </p>

                <div className="flex justify-between text-sm font-black text-[#063d35] pt-2 border-t border-slate-300/50">
                  <span>{t.total}:</span>

                  <span>
                    $
                    {selectedRoom.period === "habeenkii"
                      ? selectedRoom.price * calculateDays()
                      : selectedRoom.price}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="booking-preview-button"
                onClick={() => setReceiptPreview(receiptData(true))}
              >
                {lang === "SOM"
                  ? "Eeg kaarka sawirka iyo faahfaahinta"
                  : "Preview photo + booking details"}
              </button>
              <button
                type="submit"
                disabled={bookingBusy}
                className="w-full bg-[#063d35] hover:bg-[#0a5147] text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center space-x-2 transition mt-2"
              >
                <Send className="w-4 h-4" />
                <span>
                  {bookingBusy
                    ? lang === "SOM"
                      ? "Waa la dirayaa…"
                      : "Submitting…"
                    : lang === "SOM"
                      ? "Xaqiiji codsiga"
                      : "Confirm request"}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
