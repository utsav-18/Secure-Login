import { useNavigate } from "react-router-dom";

function Log({
  isLogin,
  setIsLogin,
  username,
  setUsername,
  password,
  setPassword,
  setMessage,
  setAlertType,
  setShowAlert,
}) {
  const navigate = useNavigate();
  const isDisabled = !username.trim() || !password.trim();

  const handleSubmit = async () => {
    if (isDisabled) {
      setMessage("Fill all fields ❗");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    try {
      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/signup";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      setMessage(data.message);
      setShowAlert(true);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setAlertType("success");

        navigate("/dashboard");
      } else {
        setAlertType("error");
      }

    } catch {
      setMessage("Server error ❌");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-indigo-300/20 bg-white shadow-2xl md:grid md:grid-cols-2">
      <section className="hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 p-8 text-white md:block">
        <p className="text-sm uppercase tracking-[0.18em] text-indigo-200">ShopSphere</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight">Your secure shopping account</h1>
        <p className="mt-3 text-sm text-indigo-100">
          Sign in to continue shopping or create a new account in seconds.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-indigo-100">
          <li className="rounded-md border border-indigo-200/30 bg-indigo-700/40 px-3 py-2">Fast login and secure checkout</li>
          <li className="rounded-md border border-indigo-200/30 bg-indigo-700/40 px-3 py-2">Track orders and saved items</li>
          <li className="rounded-md border border-indigo-200/30 bg-indigo-700/40 px-3 py-2">Exclusive member-only offers</li>
        </ul>
      </section>

      <section className="p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {isLogin ? "Login to continue" : "Sign up to start shopping"}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="mt-6 w-full rounded-md bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          {isLogin ? "No account?" : "Already have one?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 font-semibold text-indigo-600 hover:text-indigo-800"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </section>
    </div>
  );
}

export default Log;