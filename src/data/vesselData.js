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
      { id: 1, name: "Main Hydraulic System Overhaul", startDay: 2, duration: 5, requirements: { hydraulics: "shutdown", electrical: "available", crew: 4 }, system: "Hydraulics", division: "A-Div", createdBy: "MM2 Jones", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "O-Ring Seal Kit, Hydraulic",           nsn: "4820-01-234-5671", qty: 4,  unit: "KT" },
        { name: "Hydraulic Pump Packing Set",           nsn: "5330-01-456-7892", qty: 2,  unit: "ST" },
        { name: "HP Hydraulic Hose Assembly, 3/4 in",   nsn: "4720-01-123-4561", qty: 1,  unit: "EA" },
        { name: "Hydraulic Fluid MIL-PRF-17672E",       nsn: "9150-01-087-3682", qty: 5,  unit: "GL" },
      ]},
      { id: 2, name: "Stern Plane Actuator Maintenance", startDay: 3, duration: 3, requirements: { hydraulics: "required", electrical: "available", crew: 2 }, system: "Control Surfaces", division: "A-Div", createdBy: "MM2 Jones", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "Actuator Seal Kit",                    nsn: "4820-01-345-6783", qty: 1,  unit: "KT" },
        { name: "Grease Cartridge MIL-PRF-23827",       nsn: "9150-00-935-4267", qty: 2,  unit: "EA" },
        { name: "Cotter Pin, Stainless, 1/8 x 1 in",   nsn: "5315-00-082-2689", qty: 24, unit: "EA" },
      ]},
      { id: 3, name: "Emergency Blow System Test", startDay: 8, duration: 2, requirements: { hydraulics: "required", air: "required", crew: 3 }, system: "Ballast", division: "A-Div", createdBy: "MM2 Jones", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "HP Air Blow Valve O-Ring Kit",         nsn: "4820-01-567-8904", qty: 1,  unit: "KT" },
        { name: "Pressure Gauge Assembly, 0-5000 PSI",  nsn: "6685-01-234-5671", qty: 1,  unit: "EA" },
        { name: "Teflon Thread Sealant Tape",           nsn: "8030-00-889-3534", qty: 3,  unit: "RL" },
      ]},
      { id: 4, name: "Main Battery Cell Replacement", startDay: 1, duration: 7, requirements: { electrical: "shutdown", crew: 5 }, system: "Electrical", division: "E-Div", createdBy: "ET1 Smith", status: "in-progress", priority: "urgent", dependsOn: [], parts: [
        { name: "Lead-Acid Battery Cell, 2V/1800Ah",    nsn: "6140-01-456-7893", qty: 8,  unit: "EA" },
        { name: "Battery Terminal Connector Kit",       nsn: "5940-01-234-5672", qty: 2,  unit: "KT" },
        { name: "Sulfuric Acid Electrolyte, Battery",   nsn: "6850-00-264-6618", qty: 4,  unit: "GL" },
        { name: "Battery Hold-Down Hardware Kit",       nsn: "5340-01-678-9012", qty: 1,  unit: "KT" },
        { name: "Neoprene Cell Insulator Sheet",        nsn: "5970-01-112-3445", qty: 16, unit: "EA" },
      ]},
      { id: 5, name: "Torpedo Tube Door Seal Replacement", startDay: 5, duration: 4, requirements: { weapons: "shutdown", hydraulics: "available", crew: 3 }, system: "Weapons", division: "M-Div", createdBy: "FT3 Davis", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "Torpedo Tube Breech Door Seal",        nsn: "5330-01-789-0123", qty: 2,  unit: "EA" },
        { name: "Hydraulic Actuator O-Ring Set",        nsn: "4820-01-890-1234", qty: 1,  unit: "ST" },
        { name: "Hex Cap Screw, SST, 1/2-13 x 2",      nsn: "5306-01-234-5682", qty: 24, unit: "EA" },
        { name: "Anti-Seize Compound, Nickel",          nsn: "8030-01-245-0738", qty: 1,  unit: "CN" },
      ]},
      { id: 6, name: "Reactor Coolant Pump Inspection", startDay: 1, duration: 5, requirements: { reactor: "shutdown", electrical: "available", crew: 6 }, system: "Reactor", division: "R-Div", createdBy: "EM1 Thompson", status: "in-progress", priority: "urgent", dependsOn: [], parts: [
        { name: "RCP Mechanical Seal Assembly",         nsn: "4210-01-234-5683", qty: 1,  unit: "EA" },
        { name: "Pump Bearing Set, Angular Contact",    nsn: "3110-01-456-7895", qty: 1,  unit: "ST" },
        { name: "Coolant Pump Gasket Kit",              nsn: "5330-01-567-8906", qty: 1,  unit: "KT" },
        { name: "Reactor Coolant Water, Demin.",        nsn: "6810-01-098-7654", qty: 10, unit: "GL" },
      ]},
      { id: 7, name: "Sonar Array Calibration", startDay: 1, duration: 3, requirements: { electrical: "required", crew: 2 }, system: "Sonar", division: "Ops-Div", createdBy: "ST2 Rodriguez", status: "done", priority: "routine", dependsOn: [], parts: [] },
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
      { id: 101, name: "Periscope #1 Hydraulic Seal Repack",     startDay: 1, duration: 3, requirements: { hydraulics: "available", crew: 2 },                          system: "Control Surfaces", division: "A-Div",   createdBy: "MM1 Carter",   status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 102, name: "AN/BPS-16 Radar Calibration",            startDay: 2, duration: 2, requirements: { electrical: "required", crew: 2 },                           system: "Sonar",            division: "Ops-Div", createdBy: "ST1 Lee",      status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 103, name: "Emergency Diesel Generator Load Test", startDay: 4, duration: 3, requirements: { electrical: "shutdown", reactor: "available", crew: 4 }, system: "Electrical", division: "E-Div", createdBy: "EM2 Walsh", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "EDG Fuel Filter Element",              nsn: "2940-01-345-6784", qty: 2,  unit: "EA" },
        { name: "EDG Oil Filter, Spin-On",              nsn: "2940-01-234-5673", qty: 2,  unit: "EA" },
        { name: "Engine Coolant, 50/50 Premix",         nsn: "6850-01-389-4098", qty: 3,  unit: "GL" },
        { name: "Load Bank Connector Cable Assy",       nsn: "6145-01-456-7894", qty: 1,  unit: "EA" },
      ]},
      { id: 104, name: "Torpedo Handling System Lubrication", startDay: 1, duration: 2, requirements: { weapons: "available", crew: 2 }, system: "Weapons", division: "M-Div", createdBy: "FT2 Brooks", status: "done", priority: "routine", dependsOn: [], parts: [] },
      { id: 105, name: "Main Ballast Tank #3 Inspection", startDay: 6, duration: 4, requirements: { air: "shutdown", crew: 3 }, system: "Ballast", division: "A-Div", createdBy: "MM1 Carter", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "MBT Flood Valve Seat Seal",            nsn: "4820-01-678-9013", qty: 4,  unit: "EA" },
        { name: "Zinc Anode, MBT Hull",                 nsn: "9925-01-234-5674", qty: 6,  unit: "EA" },
        { name: "Underwater Epoxy Coating Kit",         nsn: "8010-01-456-7896", qty: 2,  unit: "KT" },
      ]},
      { id: 106, name: "S9G Reactor Annunciator Panel Test", startDay: 3, duration: 2, requirements: { reactor: "required", electrical: "available", crew: 3 }, system: "Reactor", division: "R-Div", createdBy: "EM1 Bishop", status: "in-progress", priority: "routine", dependsOn: [], parts: [
        { name: "Annunciator Lamp, 28V DC",             nsn: "6240-00-123-4562", qty: 12, unit: "EA" },
        { name: "Relay, SPDT, 24VDC Coil",              nsn: "5945-01-234-5675", qty: 4,  unit: "EA" },
      ]},
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
      { id: 202, name: "Fairwater Plane Control System Test", startDay: 2, duration: 2, requirements: { hydraulics: "required", crew: 2 }, system: "Control Surfaces", division: "A-Div", createdBy: "MM2 Fields", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "Control Surface Position Sensor",      nsn: "6610-01-345-6785", qty: 2,  unit: "EA" },
        { name: "Hydraulic Servo Valve O-Ring Kit",     nsn: "4820-01-456-7897", qty: 1,  unit: "KT" },
      ]},
      { id: 203, name: "BQQ-10 Sonar Dome Hull Valve PM", startDay: 5, duration: 3, requirements: { electrical: "required", crew: 3 }, system: "Sonar", division: "Ops-Div", createdBy: "ST1 Park", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "Sonar Dome Hull Valve Seat",           nsn: "4820-01-567-8907", qty: 1,  unit: "EA" },
        { name: "Transducer Array Cable Assembly",      nsn: "5995-01-234-5676", qty: 1,  unit: "EA" },
        { name: "Dome Fluid, Sonar, MIL-PRF-15800",    nsn: "9150-00-985-7163", qty: 5,  unit: "GL" },
      ]},
      { id: 204, name: "Battery Well Ventilation Service", startDay: 1, duration: 4, requirements: { electrical: "shutdown", crew: 4 }, system: "Electrical", division: "E-Div", createdBy: "EM1 Jenkins", status: "deferred", priority: "routine", dependsOn: [], parts: [
        { name: "Ventilation Fan Motor, 24VDC",        nsn: "6105-01-234-5677", qty: 2,  unit: "EA" },
        { name: "HEPA Filter Element, 12x12",           nsn: "4130-01-345-6786", qty: 4,  unit: "EA" },
        { name: "Hydrogen Detector Sensor Cell",        nsn: "6665-01-456-7898", qty: 1,  unit: "EA" },
      ]},
      { id: 205, name: "High Pressure Air Bank Recharge", startDay: 8, duration: 2, requirements: { air: "required", crew: 2 }, system: "Ballast", division: "A-Div", createdBy: "MM3 Dunn", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "HP Air Bank Check Valve",              nsn: "4810-01-678-9014", qty: 2,  unit: "EA" },
        { name: "HP Air Fitting, 1/4 NPT, 5000 PSI",   nsn: "4730-01-123-4563", qty: 6,  unit: "EA" },
      ]},
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
      { id: 302, name: "Underway Navigation System Alignment",   startDay: 3, duration: 2,  requirements: { electrical: "available", crew: 2 },                         system: "Sonar",            division: "Nav-Div", createdBy: "QM2 Hall",     status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 303, name: "Weapons Inventory & Safety Check",       startDay: 2, duration: 1,  requirements: { weapons: "required", crew: 3 },                             system: "Weapons",          division: "M-Div",   createdBy: "FT1 Bass",     status: "done",  priority: "routine",   dependsOn: [], parts: [] },
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
      { id: 401, name: "MK 48 ADCAP Weapon Offload", startDay: 1, duration: 3, requirements: { weapons: "shutdown", crew: 5 }, system: "Weapons", division: "M-Div", createdBy: "FT1 Sandoval", status: "proofed", priority: "emergency", dependsOn: [], parts: [
        { name: "Weapons Handling Sling, MK 48",        nsn: "1025-01-234-5678", qty: 2,  unit: "EA" },
        { name: "Torpedo Skid, Wheeled",                nsn: "1025-01-345-6787", qty: 1,  unit: "EA" },
        { name: "Safety Pin Set, Torpedo",              nsn: "1025-01-456-7899", qty: 4,  unit: "ST" },
      ]},
      { id: 402, name: "Emergency Diesel #2 Overhaul", startDay: 2, duration: 8, requirements: { electrical: "available", crew: 4 }, system: "Electrical", division: "E-Div", createdBy: "EM2 Cruz", status: "in-progress", priority: "urgent", dependsOn: [], parts: [
        { name: "Diesel Engine Overhaul Gasket Kit",    nsn: "2815-01-234-5679", qty: 1,  unit: "KT" },
        { name: "Piston Ring Set, EDG",                 nsn: "2815-01-345-6788", qty: 4,  unit: "ST" },
        { name: "Fuel Injection Nozzle Assembly",       nsn: "2910-01-456-7900", qty: 4,  unit: "EA" },
        { name: "EDG Crankshaft Bearing Set",           nsn: "3010-01-567-8908", qty: 1,  unit: "ST" },
        { name: "Diesel Engine Oil, MIL-PRF-2104",      nsn: "9150-00-191-2772", qty: 8,  unit: "QT" },
      ]},
      { id: 403, name: "Anchor & Mooring Equipment Inspection", startDay: 4, duration: 2, requirements: { crew: 3 }, system: "General", division: "A-Div", createdBy: "BM1 Hayes", status: "proofed", priority: "routine", dependsOn: [], parts: [
        { name: "Mooring Line, 6 in Nylon, 100 ft",    nsn: "4020-00-270-1432", qty: 2,  unit: "EA" },
        { name: "Shackle, Anchor Chain, 2.5 in",       nsn: "4030-00-252-7840", qty: 4,  unit: "EA" },
      ]},
      { id: 404, name: "Ship's Inertial Navigation System PM",   startDay: 1, duration: 2, requirements: { electrical: "required", crew: 2 },                           system: "Sonar",            division: "Nav-Div", createdBy: "QM1 Ford",     status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 405, name: "Hydraulic Power Unit Preventive Maint.", startDay: 7, duration: 3, requirements: { hydraulics: "shutdown", crew: 3 }, system: "Hydraulics", division: "A-Div", createdBy: "MM3 Stone", status: "deferred", priority: "routine", dependsOn: [], parts: [
        { name: "HPU Filter Element, 10 Micron",        nsn: "4330-01-234-5680", qty: 3,  unit: "EA" },
        { name: "HPU Pressure Relief Valve",            nsn: "4820-01-345-6789", qty: 1,  unit: "EA" },
        { name: "Hydraulic Fluid MIL-PRF-17672E",       nsn: "9150-01-087-3682", qty: 3,  unit: "GL" },
      ]},
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
      { id: 501, name: "Submarine Support Crane #1 Load Test",   startDay: 1, duration: 2, requirements: { hydraulics: "required", electrical: "required", crew: 4 },   system: "Hydraulics",       division: "A-Div",   createdBy: "BM1 Fischer",  status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 502, name: "Shore Power Distribution Panel PM",      startDay: 3, duration: 3, requirements: { electrical: "shutdown", crew: 5 },                           system: "Electrical",       division: "E-Div",   createdBy: "EM1 Boyd",     status: "in-progress", priority: "urgent",  dependsOn: [], parts: [] },
      { id: 503, name: "Machine Shop Lathe & Mill Calibration",  startDay: 1, duration: 1, requirements: { crew: 2 },                                                    system: "General",          division: "M-Div",   createdBy: "MR2 Vega",     status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 504, name: "Fresh Water Evaporator Maintenance",     startDay: 5, duration: 4, requirements: { electrical: "available", crew: 3 },                          system: "General",          division: "A-Div",   createdBy: "BT2 Owens",    status: "proofed", priority: "routine",   dependsOn: [], parts: [] },
      { id: 505, name: "Dive Locker Equipment Inspection",       startDay: 2, duration: 2, requirements: { crew: 2 },                                                    system: "General",          division: "Ops-Div", createdBy: "ND1 Marsh",    status: "done",  priority: "routine",   dependsOn: [], parts: [] },
      { id: 506, name: "Weapons Magazine Inventory & Audit",     startDay: 4, duration: 3, requirements: { weapons: "required", crew: 3 },                              system: "Weapons",          division: "M-Div",   createdBy: "GM2 Fuller",   status: "proofed", priority: "routine",   dependsOn: [], parts: [] },
    ],
  },
};
