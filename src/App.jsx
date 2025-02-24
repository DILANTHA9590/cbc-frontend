import { useState } from "react";
import Loginpage from "./pages/loginpage";
import Homepage from "./pages/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminhomepage";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpUser from "./pages/signup";

// import Fileuploadtest from "./pages/test"; me api product pic add karanna promise eka hadagatahtah eka

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster

        // position="top-left"
        // reverseOrder={false}
        />

        <GoogleOAuthProvider clientId="1063592002846-3029fm707o7bdjg1rn98ktnhesm4o6s7.apps.googleusercontent.com">
          <Routes path="/*">
            <Route path="/*" element={<Homepage />} />

            <Route path="/admin/*" element={<AdminPage />} />

            <Route path="/login" element={<Loginpage />} />

            <Route path="/signup" element={<SignUpUser />} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
