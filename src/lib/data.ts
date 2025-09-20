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

export const mockJobs = [
  {
    id: '1',
    title: 'Urgent: Tomato Harvesting',
    location: 'Bengaluru Urban',
    date: '2024-08-15',
    workersNeeded: 10,
    workType: ['Harvesting'],
    status: 'Open',
    farmer: { name: 'Ramesh', avatarUrl: 'https://picsum.photos/seed/f1/40/40' },
  },
  {
    id: '2',
    title: 'Weeding for Paddy Fields',
    location: 'Mysuru',
    date: '2024-08-20',
    workersNeeded: 5,
    workType: ['Weeding'],
    status: 'Open',
    farmer: { name: 'Sita', avatarUrl: 'https://picsum.photos/seed/f2/40/40' },
  },
  {
    id: '3',
    title: 'Planting Season Prep',
    location: 'Kochi',
    date: '2024-09-01',
    workersNeeded: 20,
    workType: ['Planting', 'Ploughing'],
    status: 'Confirmed',
    farmer: { name: 'Mani', avatarUrl: 'https://picsum.photos/seed/f3/40/40' },
  },
    {
    id: '4',
    title: 'Mango Orchard Irrigation',
    location: 'Chennai',
    date: '2024-08-18',
    workersNeeded: 3,
    workType: ['Irrigation'],
    status: 'Completed',
    farmer: { name: 'Anand', avatarUrl: 'https://picsum.photos/seed/f4/40/40' },
  },
];

export const mockFarmerJobs = mockJobs.slice(0, 2);
export const mockWorkerRequests = mockJobs.slice(1, 3);
export const mockWorkerConfirmedJobs = mockJobs.slice(3, 4);

export const mockProfile = {
  name: "Sunita Kumari",
  phone: "+91 •••••••123",
  location: "Mysuru",
  skills: ["Weeding", "Harvesting"],
  wage: "₹500 / day",
  availability: [new Date(2024, 7, 20), new Date(2024, 7, 22), new Date(2024, 7, 23)],
  rating: 4.5,
};
