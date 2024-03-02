import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import ThankYouScreen from "./pages/ThankYouScreen";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Shop from "./pages/protected/Shop";
import Cart from "./pages/protected/Cart";
import { Outlet } from "react-router-dom";
import Chat from "./pages/protected/Chat";

const PrivateRoutes = () => {
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register/successful" element={<ThankYouScreen />} />
        <Route path="/payment/stripe" element={<Payment />} />

        <Route path="/" element={<Navigate to="/login" replace={true} />} />

        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Chat />} />
          <Route path="/chat" element={<Cart />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
