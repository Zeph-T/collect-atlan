import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./Containers/Home";
import ManageForm from "./Containers/ManageForm";
import PreviewForm from "./Containers/PreviewForm";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/manage-form/:formId" element={<ManageForm />} />
      <Route exact path="/form/:formId" element={<PreviewForm />} />
    </Routes>
  );
};

export default App;
