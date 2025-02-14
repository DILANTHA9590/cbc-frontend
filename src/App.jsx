import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Loginpage from "./pages/loginpage";
import Homepage from "./pages/homepage";
import AdminPage from "./pages/adminhomepage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Toaster />
      <GoogleOAuthProvider clientId="1063592002846-3029fm707o7bdjg1rn98ktnhesm4o6s7.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="*" element={<h1>404 Error - Page Not Found</h1>} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
