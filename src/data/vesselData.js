// Per-vessel maintenance tasks and watch bill data.
// Each vessel has independent sailors, tasks, and watchstanding rotations.

export const vesselData = {
  ssn774: {
    watchInfo: {
      1: { ood: "LTJG Anderson",  cob: "ETCSS Martinez",  section: "1" },
      2: { ood: "LT Chen",        cob: "MMCSS Johnson",   section: "2" },
      3: { ood: "LTJG Anderson",  cob: "FTCSS Williams",  section: "3" },
      4: { ood: "LT Rodriguez",   cob: "ETCSS Martinez",  section: "4" },
      5: { ood: "LTJG Anderson",  cob: "MMCSS Johnson",   section: "1" },
      6: { ood: "LT Chen",        cob: "FTCSS Williams",  section: "2" },
      7: { ood: "LTJG Anderson",  cob: "ETCSS Martinez",  section: "3" },
    },
    tasks: [
      { id: 1, name: "Main Hydraulic System Overhaul",      startDay: 2, duration: 5, requirements: { hydraulics: "shutdown", electrical: "available", crew: 4 }, system: "Hydraulics",       division: "A-Div",   createdBy: "MM2 Jones",      status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 2, name: "Stern Plane Actuator Maintenance",    startDay: 3, duration: 3, requirements: { hydraulics: "required", electrical: "available", crew: 2 }, system: "Control Surfaces", division: "A-Div",   createdBy: "MM2 Jones",      status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 3, name: "Emergency Blow System Test",          startDay: 8, duration: 2, requirements: { hydraulics: "required", air: "required", crew: 3 },          system: "Ballast",          division: "A-Div",   createdBy: "MM2 Jones",      status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 4, name: "Main Battery Cell Replacement",       startDay: 1, duration: 7, requirements: { electrical: "shutdown", crew: 5 },                           system: "Electrical",       division: "E-Div",   createdBy: "ET1 Smith",      status: "in-progress", priority: "urgent",  dependsOn: [], parts: [] },
      { id: 5, name: "Torpedo Tube Door Seal Replacement",  startDay: 5, duration: 4, requirements: { weapons: "shutdown", hydraulics: "available", crew: 3 },     system: "Weapons",          division: "M-Div",   createdBy: "FT3 Davis",      status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 6, name: "Reactor Coolant Pump Inspection",     startDay: 1, duration: 5, requirements: { reactor: "shutdown", electrical: "available", crew: 6 },     system: "Reactor",          division: "R-Div",   createdBy: "EM1 Thompson",   status: "in-progress", priority: "urgent",  dependsOn: [], parts: [] },
      { id: 7, name: "Sonar Array Calibration",             startDay: 1, duration: 3, requirements: { electrical: "required", crew: 2 },                           system: "Sonar",            division: "Ops-Div", createdBy: "ST2 Rodriguez",  status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
    ],
  },

  ssn775: {
    watchInfo: {
      1: { ood: "LT Morrison",    cob: "MMCSS Patel",    section: "2" },
      2: { ood: "LTJG Kim",       cob: "ETCSS Harper",   section: "3" },
      3: { ood: "LT Morrison",    cob: "MMCSS Patel",    section: "1" },
      4: { ood: "LTJG Kim",       cob: "FTCSS Nguyen",   section: "2" },
      5: { ood: "LT Morrison",    cob: "ETCSS Harper",   section: "3" },
      6: { ood: "LTJG Kim",       cob: "MMCSS Patel",    section: "1" },
      7: { ood: "LT Morrison",    cob: "FTCSS Nguyen",   section: "2" },
    },
    tasks: [
      { id: 101, name: "Periscope #1 Hydraulic Seal Repack",     startDay: 1, duration: 3, requirements: { hydraulics: "available", crew: 2 },                          system: "Control Surfaces", division: "A-Div",   createdBy: "MM1 Carter",   status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 102, name: "AN/BPS-16 Radar Calibration",            startDay: 2, duration: 2, requirements: { electrical: "required", crew: 2 },                           system: "Sonar",            division: "Ops-Div", createdBy: "ST1 Lee",      status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 103, name: "Emergency Diesel Generator Load Test",    startDay: 4, duration: 3, requirements: { electrical: "shutdown", reactor: "available", crew: 4 },     system: "Electrical",       division: "E-Div",   createdBy: "EM2 Walsh",    status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 104, name: "Torpedo Handling System Lubrication",     startDay: 1, duration: 2, requirements: { weapons: "available", crew: 2 },                             system: "Weapons",          division: "M-Div",   createdBy: "FT2 Brooks",   status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 105, name: "Main Ballast Tank #3 Inspection",         startDay: 6, duration: 4, requirements: { air: "shutdown", crew: 3 },                                  system: "Ballast",          division: "A-Div",   createdBy: "MM1 Carter",   status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 106, name: "S9G Reactor Annunciator Panel Test",      startDay: 3, duration: 2, requirements: { reactor: "required", electrical: "available", crew: 3 },     system: "Reactor",          division: "R-Div",   createdBy: "EM1 Bishop",   status: "in-progress", priority: "routine", dependsOn: [], parts: [] },
    ],
  },

  ssn776: {
    watchInfo: {
      1: { ood: "LTJG Reyes",     cob: "MMCSS Torres",   section: "1" },
      2: { ood: "LT Nakamura",    cob: "ETCSS Banks",    section: "2" },
      3: { ood: "LTJG Reyes",     cob: "FTCSS Coleman",  section: "3" },
      4: { ood: "LT Nakamura",    cob: "MMCSS Torres",   section: "4" },
      5: { ood: "LTJG Reyes",     cob: "ETCSS Banks",    section: "1" },
      6: { ood: "LT Nakamura",    cob: "FTCSS Coleman",  section: "2" },
      7: { ood: "LTJG Reyes",     cob: "MMCSS Torres",   section: "3" },
    },
    tasks: [
      { id: 201, name: "Propulsion Shaft Seal Replacement",      startDay: 1, duration: 6, requirements: { reactor: "shutdown", hydraulics: "available", crew: 5 },     system: "Reactor",          division: "R-Div",   createdBy: "MM1 Osei",     status: "in-progress", priority: "urgent",  dependsOn: [], parts: [] },
      { id: 202, name: "Fairwater Plane Control System Test",    startDay: 2, duration: 2, requirements: { hydraulics: "required", crew: 2 },                           system: "Control Surfaces", division: "A-Div",   createdBy: "MM2 Fields",   status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 203, name: "BQQ-10 Sonar Dome Hull Valve PM",        startDay: 5, duration: 3, requirements: { electrical: "required", crew: 3 },                           system: "Sonar",            division: "Ops-Div", createdBy: "ST1 Park",     status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 204, name: "Battery Well Ventilation Service",        startDay: 1, duration: 4, requirements: { electrical: "shutdown", crew: 4 },                           system: "Electrical",       division: "E-Div",   createdBy: "EM1 Jenkins",  status: "deferred",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 205, name: "High Pressure Air Bank Recharge",        startDay: 8, duration: 2, requirements: { air: "required", crew: 2 },                                   system: "Ballast",          division: "A-Div",   createdBy: "MM3 Dunn",     status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
    ],
  },

  ssn777: {
    // Underway — operational monitoring tasks only
    watchInfo: {
      1: { ood: "LT Castellano",  cob: "ETCSS Murray",   section: "3" },
      2: { ood: "LT Castellano",  cob: "MMCSS Quinn",    section: "1" },
      3: { ood: "LT Castellano",  cob: "FTCSS Adams",    section: "2" },
      4: { ood: "LT Castellano",  cob: "ETCSS Murray",   section: "3" },
      5: { ood: "LT Castellano",  cob: "MMCSS Quinn",    section: "1" },
      6: { ood: "LT Castellano",  cob: "FTCSS Adams",    section: "2" },
      7: { ood: "LT Castellano",  cob: "ETCSS Murray",   section: "3" },
    },
    tasks: [
      { id: 301, name: "Underway Reactor Plant Monitoring",      startDay: 1, duration: 30, requirements: { reactor: "required", crew: 6 },                             system: "Reactor",          division: "R-Div",   createdBy: "EM1 Russo",    status: "in-progress", priority: "routine", dependsOn: [], parts: [] },
      { id: 302, name: "Underway Navigation System Alignment",   startDay: 3, duration: 2,  requirements: { electrical: "available", crew: 2 },                         system: "Sonar",            division: "Nav-Div", createdBy: "QM2 Hall",     status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 303, name: "Weapons Inventory & Safety Check",       startDay: 2, duration: 1,  requirements: { weapons: "required", crew: 3 },                             system: "Weapons",          division: "M-Div",   createdBy: "FT1 Bass",     status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
    ],
  },

  ssn778: {
    watchInfo: {
      1: { ood: "LTJG Flores",    cob: "MMCSS Grant",    section: "4" },
      2: { ood: "LT Yamamoto",    cob: "ETCSS Simmons",  section: "1" },
      3: { ood: "LTJG Flores",    cob: "FTCSS Price",    section: "2" },
      4: { ood: "LT Yamamoto",    cob: "MMCSS Grant",    section: "3" },
      5: { ood: "LTJG Flores",    cob: "ETCSS Simmons",  section: "4" },
      6: { ood: "LT Yamamoto",    cob: "FTCSS Price",    section: "1" },
      7: { ood: "LTJG Flores",    cob: "MMCSS Grant",    section: "2" },
    },
    tasks: [
      { id: 401, name: "MK 48 ADCAP Weapon Offload",             startDay: 1, duration: 3, requirements: { weapons: "shutdown", crew: 5 },                              system: "Weapons",          division: "M-Div",   createdBy: "FT1 Sandoval", status: "scheduled", priority: "emergency", dependsOn: [], parts: [] },
      { id: 402, name: "Emergency Diesel #2 Overhaul",           startDay: 2, duration: 8, requirements: { electrical: "available", crew: 4 },                          system: "Electrical",       division: "E-Div",   createdBy: "EM2 Cruz",     status: "in-progress", priority: "urgent",  dependsOn: [], parts: [] },
      { id: 403, name: "Anchor & Mooring Equipment Inspection",  startDay: 4, duration: 2, requirements: { crew: 3 },                                                    system: "General",          division: "A-Div",   createdBy: "BM1 Hayes",    status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 404, name: "Ship's Inertial Navigation System PM",   startDay: 1, duration: 2, requirements: { electrical: "required", crew: 2 },                           system: "Sonar",            division: "Nav-Div", createdBy: "QM1 Ford",     status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 405, name: "Hydraulic Power Unit Preventive Maint.", startDay: 7, duration: 3, requirements: { hydraulics: "shutdown", crew: 3 },                           system: "Hydraulics",       division: "A-Div",   createdBy: "MM3 Stone",    status: "deferred",  priority: "routine",   dependsOn: [], parts: [] },
    ],
  },

  as39: {
    watchInfo: {
      1: { ood: "LT Kowalski",    cob: "MMCSS Diaz",     section: "1" },
      2: { ood: "LTJG Webb",      cob: "ETCSS Hoover",   section: "2" },
      3: { ood: "LT Kowalski",    cob: "MMCSS Diaz",     section: "3" },
      4: { ood: "LTJG Webb",      cob: "FTCSS Lawson",   section: "1" },
      5: { ood: "LT Kowalski",    cob: "ETCSS Hoover",   section: "2" },
      6: { ood: "LTJG Webb",      cob: "MMCSS Diaz",     section: "3" },
      7: { ood: "LT Kowalski",    cob: "FTCSS Lawson",   section: "1" },
    },
    tasks: [
      { id: 501, name: "Submarine Support Crane #1 Load Test",   startDay: 1, duration: 2, requirements: { hydraulics: "required", electrical: "required", crew: 4 },   system: "Hydraulics",       division: "A-Div",   createdBy: "BM1 Fischer",  status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 502, name: "Shore Power Distribution Panel PM",      startDay: 3, duration: 3, requirements: { electrical: "shutdown", crew: 5 },                           system: "Electrical",       division: "E-Div",   createdBy: "EM1 Boyd",     status: "in-progress", priority: "urgent",  dependsOn: [], parts: [] },
      { id: 503, name: "Machine Shop Lathe & Mill Calibration",  startDay: 1, duration: 1, requirements: { crew: 2 },                                                    system: "General",          division: "M-Div",   createdBy: "MR2 Vega",     status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 504, name: "Fresh Water Evaporator Maintenance",     startDay: 5, duration: 4, requirements: { electrical: "available", crew: 3 },                          system: "General",          division: "A-Div",   createdBy: "BT2 Owens",    status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
      { id: 505, name: "Dive Locker Equipment Inspection",       startDay: 2, duration: 2, requirements: { crew: 2 },                                                    system: "General",          division: "Ops-Div", createdBy: "ND1 Marsh",    status: "complete",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 506, name: "Weapons Magazine Inventory & Audit",     startDay: 4, duration: 3, requirements: { weapons: "required", crew: 3 },                              system: "Weapons",          division: "M-Div",   createdBy: "GM2 Fuller",   status: "scheduled", priority: "routine",   dependsOn: [], parts: [] },
    ],
  },
};
