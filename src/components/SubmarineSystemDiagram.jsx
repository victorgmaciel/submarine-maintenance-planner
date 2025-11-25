import React from "react";
import { Wrench } from "lucide-react";

const SubmarineSystemDiagram = ({ tasks, viewDays }) => {
  return (
    <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Wrench className="w-5 h-5 text-blue-400" />
        U.S.S. Rocinante Status
      </h3>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg p-8 border border-slate-700">
        {/* Submarine SVG Diagram */}
        <svg viewBox="0 0 1200 400" className="w-full h-auto">
          <defs>
            <linearGradient id="hullGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="darkHull" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>

          {/* Main Hull */}
          <ellipse
            cx="600"
            cy="200"
            rx="480"
            ry="75"
            fill="url(#hullGradient)"
            stroke="#64748b"
            strokeWidth="3"
          />
          <ellipse
            cx="600"
            cy="200"
            rx="480"
            ry="65"
            fill="none"
            stroke="#475569"
            strokeWidth="1"
            opacity="0.5"
          />
          <ellipse
            cx="600"
            cy="200"
            rx="480"
            ry="55"
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Bow */}
          <path
            d="M 120 200 Q 80 200 60 200 Q 60 180 75 170 L 120 175 Z"
            fill="url(#hullGradient)"
            stroke="#64748b"
            strokeWidth="3"
          />
          <path
            d="M 120 200 Q 80 200 60 200 Q 60 220 75 230 L 120 225 Z"
            fill="url(#darkHull)"
            stroke="#64748b"
            strokeWidth="3"
          />
          <path d="M 120 175 L 120 225" stroke="#475569" strokeWidth="2" />

          {/* Sail/Conning Tower */}
          <rect
            x="500"
            y="100"
            width="160"
            height="100"
            rx="10"
            fill="url(#hullGradient)"
            stroke="#64748b"
            strokeWidth="3"
          />
          <rect
            x="530"
            y="70"
            width="100"
            height="35"
            rx="8"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line
            x1="520"
            y1="120"
            x2="520"
            y2="190"
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1="640"
            y1="120"
            x2="640"
            y2="190"
            stroke="#475569"
            strokeWidth="2"
          />
          <rect
            x="545"
            y="110"
            width="70"
            height="15"
            rx="3"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1"
          />

          {/* Periscopes */}
          <line
            x1="545"
            y1="70"
            x2="545"
            y2="30"
            stroke="#64748b"
            strokeWidth="3"
          />
          <line
            x1="580"
            y1="70"
            x2="580"
            y2="40"
            stroke="#64748b"
            strokeWidth="3"
          />
          <line
            x1="615"
            y1="70"
            x2="615"
            y2="35"
            stroke="#64748b"
            strokeWidth="3"
          />
          <circle cx="545" cy="30" r="4" fill="#64748b" />
          <circle cx="580" cy="40" r="4" fill="#64748b" />
          <circle cx="615" cy="35" r="4" fill="#64748b" />

          {/* Stern */}
          <path
            d="M 1080 200 L 1140 185 L 1150 200 L 1140 215 Z"
            fill="url(#darkHull)"
            stroke="#64748b"
            strokeWidth="3"
          />

          {/* Pump Jet */}
          <ellipse
            cx="1145"
            cy="200"
            rx="25"
            ry="28"
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
          />
          <circle
            cx="1145"
            cy="200"
            r="15"
            fill="#0f172a"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line
            x1="1130"
            y1="200"
            x2="1160"
            y2="200"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line
            x1="1145"
            y1="185"
            x2="1145"
            y2="215"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Control Surfaces */}
          <line
            x1="1070"
            y1="160"
            x2="1030"
            y2="115"
            stroke="#64748b"
            strokeWidth="4"
          />
          <line
            x1="1070"
            y1="240"
            x2="1030"
            y2="285"
            stroke="#64748b"
            strokeWidth="4"
          />
          <line
            x1="1070"
            y1="160"
            x2="1030"
            y2="285"
            stroke="#64748b"
            strokeWidth="4"
            opacity="0.6"
          />
          <line
            x1="1070"
            y1="240"
            x2="1030"
            y2="115"
            stroke="#64748b"
            strokeWidth="4"
            opacity="0.6"
          />

          {/* Fairwater planes */}
          <rect
            x="480"
            y="145"
            width="20"
            height="8"
            rx="2"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="2"
          />
          <rect
            x="660"
            y="145"
            width="20"
            height="8"
            rx="2"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* WEAPONS */}
          <g>
            <circle
              cx="160"
              cy="185"
              r="10"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.weapons === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
            />
            <circle
              cx="160"
              cy="205"
              r="10"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.weapons === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
            />
            <circle
              cx="160"
              cy="215"
              r="10"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.weapons === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
            />
            <line
              x1="160"
              y1="175"
              x2="160"
              y2="60"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="160"
              y="45"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              WEAPONS
            </text>
            <text
              x="160"
              y="62"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              Mk 48 Torpedoes
            </text>
          </g>

          {/* SONAR */}
          <g>
            <rect
              x="85"
              y="193"
              width="40"
              height="14"
              rx="3"
              fill="#475569"
              stroke="#64748b"
              strokeWidth="2"
            />
            <line
              x1="105"
              y1="207"
              x2="60"
              y2="330"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="60"
              y="350"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              SONAR
            </text>
            <text
              x="60"
              y="367"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              TB-16/TB-29
            </text>
          </g>

          {/* PERISCOPE */}
          <g>
            <line
              x1="545"
              y1="30"
              x2="480"
              y2="20"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="450"
              y="18"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              PERISCOPE
            </text>
          </g>

          {/* RADAR */}
          <g>
            <line
              x1="615"
              y1="35"
              x2="720"
              y2="20"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="750"
              y="18"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              RADAR
            </text>
            <text
              x="750"
              y="35"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              BPS-16
            </text>
          </g>

          {/* NAVIGATION */}
          <g>
            <line
              x1="580"
              y1="100"
              x2="620"
              y2="50"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="650"
              y="48"
              textAnchor="start"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              NAVIGATION
            </text>
            <text
              x="650"
              y="65"
              textAnchor="start"
              fill="#94a3b8"
              fontSize="11"
            >
              Inertial Nav
            </text>
          </g>

          {/* ELECTRICAL */}
          <g>
            <rect
              x="430"
              y="185"
              width="60"
              height="40"
              rx="5"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.electrical === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
            />
            <line
              x1="460"
              y1="185"
              x2="380"
              y2="100"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="380"
              y="85"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              ELECTRICAL
            </text>
            <text
              x="380"
              y="102"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              Main Distribution
            </text>
          </g>

          {/* BALLAST/AIR */}
          <g>
            <circle
              cx="340"
              cy="200"
              r="30"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.air === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
              opacity="0.9"
            />
            <line
              x1="340"
              y1="230"
              x2="280"
              y2="340"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="280"
              y="355"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              BALLAST
            </text>
            <text
              x="280"
              y="372"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              Emergency Blow
            </text>
          </g>

          {/* HYDRAULICS */}
          <g>
            <rect
              x="1000"
              y="155"
              width="40"
              height="20"
              rx="3"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.hydraulics === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
            />
            <line
              x1="1020"
              y1="155"
              x2="950"
              y2="60"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="950"
              y="45"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              HYDRAULICS
            </text>
            <text
              x="950"
              y="62"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              Control Surfaces
            </text>
          </g>

          {/* REACTOR */}
          <g>
            <rect
              x="730"
              y="175"
              width="90"
              height="50"
              rx="8"
              fill={
                tasks.some((t) => {
                  const isActive =
                    t.startDay <= viewDays && t.startDay + t.duration > 1;
                  return isActive && t.requirements.reactor === "shutdown";
                })
                  ? "#ef4444"
                  : "#22c55e"
              }
              stroke="#fff"
              strokeWidth="2.5"
            />
            <line
              x1="775"
              y1="225"
              x2="820"
              y2="340"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="820"
              y="355"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              REACTOR
            </text>
            <text
              x="820"
              y="372"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              S6W PWR
            </text>
          </g>

          {/* COMMS */}
          <g>
            <line
              x1="580"
              y1="200"
              x2="580"
              y2="340"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="580"
              y="355"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              COMMS
            </text>
            <text
              x="580"
              y="372"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              Internal/External
            </text>
          </g>

          {/* PROPULSION */}
          <g>
            <line
              x1="1145"
              y1="228"
              x2="1145"
              y2="340"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x="1145"
              y="355"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="bold"
            >
              PROPULSION
            </text>
            <text
              x="1145"
              y="372"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              Pump Jet Drive
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded border-2 border-white"></div>
            <span className="text-gray-300">Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded border-2 border-white"></div>
            <span className="text-gray-300">Out of Commission</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmarineSystemDiagram;
