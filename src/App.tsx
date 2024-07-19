import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { Client, IndexClient, Seances, Hall } from "@/components";

function App() {
  const seancesPath = `/client/seances/${new Date()
    .toString()
    .slice(0, 15)
    .replace(/\s+/g, "-")}`;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/client/seances" />} />
        <Route path="/client/*" element={<Client />}>
          <Route path="seances/" element={<Navigate to={seancesPath} />} />
          <Route path="seances/*" element={<IndexClient />}>
            <Route path=":day" element={<Seances />} />
          </Route>
          <Route path="hall" element={<Hall />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
