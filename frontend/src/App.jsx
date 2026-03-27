import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80">
        
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">
            {message}
          </p>
        )}

        {/* Toggle */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-indigo-600 cursor-pointer ml-1 font-semibold"
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>

      </div>

    </div>
  );
}

export default App;