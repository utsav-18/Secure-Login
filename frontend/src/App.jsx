import { useState, useEffect } from "react";
import Log from "./Log";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="app-root">
      {showAlert && (
        <div className={`alert ${alertType === "success" ? "alert-success" : "alert-error"}`}>
          {message}
        </div>
      )}

      <Log
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setMessage={setMessage}
        setAlertType={setAlertType}
        setShowAlert={setShowAlert}
      />
    </div>
  );
}

export default App;