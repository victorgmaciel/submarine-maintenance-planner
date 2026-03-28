import { Wrench } from "lucide-react";

const SYSTEMS = [
  { key: "weapons",    label: "WEAPONS",    sub: "Mk 48 ADCAP",       check: (t) => t.requirements.weapons === "shutdown" },
  { key: "electrical", label: "ELECTRICAL", sub: "Main Distribution", check: (t) => t.requirements.electrical === "shutdown" },
  { key: "hydraulics", label: "HYDRAULICS", sub: "Control Surfaces",  check: (t) => t.requirements.hydraulics === "shutdown" },
  { key: "reactor",    label: "REACTOR",    sub: "S9G PWR",           check: (t) => t.requirements.reactor === "shutdown" },
  { key: "air",        label: "BALLAST",    sub: "Emergency Blow",    check: (t) => t.requirements.air === "shutdown" },
];

const SubmarineSystemDiagram = ({ tasks, viewDays }) => {
  const isShutdown = (checker) =>
    tasks.some((t) => t.startDay <= viewDays && t.startDay + t.duration > 1 && checker(t));

  return (
    <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        <Wrench className="w-5 h-5 text-blue-400" />
        System Status
      </h3>

      {/* Submarine SVG */}
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
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
            <filter id="glow-green">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-red">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* === HULL BODY === */}
          {/* Bottom shadow */}
          <ellipse cx="545" cy="158" rx="430" ry="62" fill="#0a0f1a" opacity="0.5"/>
          {/* Main hull upper */}
          <path d="M 115 140 Q 545 60 975 140 L 975 158 Q 545 78 115 158 Z" fill="url(#hullTop)"/>
          {/* Main hull lower */}
          <path d="M 115 158 Q 545 238 975 158 L 975 175 Q 545 255 115 175 Z" fill="url(#hullBot)"/>
          {/* Hull centerline ring */}
          <ellipse cx="545" cy="158" rx="430" ry="58" fill="none" stroke="#475569" strokeWidth="2.5"/>
          {/* Inner hull detail lines */}
          <ellipse cx="545" cy="158" rx="415" ry="50" fill="none" stroke="#334155" strokeWidth="1" opacity="0.6"/>

          {/* === BOW DOME === */}
          <ellipse cx="115" cy="158" rx="38" ry="55" fill="url(#hullTop)" stroke="#64748b" strokeWidth="2"/>
          <ellipse cx="108" cy="158" rx="22" ry="38" fill="#1e293b" stroke="#475569" strokeWidth="1.5" opacity="0.8"/>
          {/* Bow sonar dome detail */}
          <ellipse cx="102" cy="158" rx="14" ry="26" fill="#334155" opacity="0.5"/>

          {/* === STERN / PUMP-JET === */}
          {/* Stern taper */}
          <path d="M 975 140 Q 1020 145 1040 155 L 1040 161 Q 1020 171 975 175 Z" fill="url(#hullTop)" stroke="#64748b" strokeWidth="2"/>
          {/* Pump-jet housing */}
          <ellipse cx="1055" cy="158" rx="30" ry="38" fill="#1e293b" stroke="#64748b" strokeWidth="2.5"/>
          <ellipse cx="1055" cy="158" rx="18" ry="24" fill="#0f172a" stroke="#475569" strokeWidth="2"/>
          {/* Rotor blades (simplified) */}
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

          {/* === CONTROL SURFACES === */}
          {/* Stern planes — X-form */}
          <line x1="985" y1="130" x2="1010" y2="100" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
          <line x1="985" y1="186" x2="1010" y2="216" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
          <line x1="985" y1="130" x2="1010" y2="216" stroke="#475569" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
          <line x1="985" y1="186" x2="1010" y2="100" stroke="#475569" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>

          {/* === SAIL / CONNING TOWER === */}
          <path d="M 440 140 L 440 70 Q 440 58 452 58 L 620 58 Q 632 58 632 70 L 632 140 Z"
            fill="url(#sailGrad)" stroke="#64748b" strokeWidth="2.5"/>
          {/* Sail top cap */}
          <rect x="455" y="42" width="152" height="20" rx="6" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>
          {/* Window strip on sail */}
          <rect x="465" y="90" width="112" height="12" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
          {[480,510,540,570,600].map((x, i) => (
            <rect key={i} x={x} y={93} width="12" height="6" rx="1" fill="#334155" stroke="#64748b" strokeWidth="0.5"/>
          ))}
          {/* Fairwater planes */}
          <rect x="420" y="118" width="24" height="7" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>
          <rect x="628" y="118" width="24" height="7" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1.5"/>

          {/* === MASTS (Periscopes / Antennas) === */}
          {[{x:490,h:38},{x:530,h:30},{x:580,h:42},{x:620,h:28}].map((m, i) => (
            <g key={i}>
              <line x1={m.x} y1={42} x2={m.x} y2={42-m.h} stroke="#64748b" strokeWidth={i%2===0?3:2}/>
              <circle cx={m.x} cy={42-m.h} r={i%2===0?4:3} fill={i===2?"#60a5fa":"#64748b"} stroke="#94a3b8" strokeWidth="1"/>
            </g>
          ))}

          {/* === BALLAST TANK VENTS along hull === */}
          {[200,300,400,700,800].map((x, i) => (
            <circle key={i} cx={x} cy={158} r="5" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
          ))}

          {/* === LABEL: ship name === */}
          <text x="545" y="252" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace" letterSpacing="3" fontWeight="bold">
            U.S.S. ROCINANTE (SSN-774)
          </text>
        </svg>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-5 gap-2">
        {SYSTEMS.map(({ key, label, sub, check }) => {
          const down = isShutdown(check);
          return (
            <div
              key={key}
              className={`rounded-lg p-2 text-center border transition ${
                down
                  ? "bg-red-500/10 border-red-500/40"
                  : "bg-green-500/10 border-green-500/30"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full mx-auto mb-1.5 ${
                  down ? "bg-red-500 shadow-[0_0_6px_#ef4444]" : "bg-green-500 shadow-[0_0_6px_#22c55e]"
                }`}
              />
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
