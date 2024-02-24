import "./PaymentForm.css";
import axios from "axios";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const PaymentForm = ({ name, email, phone }) => {
  const toast = useToast();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    name: name || "",
    email: email || "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    state: "",
    phone: phone | "",
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const getClientSecret = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/create-intent`,
        { amount: 100 }
      );
      if (data) {
        return data?.data?.paymentIntent?.client_secret;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured",
        description: error?.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = await getClientSecret();
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: paymentData?.name,
          email: paymentData?.email,
          address: {
            city: paymentData?.city,
            country: paymentData?.country,
            line1: paymentData?.address,
            postal_code: paymentData?.postalCode,
            state: paymentData?.state,
          },
          phone: paymentData?.phone,
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      // alert(paymentResult.error.message);
      toast({
        title: "Error occured",
        description: paymentResult.error.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        // alert("Success!");
        toast({
          title: "Success!",
          description: "Payment successfull!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setPaymentData({});
    }
  };

  return (
    <Box padding="2rem">
      <Box
        border="1px solid #999"
        p="6"
        borderRadius="md"
        maxW={"2xl"}
        margin="0 auto"
      >
        <Text
          as="h1"
          textAlign="center"
          fontSize="25px"
          fontWeight="bold"
          color="gray.600"
          mb="4"
        >
          Art Karma Advance Payment 💴
        </Text>
        <form onSubmit={handlePayment}>
          <Flex direction="column" alignItems="center">
            <FormControl id="name" mb="1rem">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="John Doe"
                border="1px solid #ccc"
                name="name"
                value={paymentData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email" mb="1rem">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                border="1px solid #ccc"
                name="email"
                value={paymentData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="address" mb="1rem">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="123 Main St"
                border="1px solid #ccc"
                name="address"
                value={paymentData.address}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="city" mb="1rem">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                placeholder="New York"
                border="1px solid #ccc"
                name="city"
                value={paymentData.city}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="country" mb="1rem">
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                placeholder="US"
                border="1px solid #ccc"
                name="country"
                value={paymentData.country}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="postalCode" mb="1rem">
              <FormLabel>Postal Code</FormLabel>
              <Input
                type="text"
                placeholder="10001"
                border="1px solid #ccc"
                name="postalCode"
                value={paymentData.postalCode}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="state" mb="1rem">
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                placeholder="NY"
                border="1px solid #ccc"
                name="state"
                value={paymentData.state}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="state" mb="1rem">
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                placeholder="Phone"
                border="1px solid #ccc"
                name="phone"
                value={paymentData.phone}
                onChange={handleChange}
              />
            </FormControl>
            <Box w="full">
              <Text
                as="h4"
                fontSize="18px"
                fontWeight="bold"
                color="gray.600"
                mb="2"
              >
                Card Details
              </Text>
              <CardElement
                className="card"
                options={{
                  style: {
                    base: {
                      backgroundColor: "white",
                    },
                  },
                }}
              />
            </Box>

            <Button
              w="full"
              mt="1rem"
              colorScheme="blue"
              isLoading={isPaymentLoading}
              type="submit"
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default PaymentForm;

// <div
//   style={{
//     padding: "3rem",
//   }}
// >
//   <div
//     style={{
//       maxWidth: "500px",
//       margin: "0 auto",
//     }}
//   >
//     <form
//       style={{
//         display: "block",
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <CardElement
//           className="card"
//           options={{
//             style: {
//               base: {
//                 backgroundColor: "white",
//               },
//             },
//           }}
//         />
//         <button className="pay-button" disabled={isPaymentLoading}>
//           {isPaymentLoading ? "Loading..." : "Pay"}
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
