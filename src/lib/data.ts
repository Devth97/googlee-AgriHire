
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

export const mockJobs = [
    {
      id: '1',
      title: 'Harvesting Tomatoes',
      location: 'Mysuru',
      date: new Date(2024, 8, 15).toISOString(),
      workersNeeded: 5,
      workType: ['Harvesting'],
      status: 'Open',
      farmer: { name: 'Ramesh Kumar', avatarUrl: 'https://picsum.photos/seed/f1/40/40' },
      description: 'Harvesting ripe tomatoes from the field. Experience preferred but not required.'
    },
    {
      id: '2',
      title: 'Weeding and Irrigation',
      location: 'Bengaluru Urban',
      date: new Date(2024, 8, 18).toISOString(),
      workersNeeded: 3,
      workType: ['Weeding', 'Irrigation'],
      status: 'Open',
      farmer: { name: 'Sita Devi', avatarUrl: 'https://picsum.photos/seed/f2/40/40' },
       description: 'General farm maintenance including weeding and managing irrigation channels.'
    },
    {
      id: '3',
      title: 'Planting new seedlings',
      location: 'Mangaluru',
      date: new Date(2024, 8, 20).toISOString(),
      workersNeeded: 10,
      workType: ['Planting'],
      status: 'Confirmed',
      farmer: { name: 'Arjun Reddy', avatarUrl: 'https://picsum.photos/seed/f3/40/40' },
       description: 'Planting rice seedlings in the paddy field. This is a large-scale planting operation.'
    },
      {
      id: '4',
      title: 'Pesticide Spraying',
      location: 'Belagavi',
      date: new Date(2024, 8, 22).toISOString(),
      workersNeeded: 2,
      workType: ['Pesticide Spraying'],
      status: 'Completed',
      farmer: { name: 'Priya Patel', avatarUrl: 'https://picsum.photos/seed/f4/40/40' },
       description: 'Urgent need for workers to spray pesticides. Safety gear will be provided.'
    },
    {
      id: '5',
      title: 'Livestock Care',
      location: 'Kochi',
      date: new Date(2024, 8, 25).toISOString(),
      workersNeeded: 1,
      workType: ['Livestock Care'],
      status: 'Open',
      farmer: { name: 'Vikram Singh', avatarUrl: 'https://picsum.photos/seed/f5/40/40' },
      description: 'Looking for someone to help with feeding and caring for cattle for a day.'
    },
     {
      id: '6',
      title: 'Ploughing Fields',
      location: 'Chennai',
      date: new Date(2024, 9, 1).toISOString(),
      workersNeeded: 2,
      workType: ['Ploughing'],
      status: 'Open',
      farmer: { name: 'Anjali Rao', avatarUrl: 'https://picsum.photos/seed/f6/40/40' },
      description: 'Need two strong workers to help with ploughing the field before the next crop cycle.'
    }
];

