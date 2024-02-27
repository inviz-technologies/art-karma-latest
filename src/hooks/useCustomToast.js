import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const successToast = (options) => {
    toast({
      ...options,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const errorToast = (options) => {
    toast({
      ...options,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return { successToast, errorToast };
};

export default useCustomToast;
