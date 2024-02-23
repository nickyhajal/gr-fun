import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import ProofAdmin from "../components/ProofAdmin";
import SubmitResultPage from "../components/SubmitResultPage";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/share-results/:id" element={<SubmitResultPage />} />
      <Route path="/admin" element={<ProofAdmin />} />
    </Routes>
  </Router>
);
