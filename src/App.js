
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLanding from "./pages/DefaultLanding";
import CafeLanding from "./pages/CafeLanding";
import CafeSignIn from "./pages/CafeSignIn";
import CafeRegister1 from "./pages/CafeRegister1";
import CafeRegister2 from "./pages/CafeRegister2";
import CafeMapCreating from "./pages/CafeMapCreating";
import CafeMapCreated from "./pages/CafeMapCreated";
import UserLanding from "./pages/UserLanding";
import UserHome from "./pages/UserHome";
import UserAfterSearch from "./pages/UserAfterSearch";
import CafeHomeBeanUpdate from "./pages/CafeHomeBeanUpdate";
import CafeTableInfo from "./pages/CafeTableInfo";

import TestTableStatusCard from "./pages/TestTableStatusCard";
import TestSeatStartCard from "./pages/TestSeatStartCard";
import TestTableMetaCard from "./pages/TestTableMetaCard.jsx";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DefaultLanding />} />
          <Route path="/cafe-landing" element={<CafeLanding />} />
          <Route path="/cafe-signin" element={<CafeSignIn />} />
          <Route path="/cafe-register-1" element={<CafeRegister1 />} />
          <Route path="/cafe-register-2" element={<CafeRegister2 />} />
          <Route path="/cafe-map-creating" element={<CafeMapCreating />} />
          <Route path="/cafe-map-created" element={<CafeMapCreated />} />

          <Route path="/user-landing" element={<UserLanding />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/user-after-search" element={<UserAfterSearch />} />

          <Route path="/cafe-update" element={<CafeHomeBeanUpdate />} />
          <Route path="/cafe-tables" element={<CafeTableInfo />} />
          <Route path="/test-card" element={<TestTableStatusCard />} />
          <Route path="/test-seat-start" element={<TestSeatStartCard />} />
          <Route path="/test-table-meta" element={<TestTableMetaCard />} />

        </Routes>
      
      </div>
    </Router>
  );
}


export default App; 

