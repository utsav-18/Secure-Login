import { useEffect } from "react";

function Log({
  isLogin,
  setIsLogin,
  username,
  setUsername,
  password,
  setPassword,
  message,
  setMessage,
  alertType,
  setAlertType,
  showAlert,
  setShowAlert,
}) {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

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
    
    // Show alert for login success or errors
    if (isLogin && data.message === "Login successful") {
      setAlertType("success");
      setShowAlert(true);
    } else if (data.message === "Invalid credentials" || data.message.includes("Error")) {
      setAlertType("error");
      setShowAlert(true);
    }
  };

  return (
    <div className="relative">
      {/* Alert Component */}
      {showAlert && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg animate-pulse ${
          alertType === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {message}
        </div>
      )}
      
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80">
        
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername("");
              setPassword("");
              setMessage("");
              setShowAlert(false);
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

export default Log;