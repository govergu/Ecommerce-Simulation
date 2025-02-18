import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./paths/dashboard";
import Cart from "./paths/Cart";
import LoginSignup from "./paths/LoginSignup";
import Navbar from "./component/Navbar";
import Overview from "./paths/Overview";
import { ToastContainer } from "react-toastify";
import SearchItem from "./component/SearchedItem";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/register" element={<LoginSignup />}></Route>
          <Route path="/overview" element={<Overview />}></Route>
          <Route path="/searchitem" element={<SearchItem />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
