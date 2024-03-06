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

function App() {
  let auth = useSelector((state) => state.authSlice);
  const PrivateRoutes = () => {
    console.log("auth test", auth.isAuthenticated);
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
          element={auth.isAuthenticated && <Login />}
        />

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
