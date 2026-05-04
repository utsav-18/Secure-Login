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
    <div className="auth-card">
      <section className="card-body">
        <h2 className="title">{isLogin ? "Welcome back" : "Create your account"}</h2>
        <p className="subtitle">{isLogin ? "Login to continue" : "Sign up to start"}</p>

        <div className="form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              className="input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={isDisabled} className={`btn ${isDisabled ? 'disabled' : 'primary'}`}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="switch">
          {isLogin ? "No account?" : "Already have one?"}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="link">
            {isLogin ? " Signup" : " Login"}
          </button>
        </p>
      </section>
    </div>
  );
}

export default Log;