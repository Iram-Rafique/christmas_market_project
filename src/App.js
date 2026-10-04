import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Traders from "./pages/Traders";
import Apply from "./pages/Apply";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/traders" element={<Traders />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
             <Footer />
    </BrowserRouter>
    
  );
}

export default App;