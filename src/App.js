import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Traders from "./pages/Traders";
import TraderDetails from "./pages/TraderDetails";
import Apply from "./pages/Apply";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AdminApplications from "./pages/AdminApplications";
import ApplicationDetails from "./pages/ApplicationDetails";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/traders" element={<Traders />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/AdminApplications"
          element={<AdminApplications />}
        />
        <Route
          path="/admin/applications/:id"
          element={<ApplicationDetails />}
        />
        <Route
  path="/trader-details/:id"
  element={<TraderDetails />}
/>
      </Routes>
      <Footer />
  
    </BrowserRouter>

  );
}

export default App;