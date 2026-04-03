/* Triton trident icon — scales via size prop, inherits color via currentColor */
export const TritonIcon = ({ size = 32, className = "" }) => (
  <svg
    viewBox="0 0 36 50"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
    aria-label="TRITON"
  >
    {/* Left prong — spear tip */}
    <path d="M4 21 L4 9 L6 4 L8 9 L8 21 Z" />
    {/* Center prong — tallest */}
    <path d="M15 23 L15 5 L18 0 L21 5 L21 23 Z" />
    {/* Right prong — spear tip */}
    <path d="M28 21 L28 9 L30 4 L32 9 L32 21 Z" />
    {/* Crossbar connecting all three prongs */}
    <rect x="4" y="21" width="28" height="3" rx="1" />
    {/* Handle shaft */}
    <rect x="16.5" y="23" width="3" height="21" rx="1.5" />
    {/* Crossguard */}
    <rect x="10" y="36.5" width="16" height="2.5" rx="1.25" />
    {/* Crossguard end knobs */}
    <circle cx="10"  cy="37.75" r="3" />
    <circle cx="26" cy="37.75" r="3" />
    {/* Base foot */}
    <rect x="13.5" y="44" width="9" height="2.5" rx="1.25" />
  </svg>
);

/* Full lockup: icon + TRITON wordmark */
export const TritonLockup = ({ iconSize = 28, className = "" }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="relative">
      <div className="absolute inset-0 blur-md opacity-60 text-blue-400">
        <TritonIcon size={iconSize} />
      </div>
      <TritonIcon size={iconSize} className="relative text-blue-400" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-black tracking-[0.15em] text-white">TRITON</span>
      <span className="text-[9px] font-semibold tracking-[0.2em] text-blue-400 uppercase">
        Maintenance System
      </span>
    </div>
  </div>
);

export default TritonIcon;
