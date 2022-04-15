import React, { useState, useEffect } from "react";
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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Accordion,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useToast,
  Divider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { jsx } from "@emotion/react";
export default function ContentItem(item) {
  const { isOpen, onToggle } = useDisclosure();
  // const [item, setItem] = useState({})

  const domain = window.location.hostname;
  const toast = useToast();
  const visitLink = (e) => {
    window.open(`https://${domain}/g/${e}`, "blank");
  };
  function copyToClipboard(e) {
    console.log(`${domain}/${e}`);
    navigator.clipboard.writeText(`https://${domain}/g/${e}`);
    toast({
      title: "Link copied",
      description: `https://${domain}/g/${e}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <>
      <VStack key={item.shortened_url} spacing="24px" pb={2} align="stretch">
        <Box
          borderRadius={7}
          boxShadow={"lg"}
          borderLeftWidth={7}
          borderLeftColor={!isOpen ? "white" : "pink.300"}
          bg={!isOpen ? "white" : "gray.50"}
          _hover={{
            textDecoration: "none",
            borderLeftColor: "pink.300",
          }}
        >
          <Grid templateColumns="repeat(12, 1fr)" gap={3} pb={1} pt={1}>
            <GridItem>{item.id}</GridItem>
            <GridItem>
              <SunIcon />
            </GridItem>
            <GridItem
              colStart={3}
              colEnd={11}
              overflow="hidden"
              textAlign="left"
            >
              {item.content_url}{" "}
            </GridItem>
            <GridItem colStart={12} colEnd={14} h="6">
              {" "}
              10886 <br />
              clicks
            </GridItem>
          </Grid>
          <HStack>
            <ButtonGroup size="sm" isAttached variant="outline" ml={3} mb={3}>
              <Button
                bg="pink.50"
                mr="-px"
                w={40}
                overflow="hidden"
                onClick={() => copyToClipboard(item.shortened_url)}
                _hover={{ color: "white", bg: "pink.300" }}
              >
                {domain}/{item.shortened_url}
              </Button>
              <Button
                onClick={() => visitLink(item.shortened_url)}
                bg="pink.50"
                mr="-px"
                _hover={{ color: "white", bg: "pink.300" }}
              >
                Visit
              </Button>
              <Button
                bg="pink.50"
                mr="-px"
                onClick={onToggle}
                _hover={{ color: "white", bg: "pink.300" }}
              >
                Edit
              </Button>
            </ButtonGroup>
          </HStack>
          <Collapse in={isOpen} animateOpacity>
            <Container m={1}>
              <Flex
                // minH={'100vh'}
                align={"center"}
                justify={"center"}
              >
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  // bg={useColorModeValue('white', 'gray.700')}
                  rounded={"xl"}
                  // boxShadow={'lg'}
                  p={6}
                  my={1}
                >
                  <FormControl id="content_url" isRequired>
                    <FormLabel>Content url</FormLabel>
                    <Input
                      bg={useColorModeValue("white", "gray.700")}
                      placeholder="https://recipes.com/freshbuns"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="backbutton_url">
                    <FormLabel>Backbutton url</FormLabel>
                    <Input
                      bg={useColorModeValue("white", "gray.700")}
                      placeholder="https://popads.com/affid=123456"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="display_ad_url">
                    <FormLabel>Display ad url</FormLabel>
                    <Input
                      bg={useColorModeValue("white", "gray.700")}
                      placeholder="https://displayads.com/affid=123456"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                    />
                  </FormControl>
                  <Stack spacing={6} direction={["column", "row"]}>
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"pink.300"}
                      w="full"
                      _hover={{
                        bg: "pink.200",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"md"}
                      fontWeight={600}
                      color={"white"}
                      bg={"pink.400"}
                      w="full"
                      _hover={{
                        bg: "pink.300",
                      }}
                      type="submit"
                    >
                      Create new content
                    </Button>
                  </Stack>
                </Stack>
              </Flex>
            </Container>
          </Collapse>
        </Box>
      </VStack>
    </>
  );
}
