import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ThankYouScreen from "./pages/ThankYouScreen";
import Payment from "./pages/Payment";

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
      </Routes>
    </Router>
  );
}

export default App;
