import { Routes, Route } from "react-router-dom";
import Forside from "./pages/index.jsx";
import Detail from "./pages/detail.jsx";
import "./style/index.scss";
import Settings from "./pages/settings.jsx";
import Explore from "./pages/explore.jsx";
import Bookmark from "./pages/bookmark.jsx";
import Ticket from "./pages/ticketbooking.jsx";
import Checkout from "./pages/checkout.jsx";
import ETicket from "./pages/eticket.jsx";
import PersonalForm from "./pages/personalform.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/eticket" element={<ETicket />} />
        <Route path="/personalform" element={<PersonalForm />} />
      </Routes>
    </>
  );
}

export default App;
