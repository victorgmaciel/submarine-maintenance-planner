export const divisions = [
  "A-Div",
  "E-Div",
  "M-Div",
  "R-Div",
  "Nav-Div",
  "Ops-Div",
];

export const resources = [
  "hydraulics",
  "electrical",
  "air",
  "reactor",
  "weapons",
];

export const divisionColors = {
  "A-Div": {
    bg: "bg-orange-500/20",
    border: "border-orange-500/50",
    text: "text-orange-400",
    bar: "bg-orange-500",
  },
  "E-Div": {
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/50",
    text: "text-yellow-400",
    bar: "bg-yellow-500",
  },
  "M-Div": {
    bg: "bg-red-500/20",
    border: "border-red-500/50",
    text: "text-red-400",
    bar: "bg-red-500",
  },
  "R-Div": {
    bg: "bg-green-500/20",
    border: "border-green-500/50",
    text: "text-green-400",
    bar: "bg-green-500",
  },
  "Nav-Div": {
    bg: "bg-blue-500/20",
    border: "border-blue-500/50",
    text: "text-blue-400",
    bar: "bg-blue-500",
  },
  "Ops-Div": {
    bg: "bg-purple-500/20",
    border: "border-purple-500/50",
    text: "text-purple-400",
    bar: "bg-purple-500",
  },
};

// Vessels moored at Naval Submarine Base New London — Pier 1 & 2
export const vessels = [
  { id: "ssn774", name: "USS Virginia",       hull: "SSN-774", type: "Fast Attack Submarine",  pier: "Pier 1 · Berth A", status: "In Port" },
  { id: "ssn775", name: "USS Texas",          hull: "SSN-775", type: "Fast Attack Submarine",  pier: "Pier 1 · Berth B", status: "In Port" },
  { id: "ssn776", name: "USS Hawaii",         hull: "SSN-776", type: "Fast Attack Submarine",  pier: "Pier 1 · Berth C", status: "In Port" },
  { id: "ssn777", name: "USS North Carolina", hull: "SSN-777", type: "Fast Attack Submarine",  pier: "Pier 2 · Berth A", status: "Underway" },
  { id: "ssn778", name: "USS New Hampshire",  hull: "SSN-778", type: "Fast Attack Submarine",  pier: "Pier 2 · Berth B", status: "In Port" },
  { id: "as39",   name: "USS Emory S. Land",  hull: "AS-39",   type: "Submarine Tender",       pier: "Pier 2 · Berth C", status: "In Port" },
];

export const dailyWatchInfo = {
  1: { ood: "LTJG Anderson", cob: "ETCSS Martinez", section: "1" },
  2: { ood: "LT Chen", cob: "MMCSS Johnson", section: "2" },
  3: { ood: "LTJG Anderson", cob: "FTCSS Williams", section: "3" },
  4: { ood: "LT Rodriguez", cob: "ETCSS Martinez", section: "4" },
  5: { ood: "LTJG Anderson", cob: "MMCSS Johnson", section: "1" },
  6: { ood: "LT Chen", cob: "FTCSS Williams", section: "2" },
  7: { ood: "LTJG Anderson", cob: "ETCSS Martinez", section: "3" },
};
