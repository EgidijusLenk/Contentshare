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
  Slide,
  Accordion,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SunIcon,
} from "@chakra-ui/icons";
export default function SlideEx() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>Click Me</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Text>asde</Text>
        </Box>
      </Collapse>
    </>
  );
}
