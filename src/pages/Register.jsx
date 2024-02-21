import { useState } from "react";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Container,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    tel: "",
    eventDate: "",
    eventName: "",
    otherEventName: "",
    shippingOption: "",
    quantityAndOrders: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEventNameChange = (event) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      eventName: value,
      otherEventName: value === "Other" ? "" : prevState.otherEventName,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users`,
        formState
      );
      if (data) {
        setIsLoading(false);
        toast({
          title: "Information Recieved!",
          description:
            "We've recieved your information will get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setFormState({
          name: "",
          email: "",
          tel: "",
          eventDate: "",
          eventName: "",
          otherEventName: "",
          shippingOption: "",
          quantityAndOrders: "",
        });
        navigate("/register/successfull");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  return (
    <Container
      maxW={"4xl"}
      border="1px solid #ccc"
      borderRadius="lg"
      p={8}
      textAlign="center"
      mt={6}
      bg="#ffffff"
    >
      <Heading as="h4" fontWeight="normal" size="xl" mb="5" color="#515151">
        Inquiry Form
      </Heading>
      <Text mb="4" fontSize="18px" color="#515151">
        Please provide the following details and we’ll get back to you with
        additional information as soon as possible.
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Name
            </FormLabel>
            <Input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Your Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="Your Email Address"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Tel
            </FormLabel>
            <Input
              type="tel"
              name="tel"
              value={formState.tel}
              onChange={handleInputChange}
              placeholder="Your Phone Number"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Event Date
            </FormLabel>
            <Input
              type="date"
              name="eventDate"
              value={formState.eventDate}
              onChange={handleInputChange}
              placeholder="Event Date"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Event Name
            </FormLabel>
            <Select
              name="eventName"
              placeholder="Select Event"
              value={formState.eventName}
              onChange={handleEventNameChange}
            >
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Memorial">Memorial</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          {formState.eventName === "Other" && (
            <FormControl id="otherEventName">
              <FormLabel color="#515151" fontWeight="normal">
                Other Event Name
              </FormLabel>
              <Input
                type="text"
                name="otherEventName"
                value={formState.otherEventName}
                onChange={handleInputChange}
                placeholder="Right Here"
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Do you plan to ship flowers or are you a local customer?
            </FormLabel>
            <Select
              name="shippingOption"
              placeholder="Select Option"
              value={formState.shippingOption}
              onChange={handleInputChange}
            >
              <option value="Local Customer (Houston Texas)">
                Local Customer (Houston Texas)
              </option>
              <option value="Shipping flowers">Shipping flowers</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color="#515151" fontWeight="normal">
              Quantity
            </FormLabel>
            <Input
              type="number"
              name="quantityAndOrders"
              value={formState.quantityAndOrders}
              onChange={handleInputChange}
              placeholder="Tell us the quantity and items you would like to order"
            />
          </FormControl>
          <Button
            type="submit"
            bg="#D49C2A"
            color="#ffffff"
            isLoading={isLoading}
            loadingText="Registering..."
          >
            Send
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Register;
