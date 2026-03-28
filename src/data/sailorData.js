// Sailor rosters per vessel — 6-8 sailors covering each active division.
// Availability: "present" | "watch" | "TAD" | "leave"

export const sailorData = {
  ssn774: [
    { id: "774-1",  name: "MM2 Jones",      rate: "MM2",  division: "A-Div",   availability: "present" },
    { id: "774-2",  name: "MM3 Wallace",    rate: "MM3",  division: "A-Div",   availability: "watch"   },
    { id: "774-3",  name: "ET1 Smith",      rate: "ET1",  division: "E-Div",   availability: "present" },
    { id: "774-4",  name: "EM3 Garrett",    rate: "EM3",  division: "E-Div",   availability: "TAD"     },
    { id: "774-5",  name: "FT3 Davis",      rate: "FT3",  division: "M-Div",   availability: "present" },
    { id: "774-6",  name: "EM1 Thompson",   rate: "EM1",  division: "R-Div",   availability: "present" },
    { id: "774-7",  name: "MM1 Rivera",     rate: "MM1",  division: "R-Div",   availability: "leave"   },
    { id: "774-8",  name: "ST2 Rodriguez",  rate: "ST2",  division: "Ops-Div", availability: "present" },
  ],

  ssn775: [
    { id: "775-1",  name: "MM1 Carter",     rate: "MM1",  division: "A-Div",   availability: "present" },
    { id: "775-2",  name: "BM2 Sloane",     rate: "BM2",  division: "A-Div",   availability: "watch"   },
    { id: "775-3",  name: "EM2 Walsh",      rate: "EM2",  division: "E-Div",   availability: "present" },
    { id: "775-4",  name: "ET3 Nguyen",     rate: "ET3",  division: "E-Div",   availability: "present" },
    { id: "775-5",  name: "FT2 Brooks",     rate: "FT2",  division: "M-Div",   availability: "TAD"     },
    { id: "775-6",  name: "EM1 Bishop",     rate: "EM1",  division: "R-Div",   availability: "present" },
    { id: "775-7",  name: "ST1 Lee",        rate: "ST1",  division: "Ops-Div", availability: "present" },
    { id: "775-8",  name: "IS2 Vargas",     rate: "IS2",  division: "Ops-Div", availability: "leave"   },
  ],

  ssn776: [
    { id: "776-1",  name: "MM1 Osei",       rate: "MM1",  division: "R-Div",   availability: "present" },
    { id: "776-2",  name: "MM2 Fields",     rate: "MM2",  division: "A-Div",   availability: "present" },
    { id: "776-3",  name: "MM3 Dunn",       rate: "MM3",  division: "A-Div",   availability: "watch"   },
    { id: "776-4",  name: "EM1 Jenkins",    rate: "EM1",  division: "E-Div",   availability: "present" },
    { id: "776-5",  name: "ET2 Holloway",   rate: "ET2",  division: "E-Div",   availability: "TAD"     },
    { id: "776-6",  name: "ST1 Park",       rate: "ST1",  division: "Ops-Div", availability: "present" },
    { id: "776-7",  name: "IS3 Mendez",     rate: "IS3",  division: "Ops-Div", availability: "present" },
  ],

  ssn777: [
    { id: "777-1",  name: "EM1 Russo",      rate: "EM1",  division: "R-Div",   availability: "watch"   },
    { id: "777-2",  name: "MM2 Tran",       rate: "MM2",  division: "R-Div",   availability: "watch"   },
    { id: "777-3",  name: "QM2 Hall",       rate: "QM2",  division: "Nav-Div", availability: "watch"   },
    { id: "777-4",  name: "FT1 Bass",       rate: "FT1",  division: "M-Div",   availability: "watch"   },
    { id: "777-5",  name: "ET2 Payne",      rate: "ET2",  division: "M-Div",   availability: "watch"   },
    { id: "777-6",  name: "ST3 Chu",        rate: "ST3",  division: "Nav-Div", availability: "watch"   },
  ],

  ssn778: [
    { id: "778-1",  name: "FT1 Sandoval",   rate: "FT1",  division: "M-Div",   availability: "present" },
    { id: "778-2",  name: "GM2 Reeves",     rate: "GM2",  division: "M-Div",   availability: "present" },
    { id: "778-3",  name: "EM2 Cruz",       rate: "EM2",  division: "E-Div",   availability: "present" },
    { id: "778-4",  name: "ET3 Pham",       rate: "ET3",  division: "E-Div",   availability: "TAD"     },
    { id: "778-5",  name: "BM1 Hayes",      rate: "BM1",  division: "A-Div",   availability: "present" },
    { id: "778-6",  name: "MM3 Stone",      rate: "MM3",  division: "A-Div",   availability: "watch"   },
    { id: "778-7",  name: "QM1 Ford",       rate: "QM1",  division: "Nav-Div", availability: "present" },
    { id: "778-8",  name: "IS1 Ortega",     rate: "IS1",  division: "Nav-Div", availability: "leave"   },
  ],

  as39: [
    { id: "as39-1", name: "BM1 Fischer",    rate: "BM1",  division: "A-Div",   availability: "present" },
    { id: "as39-2", name: "BT2 Owens",      rate: "BT2",  division: "A-Div",   availability: "present" },
    { id: "as39-3", name: "EM1 Boyd",       rate: "EM1",  division: "E-Div",   availability: "present" },
    { id: "as39-4", name: "ET2 Haines",     rate: "ET2",  division: "E-Div",   availability: "watch"   },
    { id: "as39-5", name: "MR2 Vega",       rate: "MR2",  division: "M-Div",   availability: "present" },
    { id: "as39-6", name: "GM2 Fuller",     rate: "GM2",  division: "M-Div",   availability: "TAD"     },
    { id: "as39-7", name: "ND1 Marsh",      rate: "ND1",  division: "Ops-Div", availability: "present" },
    { id: "as39-8", name: "IS2 Kirby",      rate: "IS2",  division: "Ops-Div", availability: "leave"   },
  ],
};
