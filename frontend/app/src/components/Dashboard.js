import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateContent from "./CreateContent";
import ContentItem from "./ContentItem";
import SlideEx from "./SlideEx";
import { AuthContext } from "../App";
import {
  Container,
  Box,
  HStack,
  VStack,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  GridItem,
  Grid,
  ButtonGroup,
  Heading,
  Spacer,
  Input,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Accordion,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SunIcon,
} from "@chakra-ui/icons";
function Dashboard({ authStateParent }) {
  const { state: authState } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [searchItems, setsearchItems] = useState([]);
  const [user, setUser] = useState([]);

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer`,
  };

  function search(event) {
    const value = event.target.value;
    console.log(value);
    setsearchItems(
      items.filter((item) => {
        return (
          item.content_url.includes(value) || item.shortened_url.includes(value)
        );
      })
    );
    console.log(searchItems);
  }
  function showContent() {
    headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://localhost:8000/users/me", { headers: headers })
      .then((res) => {
        setItems(res.data.contents);
        setsearchItems(res.data.contents);
        setUser(res.data);
        onClose();
      })
      .catch((err) => alert(`${JSON.stringify(err.response.data.detail)}`));
  }
  useEffect(showContent, [ContentItem]);

  return (
    <div>
      <Container maxW="container.lg" mt={10} px={7}>
        <Box>
          <Flex mb={3}>
            <Box>
              <Button
                onClick={onToggle}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Add new
              </Button>
            </Box>
            <Spacer />
            <Box>
              <Input
                boxShadow="base"
                bg="white"
                placeholder="Search"
                onChange={search}
                on
              />
            </Box>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <CreateContent showContent={showContent} />
          </Collapse>
          {searchItems
            .map((item, key) => {
              return <ContentItem {...item} />;
            })
            .reverse()}
        </Box>
      </Container>
    </div>
  );
}

export default Dashboard;
