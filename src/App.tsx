const hotel = [
  {
    id: 1,
    name: "Teranga Palace",
    city: "Dakar",
    country: "Sénégal",
    stars: 5,
    rating: 4.9,
    reviews: 342,
    price: 185000,
    oldPrice: 220000,
    currency: "FCFA",

    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    ],

    description:
      "Situé au cœur de Dakar avec une vue magnifique sur l’océan Atlantique, Teranga Palace offre une expérience luxueuse mêlant confort moderne et hospitalité sénégalaise.",

    amenities: [
      "WiFi",
      "Piscine",
      "Restaurant",
      "Bar",
      "Parking",
      "Salle sport",
      "Vue mer"
    ],

    rooms: [
      {
        id: 1,
        name: "Chambre Standard",
        price: 185000,
        capacity: 2,
        size: 28,
        beds: "1 lit King",
        currenccy: "FCFA"
      },

      {
        id: 2,
        name: "Suite Prestige",
        price: 320000,
        capacity: 4,
        size: 60,
        beds: "2 lits King",
        currency: "FCFA"
      }
    ],

    category: "Luxe",
    available: true,
  },

  {
    id: 2,
    name: "Résidence Almadies",
    city: "Dakar",
    country: "Sénégal",

    stars: 4,
    rating: 4.7,
    reviews: 210,

    price: 95000,
    oldPrice: 120000,
    currency: "FCFA",

    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    ],

    description:
      "Un hôtel moderne situé aux Almadies, proche des plages, restaurants et lieux de divertissement de Dakar.",

    amenities: [
      "WiFi",
      "Piscine",
      "Restaurant",
      "Bar",
      "Parking"
    ],

    rooms: [
      {
        id: 1,
        name: "Chambre Confort",
        price: 95000,
        capacity: 2,
        size: 24,
        beds: "1 lit Queen",
        cccurrency:  "FCFA"
      }
    ],

    category: "Balnéaire",
    available: true,
  },

  {
    id: 3,
    name: "Baobab Lodge",
    city: "Saly",
    country: "Sénégal",

    stars: 4,
    rating: 4.8,
    reviews: 156,

    price: 120000,
    oldPrice: 150000,
    currency : "FCFA",

    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800&q=80",
    ],

    description:
      "Un cadre paisible à Saly avec piscine, jardins tropicaux et accès rapide à la plage.",

    amenities: [
      "WiFi",
      "Piscine",
      "Restaurant",
      "Jardins",
      "Plage"
    ],

    rooms: [
      {
        id: 1,
        name: "Suite Tropicale",
        price: 120000,
        capacity: 3,
        size: 40,
        beds: "1 lit King",
        currency : "FCFA"
      }
    ],

    category: "Balnéaire",
    available: true,
  }
];