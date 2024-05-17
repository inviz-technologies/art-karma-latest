import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const user = searchParams.get("user");

  return (
    <Elements stripe={stripe}>
      <PaymentForm user={user} name={name} email={email} phone={phone} />
    </Elements>
  );
};

export default Payment;
