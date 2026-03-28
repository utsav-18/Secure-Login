import { useState, useEffect } from "react";
import Log from "./Log";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      
      {/* Alert Component */}
      {showAlert && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg animate-pulse ${
          alertType === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
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
        message={message}
        setMessage={setMessage}
        alertType={alertType}
        setAlertType={setAlertType}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />


      
    </div>
  );
} 



export default App;