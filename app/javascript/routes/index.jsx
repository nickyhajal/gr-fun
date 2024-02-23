import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import ProofAdmin from "../components/ProofAdmin";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<ProofAdmin />} />
    </Routes>
  </Router>
);
