export const hotels = [
  {
    id: 1,
    name: "Xasil Beach Hotel",
    city: "Muqdisho",
    district: "Wadajir",
    rating: 4.7,
    reviews: 128,
    pricePerNight: 85,
    currency: "USD",

    images: [
      "/images/hotels/hotel-1-main.jpg",
      "/images/hotels/hotel-1-room.jpg",
      "/images/hotels/hotel-1-pool.jpg",
      "/images/hotels/hotel-1-lobby.jpg",
      "/images/hotels/hotel-1-restaurant.jpg",
      "/images/hotels/hotel-1-spa.jpg",
      "/images/hotels/hotel-1-gym.jpg",
      "/images/hotels/hotel-1-breakfast.jpg",
    ],

    facilities: [
      "Spa & fitness center",
      "Room service",
      "Outdoor swimming pool",
      "Garden",
      "Restaurant",
      "Airport shuttle",
      "Terrace",
      "24-hour front desk",
      "Air conditioning",
      "Excellent breakfast",
    ],

    description:
      "A comfortable modern stay with premium facilities, convenient access, and professional guest service.",

    roomTypes: [
      {
        name: "Standard Room",
        price: 85,
        guests: 2,
        beds: "1 Queen Bed",
      },
      {
        name: "Deluxe Room",
        price: 110,
        guests: 2,
        beds: "1 King Bed",
      },
      {
        name: "Family Suite",
        price: 150,
        guests: 4,
        beds: "2 Queen Beds",
      },
    ],
  },
];