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
import { useSelector } from "react-redux";
import Product from "./pages/protected/Product";

function App() {
  let auth = useSelector((state) => state.authSlice);
  const PrivateRoutes = () => {
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register/successful" element={<ThankYouScreen />} />
        <Route path="/payment/stripe" element={<Payment />} />

        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/shop" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/login"
          shouldRevalidate={true}
          element={
            !auth.isAuthenticated ? <Login /> : <Navigate to={"/shop"} />
          }
        />

        <Route element={<PrivateRoutes />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
