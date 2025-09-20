
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'ಕನ್ನಡ' }, // Kannada
  { code: 'ml', name: 'മലയാളം' }, // Malayalam
  { code: 'ta', name: 'தமிழ்' }, // Tamil
  { code: 'hi', name: 'हिन्दी' }, // Hindi
];

export const workTypes = [
  { id: 'harvesting', label: 'Harvesting' },
  { id: 'weeding', label: 'Weeding' },
  { id: 'irrigation', label: 'Irrigation' },
  { id: 'pesticide-spraying', label: 'Pesticide Spraying' },
  { id: 'planting', label: 'Planting' },
  { id: 'ploughing', label: 'Ploughing' },
  { id: 'livestock-care', label: 'Livestock Care' },
];

export const districts = [
    { value: 'bengaluru-urban', label: 'Bengaluru Urban' },
    { value: 'mysuru', label: 'Mysuru' },
    { value: 'mangaluru', label: 'Mangaluru' },
    { value: 'belagavi', label: 'Belagavi' },
    { value: 'kochi', label: 'Kochi' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'mumbai', label: 'Mumbai' },
];


export const mockProfile = {
  name: "Sunita Kumari",
  phone: "+91 •••••••123",
  location: "Mysuru",
  skills: ["Weeding", "Harvesting"],
  wage: "₹500 / day",
  availability: [new Date(2024, 7, 20), new Date(2024, 7, 22), new Date(2024, 7, 23)],
  rating: 4.5,
};

