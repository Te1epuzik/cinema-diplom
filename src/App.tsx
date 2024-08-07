import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFormatDate } from "@/hooks";
import { useGetAllData } from "@/services";
import {
  Client,
  IndexClient,
  Seances,
  Reservation,
  Hall,
  Payment,
  Book,
  Ticket,
  Admin,
  Login,
  Settings,
} from "@/components";

function App() {
  const seancesPath = useFormatDate(new Date());
  const allData = useGetAllData();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/client/seances" />} />
        <Route path="/client/" element={<Navigate to="/client/seances" />} />
        <Route path="/client/*" element={<Client />}>
          <Route path="seances/" element={<Navigate to={seancesPath} />} />
          <Route path="seances/*" element={<IndexClient />}>
            <Route path=":date" element={<Seances allData={allData} />} />
          </Route>
          <Route path="reservation/*" element={<Reservation />}>
            <Route path=":seanceInfo" element={<Hall allData={allData} />} />
          </Route>
          <Route path="payment/*" element={<Payment />}>
            <Route path=":bookInfo" element={<Book allData={allData} />} />
            <Route
              path="ticket/:bookInfo"
              element={<Ticket allData={allData} />}
            ></Route>
          </Route>
        </Route>
        <Route path="/admin/*" element={<Admin />}>
          <Route path="login" element={<Login />} />
          <Route path="settings" element={<Settings allData={allData} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
