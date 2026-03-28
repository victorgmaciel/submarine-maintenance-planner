// Daily rotating meal schedule — cycles every 7 days
export const mealSchedule = [
  { cs: "CS1 Ramirez",   breakfast: "Scrambled Eggs, Bacon, Hash Browns",   lunch: "Grilled Chicken Sandwich, Fries",  dinner: "Prime Rib, Mashed Potatoes, Green Beans" },
  { cs: "CS2 Nguyen",    breakfast: "Pancakes, Sausage Links, OJ",           lunch: "Beef Tacos, Rice, Pinto Beans",    dinner: "Baked Salmon, Roasted Vegetables" },
  { cs: "CS1 Ramirez",   breakfast: "French Toast, Turkey Sausage",          lunch: "Chicken Caesar Wrap, Soup",        dinner: "Spaghetti Bolognese, Garlic Bread" },
  { cs: "CS3 Okafor",    breakfast: "Oatmeal, Boiled Eggs, Fruit",           lunch: "Philly Cheesesteak, Chips",        dinner: "BBQ Pork Ribs, Corn on the Cob" },
  { cs: "CS2 Nguyen",    breakfast: "Biscuits & Gravy, Fried Eggs",          lunch: "BLT Club Sandwich, Potato Salad", dinner: "Beef Stew, Cornbread" },
  { cs: "CSS Williams",  breakfast: "Waffles, Fresh Berries",                lunch: "Pepperoni Pizza, Garden Salad",    dinner: "Grilled Shrimp, Lemon Rice" },
  { cs: "CS3 Okafor",    breakfast: "Cinnamon Rolls, Coffee Cake",           lunch: "Cheeseburger, Sweet Potato Fries", dinner: "Roasted Chicken, Stuffing, Gravy" },
];

// Daily message of the day — cycles every 7 days
export const messageOfTheDay = [
  "Maintain readiness at all stations. XO inspection at 1400.",
  "All hands: divisional training commences 0800. Attendance mandatory.",
  "Watch rotation updated. See posted schedule in the crews mess.",
  "Safety stand-down 1000–1100. All work halted, division attendance required.",
  "CO message: well done on last week's drill scores. Keep the standard.",
  "Departmental PMS review 0900. Chiefs muster in wardroom.",
  "Underway preparations begin at 0600. Topside watch set at 0530.",
];

// Rotating sea/operational conditions
export const seaConditions = [
  { state: "In Port", depth: "Pierside", speed: "0 kts", visibility: "10+ nm", windSpeed: "8 kts", waveHeight: "1 ft" },
  { state: "Submerged", depth: "400 ft", speed: "12 kts", visibility: "N/A", windSpeed: "N/A", waveHeight: "N/A" },
  { state: "Periscope Depth", depth: "60 ft", speed: "6 kts", visibility: "8 nm", windSpeed: "15 kts", waveHeight: "3 ft" },
  { state: "In Port", depth: "Pierside", speed: "0 kts", visibility: "10+ nm", windSpeed: "5 kts", waveHeight: "1 ft" },
  { state: "Transiting", depth: "Surface", speed: "18 kts", visibility: "9 nm", windSpeed: "22 kts", waveHeight: "6 ft" },
  { state: "Submerged", depth: "600 ft", speed: "20 kts", visibility: "N/A", windSpeed: "N/A", waveHeight: "N/A" },
  { state: "In Port", depth: "Pierside", speed: "0 kts", visibility: "10+ nm", windSpeed: "10 kts", waveHeight: "1 ft" },
];
