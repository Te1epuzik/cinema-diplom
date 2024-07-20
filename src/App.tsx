import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFormatDate } from "./hooks";
import {
  Client,
  IndexClient,
  Seances,
  Reservation,
  Hall,
  Payment,
  Book,
} from "@/components";

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
          <Route path="payment/*" element={<Payment />}>
            <Route path=":bookInfo" element={<Book />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
