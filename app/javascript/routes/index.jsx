import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import ProofAdmin from "../components/ProofAdmin";
import SubmitResultPage from "../components/SubmitResultPage";
import SubmitTestimonialPage from "../components/SubmitTestimonialPage";
import TestimonialAdmin from "../components/TestimonialAdmin";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/share-results/:id" element={<SubmitResultPage />} />
      <Route
        path="/share-testimonial/:id"
        element={<SubmitTestimonialPage />}
      />
      <Route path="/admin" element={<ProofAdmin />} />
      <Route path="/admin/testimonials" element={<TestimonialAdmin />} />
    </Routes>
  </Router>
);
