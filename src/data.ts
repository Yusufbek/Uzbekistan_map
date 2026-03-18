export const regionData = [
  { id: "Tashkent city", pageViews: 15420, meetings: 342, coordinates: [69.2401, 41.2995] },
  { id: "Namangan region", pageViews: 4200, meetings: 85, coordinates: [71.6726, 41.0011] },
  { id: "Tashkent region", pageViews: 8300, meetings: 150, coordinates: [69.5883, 41.1189] },
  { id: "Andijan region", pageViews: 5100, meetings: 92, coordinates: [72.3325, 40.7821] },
  { id: "Fergana region", pageViews: 6200, meetings: 110, coordinates: [71.7323, 40.3864] },
  { id: "Syrdarya region", pageViews: 2100, meetings: 45, coordinates: [68.7812, 40.4915] },
  { id: "Jizzakh region", pageViews: 2800, meetings: 55, coordinates: [67.8280, 40.1158] },
  { id: "Samarkand region", pageViews: 9500, meetings: 180, coordinates: [66.9746, 39.6270] },
  { id: "Kashkadarya province", pageViews: 4800, meetings: 75, coordinates: [65.7923, 38.8612] },
  { id: "Surkhandarya region", pageViews: 3900, meetings: 60, coordinates: [67.2772, 37.9409] },
  { id: "Navoi region", pageViews: 3200, meetings: 50, coordinates: [64.3792, 41.9722] },
  { id: "Bukhara region", pageViews: 6800, meetings: 130, coordinates: [64.4286, 39.7747] },
  { id: "Khorezm region", pageViews: 4500, meetings: 80, coordinates: [60.6249, 41.3565] },
  { id: "Republic of Karakalpakstan", pageViews: 3500, meetings: 40, coordinates: [59.0395, 43.8041] },
];

export const getRegionData = (regionName: string) => {
  return regionData.find((r) => r.id === regionName) || { pageViews: 0, meetings: 0 };
};
