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

  const handleSubmit = async () => {
    if (!username || !password) {
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
    <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
      
      <h1 className="text-2xl font-bold text-center mb-4">
        {isLogin ? "Login" : "Signup"}
      </h1>

      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-3 border rounded border-gray-900"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded border-gray-900"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
      >
        {isLogin ? "Login" : "Signup"}
      </button>


      <p className="text-center mt-4 text-sm">
        {isLogin ? "No account?" : "Already have one?"}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 ml-1 cursor-pointer"
        >
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>

    </div>
  );
}

export default Log;