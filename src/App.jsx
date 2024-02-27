import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import Register from "./pages/Register";
import ThankYouScreen from "./pages/ThankYouScreen";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Shop from "./pages/protected/Shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/register/successfull"
          element={<ThankYouScreen />}
        ></Route>
        <Route path="/payment/stripe" element={<Payment />}></Route>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
