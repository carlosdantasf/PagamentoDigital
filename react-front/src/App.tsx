import './App.css'
import Home from './pages/home/Home'
import Seller from './pages/seller/Seller'
import Dashboard from './pages/dashboard/Dashboard';
import TicketDetails from './pages/detailsTicket/TicketDetails';
import PixDisabled from "./pages/pixDisabled/PixDisabled.tsx";

import { FilterProvider } from './context/FilterContext.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      <FilterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/seller/:station' element={<Seller />} />
        <Route path="/tickets-list" element={<Dashboard />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path={"/pix-disabled"} element={<PixDisabled />} />
      </Routes>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App