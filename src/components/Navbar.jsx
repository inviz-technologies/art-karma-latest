import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { NavLink as RouterNavLink } from "react-router-dom";
import { logoSmall } from "../assets";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const Links = [
  { label: "Shop", icon: <CiShop />, link: "/shop" },
  { label: "Chat", icon: <TiMessages />, link: "/chat" },
  { label: "Orders", icon: <CiShop />, link: "/cart" },
];

const NavLink = (props) => {
  const { children, to } = props;

  return (
    <Box
      as={RouterNavLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
      }}
      to={to}
    >
      {children}
    </Box>
  );
};
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box as="header" bg={"black"}>
      <Container py={5} maxW={"1200px"} as="nav" color={"white"}>
        <>
          <Box px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
              <IconButton
                size={"md"}
                icon={
                  isOpen ? (
                    <IoClose size={35} color={"white"} />
                  ) : (
                    <IoIosMenu size={35} color={"white"} />
                  )
                }
                aria-label={"Open Menu"}
                display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}
              />
              <Button
                onClick={handleLogout}
                title="Logout"
                background={"#fff"}
              />
              <HStack spacing={8} alignItems={"center"}>
                <Image
                  src={logoSmall}
                  alt="art karma logo"
                  objectFit={"contain"}
                />
              </HStack>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link, i) => (
                  <NavLink to={link.link} key={i}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      {link.icon}
                      {link.label}
                    </Box>
                  </NavLink>
                ))}
              </HStack>
            </Flex>

            {isOpen ? (
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4}>
                  {Links.map((link, i) => (
                    <NavLink to={link.link} key={i}>
                      {link.icon} {link.label}
                    </NavLink>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
        </>
      </Container>
    </Box>
  );
};

export default Navbar;
