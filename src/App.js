import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar.jsx";
import Create from "./components/Create.jsx";
import Deposit from "./components/Deposit.jsx";
import Withdraw from "./components/Withdraw.jsx";
import Alldata from "./components/Alldata.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import "./styles.css";
import Login from "./components/Login.jsx";
import LoginPage from "./components/loginHome.jsx";
import LoginAdmin from "./components/AdminLogin.jsx";


export default function App() {


 
  return (
    <div className="App">
      <HashRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/admin-login" element={<LoginAdmin />}></Route>
          <Route path="/user-login" element={<Login />}></Route>
          <Route path="/deposit" element={<Deposit />}></Route>
          <Route path="/withdraw" element={<Withdraw />}></Route>
          <Route path="/alldata" element={<Alldata />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
