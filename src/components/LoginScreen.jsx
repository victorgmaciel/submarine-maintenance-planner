import { TritonIcon } from "./TritonLogo";

const LoginScreen = ({ loginForm, setLoginForm, handleLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background depth rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[600, 480, 360, 240].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-blue-500/10"
            style={{ width: size, height: size, opacity: 1 - i * 0.18 }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo block */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            {/* Glow layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <TritonIcon size={72} className="text-blue-500 blur-xl opacity-60" />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 relative">
              <TritonIcon size={56} className="text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-[0.2em] text-white">TRITON</h1>
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-400 uppercase mt-1">
            Naval Maintenance Management System
          </p>
        </div>

        {/* Login card */}
        <div className="bg-slate-800/80 backdrop-blur rounded-xl shadow-2xl border border-slate-700 p-8">
          <p className="text-center text-gray-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Secure Access — Authorized Personnel Only
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition shadow-lg tracking-wider text-sm mt-2"
            >
              AUTHENTICATE
            </button>
          </div>

          <div className="mt-6 p-3 bg-slate-900/60 rounded-lg border border-slate-700">
            <p className="text-[10px] text-gray-500 mb-1.5 font-semibold uppercase tracking-wider">Demo Credentials</p>
            <p className="text-xs text-gray-400">
              <span className="font-mono text-gray-300">demo</span> / <span className="font-mono text-gray-300">demo</span>
              <span className="text-gray-600 ml-2">· admin</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              <span className="font-mono text-gray-300">jones</span> / <span className="font-mono text-gray-300">demo123</span>
              <span className="text-gray-600 ml-2">· E-Div user</span>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-6 tracking-wider">
          TRITON · NAVSUBBASE NEW LONDON · UNCLASSIFIED
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
