import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  return (
    <Elements stripe={stripe}>
      <PaymentForm name={name} email={email} phone={phone} />
    </Elements>
  );
};

export default Payment;
