import "./App.scss";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Client, IndexClient } from "@/components";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      `/client/${new Date().toString().slice(0, 15).replace(/\s+/g, "-")}`,
    );
  }, []);

  return (
    <>
      <Routes>
        <Route path="/client/*" element={<Client />}>
          <Route path="*" element={<IndexClient />}>
            <Route path=":day" />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
