import { Wrench } from "lucide-react";

const SUB_SYSTEMS = [
  { key: "weapons",    label: "WEAPONS",    sub: "Mk 48 ADCAP"       },
  { key: "electrical", label: "ELECTRICAL", sub: "Main Distribution" },
  { key: "hydraulics", label: "HYDRAULICS", sub: "Control Surfaces"  },
  { key: "reactor",    label: "REACTOR",    sub: "S9G PWR"           },
  { key: "air",        label: "BALLAST",    sub: "Emergency Blow"    },
];

const TENDER_SYSTEMS = [
  { key: "weapons",    label: "WEAPONS",    sub: "Magazine"          },
  { key: "electrical", label: "ELECTRICAL", sub: "Shore Power Dist." },
  { key: "hydraulics", label: "HYDRAULICS", sub: "Crane Systems"     },
  { key: "reactor",    label: "PROPULSION", sub: "Diesel-Electric"   },
  { key: "air",        label: "AUXILIARY",  sub: "Pumps & Evap."     },
];

/* ── Submarine SVG ─────────────────────────────────────────────────────── */
const SubmarineSVG = ({ label }) => (
  <svg viewBox="0 0 1100 280" className="w-full h-auto">
    <defs>
      <linearGradient id="hullTop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="40%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="hullBot" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="sailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="545" cy="158" rx="430" ry="62" fill="#0a0f1a" opacity="0.5"/>
    {/* Hull upper */}
    <path d="M 115 140 Q 545 60 975 140 L 975 158 Q 545 78 115 158 Z" fill="url(#hullTop)"/>
    {/* Hull lower */}
    <path d="M 115 158 Q 545 238 975 158 L 975 175 Q 545 255 115 175 Z" fill="url(#hullBot)"/>
    {/* Hull ring */}
    <ellipse cx="545" cy="158" rx="430" ry="58" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <ellipse cx="545" cy="158" rx="415" ry="50" fill="none" stroke="#334155" strokeWidth="1" opacity="0.6"/>

    {/* Bow dome */}
    <ellipse cx="115" cy="158" rx="38" ry="55" fill="url(#hullTop)" stroke="#64748b" strokeWidth="2"/>
    <ellipse cx="108" cy="158" rx="22" ry="38" fill="#1e293b" stroke="#475569" strokeWidth="1.5" opacity="0.8"/>
    <ellipse cx="102" cy="158" rx="14" ry="26" fill="#334155" opacity="0.5"/>

    {/* Stern / pump-jet */}
    <path d="M 975 140 Q 1020 145 1040 155 L 1040 161 Q 1020 171 975 175 Z" fill="url(#hullTop)" stroke="#64748b" strokeWidth="2"/>
    <ellipse cx="1055" cy="158" rx="30" ry="38" fill="#1e293b" stroke="#64748b" strokeWidth="2.5"/>
    <ellipse cx="1055" cy="158" rx="18" ry="24" fill="#0f172a" stroke="#475569" strokeWidth="2"/>
    {[0,45,90,135].map((angle, i) => (
      <line key={i}
        x1={1055 + 6 * Math.cos((angle * Math.PI) / 180)}
        y1={158  + 6 * Math.sin((angle * Math.PI) / 180)}
        x2={1055 + 17 * Math.cos((angle * Math.PI) / 180)}
        y2={158  + 17 * Math.sin((angle * Math.PI) / 180)}
        stroke="#64748b" strokeWidth="3" strokeLinecap="round"
      />
    ))}
    <circle cx="1055" cy="158" r="5" fill="#475569"/>

    {/* X-form stern planes */}
    <line x1="985" y1="130" x2="1010" y2="100" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
    <line x1="985" y1="186" x2="1010" y2="216" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
    <line x1="985" y1="130" x2="1010" y2="216" stroke="#475569" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
    <line x1="985" y1="186" x2="1010" y2="100" stroke="#475569" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>

    {/* Sail */}
    <path d="M 440 140 L 440 70 Q 440 58 452 58 L 620 58 Q 632 58 632 70 L 632 140 Z"
      fill="url(#sailGrad)" stroke="#64748b" strokeWidth="2.5"/>
    <rect x="455" y="42" width="152" height="20" rx="6" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="465" y="90" width="112" height="12" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    {[480,510,540,570,600].map((x, i) => (
      <rect key={i} x={x} y={93} width="12" height="6" rx="1" fill="#334155" stroke="#64748b" strokeWidth="0.5"/>
    ))}
    {/* Fairwater planes */}
    <rect x="420" y="118" width="24" height="7" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="628" y="118" width="24" height="7" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>

    {/* Masts */}
    {[{x:490,h:38},{x:530,h:30},{x:580,h:42},{x:620,h:28}].map((m, i) => (
      <g key={i}>
        <line x1={m.x} y1={42} x2={m.x} y2={42-m.h} stroke="#64748b" strokeWidth={i%2===0?3:2}/>
        <circle cx={m.x} cy={42-m.h} r={i%2===0?4:3} fill={i===2?"#60a5fa":"#64748b"} stroke="#94a3b8" strokeWidth="1"/>
      </g>
    ))}

    {/* Ballast vents */}
    {[200,300,400,700,800].map((x, i) => (
      <circle key={i} cx={x} cy={158} r="5" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
    ))}

    <text x="545" y="252" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace" letterSpacing="3" fontWeight="bold">
      {label}
    </text>
  </svg>
);

/* ── Tender / Surface Ship SVG ─────────────────────────────────────────── */
const TenderSVG = ({ label }) => (
  <svg viewBox="0 0 1100 300" className="w-full h-auto">
    <defs>
      <linearGradient id="tHullSide" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="tSuper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="tWater" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
    </defs>

    {/* Water line */}
    <rect x="60" y="210" width="980" height="30" rx="4" fill="url(#tWater)" opacity="0.6"/>
    <line x1="60" y1="210" x2="1040" y2="210" stroke="#1e40af" strokeWidth="1.5" opacity="0.4"/>

    {/* Hull bottom */}
    <path d="M 90 210 L 80 240 Q 80 250 92 250 L 1008 250 Q 1020 250 1020 240 L 1010 210 Z"
      fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>

    {/* Hull side (freeboard) */}
    <rect x="90" y="150" width="920" height="62" rx="0" fill="url(#tHullSide)" stroke="#475569" strokeWidth="2"/>

    {/* Bow — angled */}
    <path d="M 90 150 L 60 190 L 80 210 L 90 210 L 90 150 Z" fill="#334155" stroke="#475569" strokeWidth="2"/>

    {/* Stern — flat */}
    <rect x="1008" y="150" width="4" height="62" fill="#475569"/>

    {/* Main deck */}
    <rect x="88" y="146" width="924" height="8" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1"/>

    {/* ── Superstructure / Bridge ── */}
    {/* Fwd superstructure block */}
    <rect x="220" y="80" width="320" height="70" rx="4" fill="url(#tSuper)" stroke="#64748b" strokeWidth="1.5"/>
    {/* Bridge windows */}
    {[240,275,310,345,380,415,450,485].map((x, i) => (
      <rect key={i} x={x} y={92} width="22" height="14" rx="2" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="0.8" opacity="0.8"/>
    ))}
    {/* Bridge top / nav deck */}
    <rect x="250" y="62" width="260" height="20" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1.5"/>

    {/* Aft superstructure */}
    <rect x="600" y="100" width="200" height="50" rx="4" fill="url(#tSuper)" stroke="#64748b" strokeWidth="1.5"/>

    {/* Funnel / stack */}
    <rect x="580" y="60" width="36" height="52" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <rect x="577" y="54" width="42" height="10" rx="3" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>
    {/* Stack exhaust */}
    <line x1="595" y1="54" x2="590" y2="38" stroke="#64748b" strokeWidth="2" strokeDasharray="3,2"/>
    <line x1="602" y1="54" x2="600" y2="36" stroke="#64748b" strokeWidth="2" strokeDasharray="3,2"/>

    {/* ── Cranes (tender characteristic) ── */}
    {/* Fwd crane */}
    <line x1="180" y1="146" x2="180" y2="60" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
    <line x1="180" y1="60" x2="280" y2="90" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>
    <line x1="280" y1="90" x2="280" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3"/>
    <circle cx="180" cy="60" r="5" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>

    {/* Aft crane */}
    <line x1="920" y1="146" x2="920" y2="70" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
    <line x1="920" y1="70" x2="820" y2="100" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>
    <line x1="820" y1="100" x2="820" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3"/>
    <circle cx="920" cy="70" r="5" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>

    {/* ── Masts ── */}
    {/* Fore mast */}
    <line x1="370" y1="62" x2="370" y2="10" stroke="#64748b" strokeWidth="3"/>
    <line x1="340" y1="28" x2="400" y2="28" stroke="#64748b" strokeWidth="2"/>
    <circle cx="370" cy="10" r="4" fill="#60a5fa" stroke="#94a3b8" strokeWidth="1"/>
    {/* Radar dish */}
    <ellipse cx="342" cy="29" rx="8" ry="5" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8"/>

    {/* Aft mast */}
    <line x1="700" y1="100" x2="700" y2="45" stroke="#64748b" strokeWidth="3"/>
    <circle cx="700" cy="45" r="3" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>

    {/* ── Hull details ── */}
    {/* Portholes */}
    {[130,160,960,990].map((x, i) => (
      <circle key={i} cx={x} cy={180} r="6" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
    ))}
    {/* Deck fittings / bollards */}
    {[110,150,950,990].map((x, i) => (
      <rect key={i} x={x-4} y={143} width="8" height="6" rx="1" fill="#334155" stroke="#475569" strokeWidth="1"/>
    ))}
    {/* Waterline stripe */}
    <line x1="90" y1="205" x2="1010" y2="205" stroke="#1d4ed8" strokeWidth="2" opacity="0.5"/>

    {/* Anchor chain hawse */}
    <circle cx="105" cy="185" r="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>

    <text x="545" y="278" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace" letterSpacing="3" fontWeight="bold">
      {label}
    </text>
  </svg>
);

/* ── Main component ─────────────────────────────────────────────────────── */
const SubmarineSystemDiagram = ({ tasks, viewDays, selectedVessel }) => {
  const isTender = selectedVessel?.type === "Submarine Tender";
  const SYSTEMS = isTender ? TENDER_SYSTEMS : SUB_SYSTEMS;
  const shipLabel = selectedVessel
    ? `${selectedVessel.name.replace("USS ", "U.S.S. ")} (${selectedVessel.hull})`.toUpperCase()
    : "U.S.S. UNKNOWN";

  const shutdownKeys = new Set(
    tasks
      .filter((t) => t.startDay <= viewDays && t.startDay + t.duration > 1)
      .flatMap((t) =>
        ["weapons", "electrical", "hydraulics", "reactor", "air"].filter(
          (k) => t.requirements?.[k] === "shutdown"
        )
      )
  );

  return (
    <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        <Wrench className="w-5 h-5 text-blue-400" />
        System Status
      </h3>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
        {isTender
          ? <TenderSVG label={shipLabel} />
          : <SubmarineSVG label={shipLabel} />
        }
      </div>

      <div className="grid grid-cols-5 gap-2">
        {SYSTEMS.map(({ key, label, sub }) => {
          const down = shutdownKeys.has(key);
          return (
            <div
              key={key}
              className={`rounded-lg p-2 text-center border transition ${
                down ? "bg-red-500/10 border-red-500/40" : "bg-green-500/10 border-green-500/30"
              }`}
            >
              <div className={`w-3 h-3 rounded-full mx-auto mb-1.5 ${
                down ? "bg-red-500 shadow-[0_0_6px_#ef4444]" : "bg-green-500 shadow-[0_0_6px_#22c55e]"
              }`}/>
              <div className={`text-[10px] font-bold tracking-wider ${down ? "text-red-400" : "text-green-400"}`}>
                {label}
              </div>
              <div className="text-[9px] text-gray-500 mt-0.5 truncate">{sub}</div>
              <div className={`text-[9px] font-semibold mt-1 ${down ? "text-red-400" : "text-green-500"}`}>
                {down ? "MAINT" : "OPER"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubmarineSystemDiagram;
