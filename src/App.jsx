import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./Containers/Home";
import ManageForm from "./Containers/ManageForm";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/manage-form/:formId" element={<ManageForm />} />
      <Route exact path="/create-form" element={<ManageForm isNew />} />
    </Routes>
  );
};

export default App;
