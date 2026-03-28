import { useState } from "react";
import { Phone, User, Clock, ChevronDown, ChevronUp, Wrench, Search } from "lucide-react";
import { shoreServices } from "../data/shoreServices";

const ShoreServices = () => {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = shoreServices.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.shop.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.specialty.toLowerCase().includes(q) ||
      s.chief.toLowerCase().includes(q) ||
      s.supervisor.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Page header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Shore Support Directory</h2>
          <p className="text-sm text-gray-400">NAVSUBBASE New London — Intermediate Maintenance Activity &amp; Shops</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search shops, specialty…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-sm text-gray-200 placeholder-gray-500 rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Shop cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((shop) => {
          const isOpen = expanded === shop.shop;
          return (
            <div
              key={shop.shop}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
            >
              {/* Card header — always visible */}
              <button
                className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-750 transition"
                onClick={() => setExpanded(isOpen ? null : shop.shop)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 bg-cyan-500/15 border border-cyan-500/30 rounded-md p-1.5 shrink-0">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                        {shop.shop}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1 leading-tight">{shop.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">{shop.specialty}</p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
                )}
              </button>

              {/* Expanded details */}
              {isOpen && (
                <div className="border-t border-slate-700 px-4 py-3 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Supervisor</p>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-200">{shop.supervisor}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Leading Chief</p>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-200">{shop.chief}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">DSN</p>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-200">{shop.phone}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Cell / Duty</p>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-200">{shop.cell}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Shop Hours</p>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-200">{shop.hours}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500">
            No shops match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoreServices;
