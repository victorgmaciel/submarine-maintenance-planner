import { Lock } from "lucide-react";

const LoginScreen = ({ loginForm, setLoginForm, handleLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-500/20 p-4 rounded-full border border-blue-500/30">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">
            Submarine Maintenance Planner
          </h1>
          <p className="text-center text-gray-400 text-sm mb-8">
            Secure Access — Authorized Personnel Only
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-lg"
            >
              Login
            </button>
          </div>
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <p className="text-xs text-gray-400 mb-2 font-semibold">Demo Credentials:</p>
            <p className="text-xs text-gray-300">Username: <span className="font-mono">demo</span></p>
            <p className="text-xs text-gray-300">Password: <span className="font-mono">demo</span></p>
            <p className="text-xs text-gray-400 mt-2">Other users: smith, jones, davis (all use demo123)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
