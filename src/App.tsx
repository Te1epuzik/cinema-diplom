import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { Client, IndexClient, Seances, Reservation, Hall } from "@/components";
import { useFormatDate } from "./hooks";

function App() {
  const seancesPath = useFormatDate(new Date());

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/client/seances" />} />
        <Route path="/client/" element={<Navigate to="/client/seances" />} />
        <Route path="/client/*" element={<Client />}>
          <Route path="seances/" element={<Navigate to={seancesPath} />} />
          <Route path="seances/*" element={<IndexClient />}>
            <Route path=":date" element={<Seances />} />
          </Route>
          <Route path="reservation/*" element={<Reservation />}>
            <Route path=":seanceInfo" element={<Hall />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
