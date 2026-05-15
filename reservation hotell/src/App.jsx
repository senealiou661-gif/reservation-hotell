import { useState, useContext, createContext, useEffect } from "react";

// ─── DONNÉES MOCK ───────────────────────────────────────────────────────────

const HOTELS = [
  {
    id: 1, name: "Le Grand Palais", city: "Paris", country: "France",
    stars: 5, rating: 4.9, reviews: 342,
    price: 420, oldPrice: 580,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    ],
    description: "Au cœur de Paris, Le Grand Palais vous accueille dans un cadre d'exception alliant luxe intemporel et modernité. Vue imprenable sur la Tour Eiffel depuis les suites supérieures.",
    amenities: ["WiFi", "Piscine", "Spa", "Restaurant", "Bar", "Parking", "Salle sport", "Concierge"],
    rooms: [
      { id: 1, name: "Chambre Classique", price: 420, capacity: 2, size: 28, beds: "1 lit King" },
      { id: 2, name: "Chambre Supérieure", price: 580, capacity: 2, size: 36, beds: "1 lit King" },
      { id: 3, name: "Suite Deluxe", price: 920, capacity: 3, size: 65, beds: "1 lit King + canapé-lit" },
      { id: 4, name: "Suite Présidentielle", price: 1800, capacity: 4, size: 120, beds: "2 lits King" },
    ],
    category: "Luxe", available: true,
  },
  {
    id: 2, name: "Riviera Bleu", city: "Nice", country: "France",
    stars: 4, rating: 4.7, reviews: 218,
    price: 195, oldPrice: 260,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    ],
    description: "Face à la Méditerranée, le Riviera Bleu offre une expérience balnéaire incomparable. Profitez de la plage privée, du restaurant gastronomique et de chambres aux teintes azurées.",
    amenities: ["WiFi", "Plage privée", "Piscine", "Restaurant", "Bar", "Parking"],
    rooms: [
      { id: 1, name: "Chambre Mer", price: 195, capacity: 2, size: 24, beds: "1 lit Queen" },
      { id: 2, name: "Chambre Supérieure Vue Mer", price: 280, capacity: 2, size: 32, beds: "1 lit King" },
      { id: 3, name: "Suite Côte d'Azur", price: 520, capacity: 3, size: 58, beds: "1 lit King + canapé-lit" },
    ],
    category: "Balnéaire", available: true,
  },
  {
    id: 3, name: "Chalet Alpin", city: "Chamonix", country: "France",
    stars: 4, rating: 4.8, reviews: 156,
    price: 280, oldPrice: 340,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800&q=80",
    ],
    description: "Niché au pied du Mont-Blanc, le Chalet Alpin est le refuge parfait pour les amoureux de montagne. Ambiance cosy avec cheminée, sauna et vue panoramique sur les sommets.",
    amenities: ["WiFi", "Sauna", "Cheminée", "Restaurant", "Ski room", "Navette ski"],
    rooms: [
      { id: 1, name: "Chambre Montagne", price: 280, capacity: 2, size: 26, beds: "1 lit King" },
      { id: 2, name: "Suite Panoramique", price: 450, capacity: 2, size: 48, beds: "1 lit King" },
      { id: 3, name: "Chalet Privatif", price: 1200, capacity: 6, size: 200, beds: "4 lits" },
    ],
    category: "Montagne", available: true,
  },
  {
    id: 4, name: "Hôtel des Arts", city: "Lyon", country: "France",
    stars: 4, rating: 4.6, reviews: 289,
    price: 145, oldPrice: 185,
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    ],
    description: "Boutique-hôtel au cœur du Vieux Lyon, l'Hôtel des Arts célèbre la gastronomie et la culture lyonnaise. Chaque chambre est une œuvre d'art unique signée par des artistes locaux.",
    amenities: ["WiFi", "Restaurant gastronomique", "Bar", "Terrasse", "Vélos"],
    rooms: [
      { id: 1, name: "Studio Artiste", price: 145, capacity: 2, size: 22, beds: "1 lit Queen" },
      { id: 2, name: "Chambre Galerie", price: 210, capacity: 2, size: 30, beds: "1 lit King" },
      { id: 3, name: "Suite Atelier", price: 380, capacity: 4, size: 55, beds: "2 lits Queen" },
    ],
    category: "Boutique", available: true,
  },
  {
    id: 5, name: "Domaine de Provence", city: "Aix-en-Provence", country: "France",
    stars: 5, rating: 4.9, reviews: 124,
    price: 380, oldPrice: 480,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1587874522487-fe10e954d035?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    description: "Mas provençal du XVIIIe siècle au milieu des champs de lavande. Une retraite de luxe où le temps s'arrête, entre piscine à débordement, oliveraie et cuisine du terroir.",
    amenities: ["WiFi", "Piscine à débordement", "Spa", "Restaurant", "Oliveraie", "Jardins", "Yoga"],
    rooms: [
      { id: 1, name: "Chambre Lavande", price: 380, capacity: 2, size: 35, beds: "1 lit King" },
      { id: 2, name: "Suite Olivier", price: 620, capacity: 2, size: 65, beds: "1 lit King" },
      { id: 3, name: "Villa Privée", price: 1500, capacity: 6, size: 250, beds: "3 lits King" },
    ],
    category: "Campagne", available: true,
  },
  {
    id: 6, name: "Le Méridien Bordeaux", city: "Bordeaux", country: "France",
    stars: 4, rating: 4.5, reviews: 301,
    price: 160, oldPrice: 200,
    image: "https://images.unsplash.com/photo-1609957372198-27cdca25d01e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1609957372198-27cdca25d01e?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    ],
    description: "En plein cœur de Bordeaux, ce palace du XIXe siècle allie élégance historique et équipements contemporains. Cave à vins exceptionnelle avec 500 références de grands crus.",
    amenities: ["WiFi", "Cave à vins", "Restaurant", "Bar", "Spa", "Parking", "Terrasse"],
    rooms: [
      { id: 1, name: "Chambre Classique", price: 160, capacity: 2, size: 25, beds: "1 lit Queen" },
      { id: 2, name: "Chambre Vignoble", price: 230, capacity: 2, size: 35, beds: "1 lit King" },
      { id: 3, name: "Suite Grand Cru", price: 480, capacity: 3, size: 70, beds: "1 lit King + canapé-lit" },
    ],
    category: "Luxe", available: true,
  },
];

// ─── CONTEXTS ───────────────────────────────────────────────────────────────

const AuthContext = createContext();
const BookingContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const login = (email, password) => {
    if (email && password.length >= 4) {
      setUser({ id: 1, name: email.split("@")[0], email, avatar: email[0].toUpperCase() });
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    if (name && email && password.length >= 4) {
      setUser({ id: 1, name, email, avatar: name[0].toUpperCase() });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const addReservation = (res) => {
    setReservations(prev => [{ ...res, id: Date.now(), createdAt: new Date() }, ...prev]);
  };

  const cancelReservation = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "annulée" } : r));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, reservations, addReservation, cancelReservation }}>
      {children}
    </AuthContext.Provider>
  );
}

function BookingProvider({ children }) {
  const [booking, setBooking] = useState({
    hotel: null, room: null, checkIn: "", checkOut: "", guests: 2,
  });
  const [favorites, setFavorites] = useState([]);

  const setSearch = (data) => setBooking(prev => ({ ...prev, ...data }));
  const startBooking = (hotel, room) => setBooking(prev => ({ ...prev, hotel, room }));
  const clearBooking = () => setBooking({ hotel: null, room: null, checkIn: "", checkOut: "", guests: 2 });

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const nights = () => {
    if (!booking.checkIn || !booking.checkOut) return 1;
    const d = (new Date(booking.checkOut) - new Date(booking.checkIn)) / 86400000;
    return d > 0 ? d : 1;
  };

  return (
    <BookingContext.Provider value={{ booking, setSearch, startBooking, clearBooking, favorites, toggleFavorite, nights }}>
      {children}
    </BookingContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);
const useBooking = () => useContext(BookingContext);

// ─── STYLES ─────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-light: #F5EDDA;
    --gold-dark: #9A7A30;
    --navy: #1A2332;
    --navy-light: #243040;
    --cream: #FAF8F4;
    --cream-dark: #F0EDE6;
    --white: #FFFFFF;
    --text: #1A2332;
    --text-sec: #5A6A7A;
    --text-muted: #8A9AB0;
    --border: #E8E4DA;
    --success: #2E7D52;
    --error: #C0392B;
    --radius: 12px;
    --shadow: 0 4px 24px rgba(26,35,50,0.10);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text); -webkit-font-smoothing: antialiased; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .fade { animation: fadeUp 0.4s ease both; }
  .fade1 { animation: fadeUp 0.4s 0.05s ease both; }
  .fade2 { animation: fadeUp 0.4s 0.10s ease both; }
  .fade3 { animation: fadeUp 0.4s 0.15s ease both; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(26,35,50,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    padding: 0 24px;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-brand {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.5px;
    cursor: pointer;
  }
  .nav-links { display: flex; align-items: center; gap: 8px; }
  .nav-btn {
    padding: 8px 16px; border-radius: 8px; border: none;
    font-size: 14px; font-weight: 500; cursor: pointer;
    transition: all 0.2s;
  }
  .nav-btn-ghost { background: transparent; color: rgba(255,255,255,0.75); }
  .nav-btn-ghost:hover { color: var(--gold); }
  .nav-btn-gold { background: var(--gold); color: var(--navy); }
  .nav-btn-gold:hover { background: #d4b05a; }
  .nav-user {
    display: flex; align-items: center; gap: 10px;
    color: var(--white); font-size: 14px;
  }
  .avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--gold); color: var(--navy);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px; cursor: pointer;
  }

  /* PAGE */
  .page { min-height: 100vh; padding-top: 64px; }

  /* HERO */
  .hero {
    position: relative;
    min-height: 88vh;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #1A2332 0%, #2C3E56 50%, #1A2332 100%);
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80') center/cover;
    opacity: 0.15;
  }
  .hero-content { position: relative; text-align: center; padding: 40px 24px; max-width: 800px; }
  .hero-eyebrow {
    display: inline-block;
    background: rgba(201,168,76,0.15);
    border: 1px solid rgba(201,168,76,0.4);
    color: var(--gold);
    font-size: 12px; font-weight: 600; letter-spacing: 2px;
    padding: 6px 16px; border-radius: 20px;
    margin-bottom: 24px; text-transform: uppercase;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 700;
    color: var(--white);
    line-height: 1.15;
    margin-bottom: 16px;
  }
  .hero-title span { color: var(--gold); }
  .hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); margin-bottom: 48px; max-width: 500px; margin-left: auto; margin-right: auto; }

  /* SEARCH FORM */
  .search-form {
    background: var(--white);
    border-radius: 16px;
    padding: 8px;
    display: flex; gap: 4px; flex-wrap: wrap;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 780px;
    margin: 0 auto;
  }
  .search-field {
    flex: 1; min-width: 140px;
    display: flex; flex-direction: column;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .search-field:hover { background: var(--cream); }
  .search-field label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .search-field input, .search-field select {
    border: none; outline: none;
    font-size: 15px; font-weight: 500; color: var(--text);
    background: transparent;
    cursor: pointer; width: 100%;
  }
  .search-field input::placeholder { color: var(--text-muted); font-weight: 400; }
  .search-divider { width: 1px; background: var(--border); margin: 8px 0; }
  .search-submit {
    background: var(--gold);
    border: none; border-radius: 10px;
    padding: 14px 28px;
    font-size: 15px; font-weight: 600;
    color: var(--navy);
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
    white-space: nowrap;
  }
  .search-submit:hover { background: #d4b05a; transform: translateY(-1px); }

  /* STATS */
  .stats { display: flex; gap: 48px; justify-content: center; margin-top: 56px; flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--gold); }
  .stat-label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }

  /* SECTION */
  .section { padding: 64px 24px; max-width: 1200px; margin: 0 auto; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .section-sub { color: var(--text-sec); font-size: 16px; margin-bottom: 36px; }

  /* HOTEL GRID */
  .hotels-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
  .hotel-card {
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(26,35,50,0.07);
    transition: all 0.3s;
    cursor: pointer;
  }
  .hotel-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(26,35,50,0.14); }
  .hotel-img { position: relative; height: 220px; overflow: hidden; }
  .hotel-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .hotel-card:hover .hotel-img img { transform: scale(1.06); }
  .hotel-badge {
    position: absolute; top: 12px; left: 12px;
    background: var(--gold); color: var(--navy);
    font-size: 11px; font-weight: 700;
    padding: 4px 10px; border-radius: 6px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .hotel-fav {
    position: absolute; top: 12px; right: 12px;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.9);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; transition: all 0.2s;
  }
  .hotel-fav:hover { transform: scale(1.1); }
  .hotel-fav.active { background: #ffe0e0; }
  .hotel-body { padding: 20px; }
  .hotel-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
  .hotel-city { color: var(--text-muted); font-size: 13px; margin-bottom: 10px; }
  .hotel-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .rating { display: flex; align-items: center; gap: 4px; }
  .rating-score { background: var(--navy); color: var(--white); font-size: 12px; font-weight: 700; padding: 2px 7px; border-radius: 5px; }
  .rating-text { font-size: 13px; color: var(--text-sec); }
  .stars-row { color: var(--gold); font-size: 13px; }
  .hotel-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }
  .price-old { font-size: 13px; color: var(--text-muted); text-decoration: line-through; }
  .price-new { font-size: 22px; font-weight: 700; color: var(--navy); }
  .price-new span { font-size: 13px; font-weight: 400; color: var(--text-sec); }
  .book-btn {
    background: var(--navy); color: var(--white);
    border: none; border-radius: 8px;
    padding: 10px 18px; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .book-btn:hover { background: var(--gold); color: var(--navy); }

  /* FILTERS */
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; align-items: center; }
  .filter-btn {
    padding: 8px 16px; border-radius: 20px;
    border: 1.5px solid var(--border);
    background: var(--white); color: var(--text-sec);
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn:hover { border-color: var(--gold); color: var(--gold); }
  .filter-btn.active { background: var(--navy); color: var(--white); border-color: var(--navy); }
  .sort-select {
    margin-left: auto; padding: 8px 14px;
    border: 1.5px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--text); background: var(--white);
    cursor: pointer; outline: none;
  }

  /* HOTEL DETAIL */
  .detail-hero { position: relative; height: 420px; overflow: hidden; }
  .detail-hero img { width: 100%; height: 100%; object-fit: cover; }
  .detail-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,35,50,0.7) 0%, transparent 60%); }
  .detail-hero-content { position: absolute; bottom: 32px; left: 32px; color: var(--white); }
  .detail-hero-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; margin-bottom: 8px; }
  
  .detail-grid { display: grid; grid-template-columns: 1fr 340px; gap: 32px; padding: 40px 24px; max-width: 1200px; margin: 0 auto; }
  .detail-main {}
  .detail-sidebar {}

  .thumb-row { display: flex; gap: 10px; margin-top: 16px; }
  .thumb { width: 100px; height: 70px; border-radius: 8px; overflow: hidden; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; }
  .thumb:hover, .thumb.active { opacity: 1; }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }

  .section-heading { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; color: var(--navy); margin: 28px 0 14px; }
  .amenities-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .amenity-chip {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 8px;
    background: var(--cream); border: 1px solid var(--border);
    font-size: 13px; color: var(--text-sec);
  }

  /* ROOMS */
  .room-card {
    border: 1.5px solid var(--border); border-radius: 12px;
    padding: 20px; margin-bottom: 14px;
    transition: all 0.2s; cursor: pointer;
  }
  .room-card:hover { border-color: var(--gold); box-shadow: 0 4px 16px rgba(201,168,76,0.15); }
  .room-card.selected { border-color: var(--gold); background: var(--gold-light, #FFF8EC); }
  .room-header { display: flex; align-items: flex-start; justify-content: space-between; }
  .room-name { font-weight: 600; font-size: 17px; color: var(--navy); margin-bottom: 4px; }
  .room-details { font-size: 13px; color: var(--text-sec); }
  .room-price { text-align: right; }
  .room-price .price { font-size: 22px; font-weight: 700; color: var(--navy); }
  .room-price .per { font-size: 12px; color: var(--text-muted); }

  /* BOOKING SIDEBAR */
  .booking-card {
    background: var(--white); border-radius: 16px;
    border: 1.5px solid var(--border);
    padding: 24px; position: sticky; top: 84px;
    box-shadow: var(--shadow);
  }
  .booking-card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--navy); margin-bottom: 20px; }
  .booking-field { margin-bottom: 14px; }
  .booking-field label { display: block; font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .booking-field input, .booking-field select {
    width: 100%; padding: 10px 12px;
    border: 1.5px solid var(--border); border-radius: 8px;
    font-size: 14px; color: var(--text);
    outline: none; transition: border 0.2s;
    background: var(--cream);
  }
  .booking-field input:focus, .booking-field select:focus { border-color: var(--gold); background: var(--white); }
  .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; color: var(--text-sec); }
  .total-row.total { border-top: 1.5px solid var(--border); margin-top: 8px; padding-top: 14px; font-weight: 700; font-size: 17px; color: var(--navy); }
  .btn-primary {
    width: 100%; padding: 14px;
    background: var(--gold); color: var(--navy);
    border: none; border-radius: 10px;
    font-size: 16px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; margin-top: 16px;
  }
  .btn-primary:hover { background: #d4b05a; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-secondary {
    padding: 10px 20px; background: var(--white);
    border: 1.5px solid var(--border); border-radius: 8px;
    font-size: 14px; font-weight: 500; color: var(--text);
    cursor: pointer; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }

  /* AUTH */
  .auth-container { max-width: 420px; margin: 60px auto; padding: 0 24px; }
  .auth-card { background: var(--white); border-radius: 20px; padding: 36px; box-shadow: var(--shadow); }
  .auth-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
  .auth-sub { color: var(--text-sec); font-size: 14px; margin-bottom: 28px; }
  .form-field { margin-bottom: 16px; }
  .form-field label { display: block; font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .form-field input {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid var(--border); border-radius: 10px;
    font-size: 14px; outline: none;
    transition: border 0.2s; background: var(--cream);
  }
  .form-field input:focus { border-color: var(--gold); background: var(--white); }
  .auth-switch { text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-sec); }
  .auth-switch button { background: none; border: none; color: var(--gold); font-weight: 600; cursor: pointer; }
  .error-msg { background: #fde8e8; color: var(--error); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 14px; }

  /* DASHBOARD */
  .dashboard-header { background: var(--navy); color: var(--white); padding: 40px 24px 60px; }
  .dashboard-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--gold); margin-bottom: 6px; }
  .dashboard-sub { color: rgba(255,255,255,0.6); }
  .dashboard-body { max-width: 900px; margin: -32px auto 0; padding: 0 24px 48px; }
  .res-card {
    background: var(--white); border-radius: 14px;
    padding: 20px 24px; margin-bottom: 14px;
    box-shadow: 0 2px 12px rgba(26,35,50,0.07);
    display: flex; gap: 20px; align-items: flex-start;
  }
  .res-img { width: 90px; height: 70px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .res-info { flex: 1; }
  .res-hotel { font-weight: 600; font-size: 17px; color: var(--navy); margin-bottom: 4px; }
  .res-dates { font-size: 13px; color: var(--text-sec); margin-bottom: 6px; }
  .res-status {
    display: inline-block; font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .status-confirmed { background: #e8f5ee; color: var(--success); }
  .status-cancelled { background: #fde8e8; color: var(--error); }
  .res-amount { font-weight: 700; font-size: 18px; color: var(--navy); white-space: nowrap; }
  .cancel-btn {
    background: none; border: 1.5px solid #fcc; color: var(--error);
    border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 600;
    cursor: pointer; margin-top: 8px; transition: all 0.2s;
  }
  .cancel-btn:hover { background: #fde8e8; }
  .empty-state { text-align: center; padding: 60px 24px; }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--navy); margin-bottom: 8px; }
  .empty-sub { color: var(--text-sec); font-size: 14px; }

  /* CONFIRMATION */
  .confirm-container { max-width: 560px; margin: 40px auto; padding: 0 24px 60px; }
  .confirm-icon { width: 72px; height: 72px; background: #e8f5ee; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 20px; }
  .confirm-card { background: var(--white); border-radius: 20px; padding: 36px; box-shadow: var(--shadow); text-align: center; }
  .confirm-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .confirm-sub { color: var(--text-sec); margin-bottom: 28px; }
  .confirm-detail { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); text-align: left; font-size: 14px; }
  .confirm-detail:last-of-type { border: none; }
  .confirm-detail-label { color: var(--text-sec); }
  .confirm-detail-value { font-weight: 600; color: var(--navy); }
  .confirm-ref { background: var(--cream); border-radius: 10px; padding: 14px; font-family: monospace; font-size: 18px; letter-spacing: 3px; color: var(--gold-dark); margin: 20px 0; font-weight: 700; }

  /* FOOTER */
  .footer { background: var(--navy); color: rgba(255,255,255,0.5); text-align: center; padding: 28px; font-size: 13px; }
  .footer span { color: var(--gold); }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: var(--navy); color: var(--white);
    padding: 14px 20px; border-radius: 10px;
    font-size: 14px; font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: fadeUp 0.3s ease both;
    border-left: 3px solid var(--gold);
  }
`;

// ─── UTILS ──────────────────────────────────────────────────────────────────

const Stars = ({ n }) => "★".repeat(n) + "☆".repeat(5 - n);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—";
const genRef = () => "HLX" + Math.random().toString(36).substring(2, 8).toUpperCase();

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">✓ {msg}</div>;
}

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => setPage("home")}>HôtelLux</div>
      <div className="nav-links">
        <button className="nav-btn nav-btn-ghost" onClick={() => setPage("search")}>Hôtels</button>
        {user ? (
          <>
            <button className="nav-btn nav-btn-ghost" onClick={() => setPage("dashboard")}>Mes réservations</button>
            <div className="nav-user">
              <div className="avatar" title={user.name}>{user.avatar}</div>
              <button className="nav-btn nav-btn-ghost" onClick={() => { logout(); setPage("home"); }}>Déconnexion</button>
            </div>
          </>
        ) : (
          <>
            <button className="nav-btn nav-btn-ghost" onClick={() => setPage("auth")}>Connexion</button>
            <button className="nav-btn nav-btn-gold" onClick={() => setPage("auth")}>S'inscrire</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── HOME ───────────────────────────────────────────────────────────────────

function Home({ setPage, setSelectedHotel }) {
  const { booking, setSearch } = useBooking();
  const [form, setForm] = useState({ city: booking.city || "", checkIn: booking.checkIn || "", checkOut: booking.checkOut || "", guests: booking.guests || 2 });

  const handleSearch = () => {
    setSearch(form);
    setPage("search");
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-eyebrow fade">Voyagez avec élégance</div>
          <h1 className="hero-title fade1">
            Des séjours<br /><span>d'exception</span> vous attendent
          </h1>
          <p className="hero-sub fade2">Découvrez nos hôtels de luxe sélectionnés avec soin, pour des expériences inoubliables à travers la France.</p>

          <div className="search-form fade3">
            <div className="search-field">
              <label>Destination</label>
              <input placeholder="Paris, Nice, Lyon…" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label>Arrivée</label>
              <input type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label>Départ</label>
              <input type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} />
            </div>
            <div className="search-divider" />
            <div className="search-field" style={{ minWidth: 100 }}>
              <label>Voyageurs</label>
              <select value={form.guests} onChange={e => setForm({ ...form, guests: +e.target.value })}>
                {[1,2,3,4,5,6].map(n => <option key={n}>{n} {n === 1 ? "personne" : "personnes"}</option>)}
              </select>
            </div>
            <button className="search-submit" onClick={handleSearch}>
              <span>🔍</span> Rechercher
            </button>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Hôtels partenaires</div></div>
            <div className="stat"><div className="stat-num">98%</div><div className="stat-label">Clients satisfaits</div></div>
            <div className="stat"><div className="stat-num">50K+</div><div className="stat-label">Réservations réalisées</div></div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Nos hôtels coups de cœur</div>
        <div className="section-sub">Une sélection minutieuse pour des séjours d'exception</div>
        <HotelGrid hotels={HOTELS.slice(0, 3)} setPage={setPage} setSelectedHotel={setSelectedHotel} />
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className="btn-secondary" onClick={() => setPage("search")}>Voir tous les hôtels →</button>
        </div>
      </div>

      <div style={{ background: "var(--navy)", padding: "64px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "var(--gold)", marginBottom: 12 }}>
          Pourquoi choisir HôtelLux ?
        </div>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
          {[["🏆","Hôtels certifiés","Chaque établissement est inspecté et validé par notre équipe"],
            ["💰","Meilleur prix garanti","Trouvez moins cher ailleurs, on rembourse la différence"],
            ["⚡","Réservation instantanée","Confirmation immédiate, sans attente ni validation"],
            ["🎧","Support 24h/7j","Une équipe dédiée à votre service à toute heure"]
          ].map(([icon, title, text]) => (
            <div key={title} style={{ maxWidth: 200, color: "var(--white)" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        © 2024 <span>HôtelLux</span> — Tous droits réservés
      </footer>
    </div>
  );
}

// ─── HOTEL GRID ─────────────────────────────────────────────────────────────

function HotelGrid({ hotels, setPage, setSelectedHotel }) {
  const { favorites, toggleFavorite } = useBooking();
  return (
    <div className="hotels-grid">
      {hotels.map((h, i) => (
        <div key={h.id} className="hotel-card fade" style={{ animationDelay: `${i * 0.07}s` }}>
          <div className="hotel-img">
            <img src={h.image} alt={h.name} loading="lazy" />
            <div className="hotel-badge">{h.category}</div>
            <button
              className={`hotel-fav${favorites.includes(h.id) ? " active" : ""}`}
              onClick={e => { e.stopPropagation(); toggleFavorite(h.id); }}
            >{favorites.includes(h.id) ? "❤️" : "🤍"}</button>
          </div>
          <div className="hotel-body" onClick={() => { setSelectedHotel(h); setPage("detail"); }}>
            <div className="hotel-name">{h.name}</div>
            <div className="hotel-city">📍 {h.city}, {h.country}</div>
            <div className="hotel-meta">
              <div className="stars-row"><Stars n={h.stars} /></div>
              <div className="rating">
                <span className="rating-score">{h.rating}</span>
                <span className="rating-text">({h.reviews} avis)</span>
              </div>
            </div>
            <div className="hotel-footer">
              <div>
                <div className="price-old">À partir de {h.oldPrice}€</div>
                <div className="price-new">{h.price}€ <span>/ nuit</span></div>
              </div>
              <button className="book-btn">Voir →</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SEARCH ─────────────────────────────────────────────────────────────────

function Search({ setPage, setSelectedHotel }) {
  const { booking, setSearch } = useBooking();
  const [filter, setFilter] = useState("Tous");
  const [sort, setSort] = useState("recommandé");
  const [city, setCity] = useState(booking.city || "");

  const categories = ["Tous", "Luxe", "Balnéaire", "Montagne", "Boutique", "Campagne"];

  let hotels = HOTELS.filter(h => {
    const matchCity = !city || h.city.toLowerCase().includes(city.toLowerCase());
    const matchCat = filter === "Tous" || h.category === filter;
    return matchCity && matchCat;
  });

  if (sort === "prix-asc") hotels = [...hotels].sort((a, b) => a.price - b.price);
  if (sort === "prix-desc") hotels = [...hotels].sort((a, b) => b.price - a.price);
  if (sort === "note") hotels = [...hotels].sort((a, b) => b.rating - a.rating);

  return (
    <div className="page">
      <div style={{ background: "var(--navy)", padding: "32px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>
            <span style={{ cursor: "pointer" }} onClick={() => setPage("home")}>Accueil</span> › Recherche
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "var(--white)", marginBottom: 20 }}>
            Nos hôtels
          </div>
          <div className="search-form" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="search-field" style={{ color: "var(--white)" }}>
              <label style={{ color: "rgba(255,255,255,0.5)" }}>Destination</label>
              <input placeholder="Ville…" value={city} onChange={e => { setCity(e.target.value); setSearch({ city: e.target.value }); }}
                style={{ color: "var(--white)" }} />
            </div>
            <div className="search-divider" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="search-field">
              <label style={{ color: "rgba(255,255,255,0.5)" }}>Arrivée</label>
              <input type="date" defaultValue={booking.checkIn} onChange={e => setSearch({ checkIn: e.target.value })}
                style={{ color: "var(--white)" }} />
            </div>
            <div className="search-divider" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="search-field">
              <label style={{ color: "rgba(255,255,255,0.5)" }}>Départ</label>
              <input type="date" defaultValue={booking.checkOut} onChange={e => setSearch({ checkOut: e.target.value })}
                style={{ color: "var(--white)" }} />
            </div>
            <button className="search-submit">🔍 Rechercher</button>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 32 }}>
        <div className="filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recommandé">Recommandé</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="note">Meilleure note</option>
          </select>
        </div>
        <div style={{ color: "var(--text-sec)", fontSize: 14, marginBottom: 24 }}>
          {hotels.length} hôtel{hotels.length > 1 ? "s" : ""} trouvé{hotels.length > 1 ? "s" : ""}
        </div>
        {hotels.length > 0
          ? <HotelGrid hotels={hotels} setPage={setPage} setSelectedHotel={setSelectedHotel} />
          : <div className="empty-state"><div className="empty-icon">🔍</div><div className="empty-title">Aucun résultat</div><div className="empty-sub">Essayez une autre destination ou d'autres filtres.</div></div>
        }
      </div>
      <footer className="footer">© 2024 <span>HôtelLux</span></footer>
    </div>
  );
}

// ─── HOTEL DETAIL ────────────────────────────────────────────────────────────

function HotelDetail({ hotel, setPage, setToast }) {
  const { user } = useAuth();
  const { booking, setSearch, startBooking, nights } = useBooking();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  if (!hotel) return null;

  const n = nights();
  const total = selectedRoom ? selectedRoom.price * n : hotel.price * n;

  const handleBook = () => {
    if (!user) { setToast("Connectez-vous pour réserver"); setPage("auth"); return; }
    if (!selectedRoom) { setToast("Sélectionnez une chambre"); return; }
    startBooking(hotel, selectedRoom);
    setPage("booking");
  };

  const amenityIcon = { WiFi: "📶", Piscine: "🏊", Spa: "💆", Restaurant: "🍽️", Bar: "🍸", Parking: "🅿️", "Salle sport": "🏋️", Concierge: "🛎️", "Plage privée": "🏖️", Sauna: "🧖", Cheminée: "🔥", "Ski room": "⛷️", "Navette ski": "🚌", Terrasse: "🌿", Vélos: "🚲", Oliveraie: "🫒", Jardins: "🌸", Yoga: "🧘", "Cave à vins": "🍷" };

  return (
    <div className="page">
      <div className="detail-hero">
        <img src={hotel.images[activeImg]} alt={hotel.name} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <div className="detail-hero-title">{hotel.name}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>
            📍 {hotel.city} · <Stars n={hotel.stars} /> · ⭐ {hotel.rating} ({hotel.reviews} avis)
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          {hotel.images.map((img, i) => (
            <div key={i} className={`thumb${activeImg === i ? " active" : ""}`} onClick={() => setActiveImg(i)}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div style={{ color: "var(--text-sec)", fontSize: 15, lineHeight: 1.8 }}>{hotel.description}</div>

          <div className="section-heading">Équipements & services</div>
          <div className="amenities-grid">
            {hotel.amenities.map(a => (
              <div key={a} className="amenity-chip">{amenityIcon[a] || "✓"} {a}</div>
            ))}
          </div>

          <div className="section-heading">Choisissez votre chambre</div>
          {hotel.rooms.map(room => (
            <div
              key={room.id}
              className={`room-card${selectedRoom?.id === room.id ? " selected" : ""}`}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="room-header">
                <div>
                  <div className="room-name">{room.name}</div>
                  <div className="room-details">{room.beds} · {room.size}m² · jusqu'à {room.capacity} pers.</div>
                </div>
                <div className="room-price">
                  <div className="price">{room.price}€</div>
                  <div className="per">/ nuit</div>
                </div>
              </div>
              {selectedRoom?.id === room.id && (
                <div style={{ marginTop: 10, color: "var(--gold-dark)", fontSize: 13, fontWeight: 600 }}>
                  ✓ Chambre sélectionnée
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="detail-sidebar">
          <div className="booking-card">
            <div className="booking-card-title">Réserver</div>
            <div className="booking-field">
              <label>Arrivée</label>
              <input type="date" value={booking.checkIn} onChange={e => setSearch({ checkIn: e.target.value })} />
            </div>
            <div className="booking-field">
              <label>Départ</label>
              <input type="date" value={booking.checkOut} onChange={e => setSearch({ checkOut: e.target.value })} />
            </div>
            <div className="booking-field">
              <label>Voyageurs</label>
              <select value={booking.guests} onChange={e => setSearch({ guests: +e.target.value })}>
                {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            {selectedRoom && (
              <div style={{ marginTop: 16, padding: "14px 0", borderTop: "1px solid var(--border)" }}>
                <div className="total-row"><span>{selectedRoom.name}</span><span>{selectedRoom.price}€/nuit</span></div>
                <div className="total-row"><span>{n} nuit{n > 1 ? "s" : ""}</span><span>×{n}</span></div>
                <div className="total-row total"><span>Total</span><span>{total}€</span></div>
              </div>
            )}
            <button className="btn-primary" onClick={handleBook}>
              {selectedRoom ? `Réserver — ${total}€` : "Sélectionnez une chambre"}
            </button>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 10 }}>
              Annulation gratuite · Confirmation immédiate
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">© 2024 <span>HôtelLux</span></footer>
    </div>
  );
}

// ─── BOOKING ─────────────────────────────────────────────────────────────────

function Booking({ setPage, setToast }) {
  const { user } = useAuth();
  const { booking, nights, clearBooking } = useBooking();
  const { addReservation } = useAuth();
  const [form, setForm] = useState({ firstName: user?.name || "", lastName: "", email: user?.email || "", phone: "", cardNum: "", cardExp: "", cardCvv: "" });
  const [step, setStep] = useState(1);

  const { hotel, room, checkIn, checkOut } = booking;
  if (!hotel || !room) return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="empty-state"><div className="empty-icon">🛎️</div><div className="empty-title">Aucune réservation en cours</div><button className="btn-primary" style={{ width: "auto", marginTop: 16 }} onClick={() => setPage("search")}>Chercher un hôtel</button></div>
    </div>
  );

  const n = nights();
  const total = room.price * n;
  const taxes = Math.round(total * 0.1);

  const handleConfirm = () => {
    const res = {
      hotel, room, checkIn, checkOut,
      guests: booking.guests, nights: n,
      total: total + taxes,
      status: "confirmée",
      ref: genRef(),
    };
    addReservation(res);
    clearBooking();
    setPage("confirmation");
    setToast("Réservation confirmée !");
  };

  return (
    <div className="page">
      <div style={{ background: "var(--navy)", padding: "32px 24px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ color: "var(--gold)", fontFamily: "'Playfair Display',serif", fontSize: 28, marginBottom: 8 }}>Finaliser la réservation</div>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {["Vos informations", "Paiement"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i + 1 ? "var(--success)" : step === i + 1 ? "var(--gold)" : "rgba(255,255,255,0.2)", color: step === i + 1 ? "var(--navy)" : "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ color: step === i + 1 ? "var(--white)" : "rgba(255,255,255,0.4)", fontSize: 14 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 60px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
        <div>
          {step === 1 ? (
            <div className="fade">
              <div className="section-heading" style={{ marginTop: 0 }}>Vos coordonnées</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["firstName", "Prénom"], ["lastName", "Nom"]].map(([k, l]) => (
                  <div key={k} className="form-field">
                    <label>{l}</label>
                    <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={l} />
                  </div>
                ))}
              </div>
              {[["email", "Email", "email"], ["phone", "Téléphone", "tel"]].map(([k, l, t]) => (
                <div key={k} className="form-field">
                  <label>{l}</label>
                  <input type={t} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={l} />
                </div>
              ))}
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => setStep(2)}
                disabled={!form.firstName || !form.lastName || !form.email}>
                Continuer →
              </button>
            </div>
          ) : (
            <div className="fade">
              <div className="section-heading" style={{ marginTop: 0 }}>Informations de paiement</div>
              <div className="form-field">
                <label>Numéro de carte</label>
                <input placeholder="4242 4242 4242 4242" value={form.cardNum} onChange={e => setForm({ ...form, cardNum: e.target.value })} maxLength={19} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="form-field"><label>Expiration</label><input placeholder="MM/AA" value={form.cardExp} onChange={e => setForm({ ...form, cardExp: e.target.value })} /></div>
                <div className="form-field"><label>CVV</label><input placeholder="123" value={form.cardCvv} onChange={e => setForm({ ...form, cardCvv: e.target.value })} maxLength={3} /></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setStep(1)}>← Retour</button>
                <button className="btn-primary" style={{ flex: 1, marginTop: 0 }} onClick={handleConfirm}
                  disabled={!form.cardNum || !form.cardExp || !form.cardCvv}>
                  Confirmer — {total + taxes}€
                </button>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, textAlign: "center" }}>🔒 Paiement sécurisé · Données chiffrées</div>
            </div>
          )}
        </div>

        <div>
          <div className="booking-card">
            <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{hotel.name}</div>
            <div style={{ fontSize: 13, color: "var(--text-sec)", marginBottom: 16 }}>📍 {hotel.city}</div>
            <div className="total-row"><span>Chambre</span><span>{room.name}</span></div>
            <div className="total-row"><span>Arrivée</span><span>{fmtDate(checkIn)}</span></div>
            <div className="total-row"><span>Départ</span><span>{fmtDate(checkOut)}</span></div>
            <div className="total-row"><span>Voyageurs</span><span>{booking.guests}</span></div>
            <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />
            <div className="total-row"><span>{room.price}€ × {n} nuit{n > 1 ? "s" : ""}</span><span>{total}€</span></div>
            <div className="total-row"><span>Taxes & frais</span><span>{taxes}€</span></div>
            <div className="total-row total"><span>Total</span><span>{total + taxes}€</span></div>
          </div>
        </div>
      </div>
      <footer className="footer">© 2024 <span>HôtelLux</span></footer>
    </div>
  );
}

// ─── CONFIRMATION ────────────────────────────────────────────────────────────

function Confirmation({ setPage }) {
  const { reservations } = useAuth();
  const res = reservations[0];

  return (
    <div className="page" style={{ background: "var(--cream)" }}>
      <div className="confirm-container">
        <div className="confirm-card fade">
          <div className="confirm-icon">✅</div>
          <div className="confirm-title">Réservation confirmée !</div>
          <div className="confirm-sub">Merci pour votre réservation. Un email de confirmation vous a été envoyé.</div>
          {res && (
            <>
              <div className="confirm-ref">{res.ref}</div>
              <div className="confirm-detail"><span className="confirm-detail-label">Hôtel</span><span className="confirm-detail-value">{res.hotel.name}</span></div>
              <div className="confirm-detail"><span className="confirm-detail-label">Chambre</span><span className="confirm-detail-value">{res.room.name}</span></div>
              <div className="confirm-detail"><span className="confirm-detail-label">Arrivée</span><span className="confirm-detail-value">{fmtDate(res.checkIn)}</span></div>
              <div className="confirm-detail"><span className="confirm-detail-label">Départ</span><span className="confirm-detail-value">{fmtDate(res.checkOut)}</span></div>
              <div className="confirm-detail"><span className="confirm-detail-label">Total payé</span><span className="confirm-detail-value">{res.total}€</span></div>
            </>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setPage("dashboard")}>Mes réservations</button>
            <button className="btn-primary" style={{ flex: 1, marginTop: 0 }} onClick={() => setPage("home")}>Retour à l'accueil</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

function Dashboard({ setPage }) {
  const { user, reservations, cancelReservation } = useAuth();
  if (!user) return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="empty-state"><div className="empty-icon">🔒</div><div className="empty-title">Connexion requise</div><button className="btn-primary" style={{ width: "auto", marginTop: 16 }} onClick={() => setPage("auth")}>Se connecter</button></div>
    </div>
  );

  return (
    <div className="page">
      <div className="dashboard-header">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 22 }}>{user.avatar}</div>
            <div>
              <div className="dashboard-title">Bienvenue, {user.name}</div>
              <div className="dashboard-sub">{reservations.length} réservation{reservations.length !== 1 ? "s" : ""} au total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        {reservations.length === 0 ? (
          <div className="empty-state" style={{ background: "var(--white)", borderRadius: 16, padding: "48px 24px" }}>
            <div className="empty-icon">🏨</div>
            <div className="empty-title">Aucune réservation</div>
            <div className="empty-sub">Commencez par explorer nos hôtels.</div>
            <button className="btn-primary" style={{ width: "auto", marginTop: 20 }} onClick={() => setPage("search")}>Chercher un hôtel</button>
          </div>
        ) : reservations.map(res => (
          <div key={res.id} className="res-card fade">
            <img className="res-img" src={res.hotel.image} alt={res.hotel.name} />
            <div className="res-info">
              <div className="res-hotel">{res.hotel.name}</div>
              <div className="res-dates">📍 {res.hotel.city} · {fmtDate(res.checkIn)} → {fmtDate(res.checkOut)} · {res.nights} nuit{res.nights > 1 ? "s" : ""}</div>
              <div className="res-dates">{res.room.name} · {res.guests} voyageur{res.guests > 1 ? "s" : ""}</div>
              <span className={`res-status ${res.status === "annulée" ? "status-cancelled" : "status-confirmed"}`}>
                {res.status}
              </span>
              {res.status !== "annulée" && (
                <div><button className="cancel-btn" onClick={() => cancelReservation(res.id)}>Annuler</button></div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="res-amount">{res.total}€</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Réf. {res.ref}</div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">© 2024 <span>HôtelLux</span></footer>
    </div>
  );
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

function Auth({ setPage, setToast }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (mode === "login") {
      if (login(form.email, form.password)) { setToast("Connexion réussie !"); setPage("home"); }
      else setError("Email ou mot de passe incorrect.");
    } else {
      if (register(form.name, form.email, form.password)) { setToast("Bienvenue !"); setPage("home"); }
      else setError("Veuillez remplir tous les champs (mot de passe 4 car. min).");
    }
  };

  return (
    <div className="page" style={{ background: "var(--cream)", display: "flex", alignItems: "center" }}>
      <div className="auth-container" style={{ width: "100%", marginTop: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "var(--gold)", fontWeight: 700 }}>HôtelLux</div>
        </div>
        <div className="auth-card fade">
          <div className="auth-title">{mode === "login" ? "Connexion" : "Créer un compte"}</div>
          <div className="auth-sub">{mode === "login" ? "Accédez à vos réservations" : "Rejoignez HôtelLux"}</div>
          {error && <div className="error-msg">{error}</div>}
          {mode === "register" && (
            <div className="form-field">
              <label>Prénom & Nom</label>
              <input placeholder="Marie Dupont" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="marie@exemple.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-field">
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <button className="btn-primary" onClick={handleSubmit} style={{ marginTop: 4 }}>
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
          <div className="auth-switch">
            {mode === "login" ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
              {mode === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(""), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const pages = {
    home: <Home setPage={setPage} setSelectedHotel={setSelectedHotel} />,
    search: <Search setPage={setPage} setSelectedHotel={setSelectedHotel} />,
    detail: <HotelDetail hotel={selectedHotel} setPage={setPage} setToast={setToast} />,
    booking: <Booking setPage={setPage} setToast={setToast} />,
    confirmation: <Confirmation setPage={setPage} />,
    dashboard: <Dashboard setPage={setPage} />,
    auth: <Auth setPage={setPage} setToast={setToast} />,
  };

  return (
    <AuthProvider>
      <BookingProvider>
        <style>{css}</style>
        <Nav page={page} setPage={setPage} />
        {pages[page] || pages.home}
        <Toast msg={toast} />
      </BookingProvider>
    </AuthProvider>
  );
}