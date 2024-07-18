import "./App.scss";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Client, IndexClient, Seances } from "@/components";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      `/client/seances/${new Date().toString().slice(0, 15).replace(/\s+/g, "-")}`,
    );
  }, []);

  return (
    <>
      <Routes>
        <Route path="/client/*" element={<Client />}>
          <Route path="seances/*" element={<IndexClient />}>
            <Route path=":day" element={<Seances />} />
          </Route>
					<Route path="*"  />
        </Route>
      </Routes>
    </>
  );
}

export default App;
