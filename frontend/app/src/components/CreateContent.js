import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Center,

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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SunIcon,
} from '@chakra-ui/icons';
function CreateContent({updateTable}) {
  const [content_url, setContenturl] = useState("");
  const [intialValues, setInputs] = useState({"content_url":"","backbutton_url":"", "display_ad_url": ""});
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer`
    }
    function submit() {
      headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`  
      axios.post("http://localhost:8000/content", JSON.stringify(formValues), {headers: headers})
      .then(function (res) {
        alert(`Content created, short link: ${res.data.shortened_url}`);
        document.getElementById('closeCreateItemModal').click();
    })
      .then(updateTable)
      .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))  
    }

      //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // if (!values.email) {
    //   errors.email = "Cannot be blank";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "Invalid email format";
    // }

    if (!values.content_url) {
      errors.content_url = "Content url is required";
    } else if (values.content_url.length < 5) {
      errors.content_url = "Are you sure it is a valid url?";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

    return (
        <>
            {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Form submitted successfully</span>
      )}


       <VStack  spacing='24px' pb={2} align='stretch' >
         <Box borderRadius={7} bg='gray.50' boxShadow={'2xl'} borderLeftWidth={7} borderLeftColor="pink.300"
                    >
                      <Container m={1}>

                      <form onSubmit={handleSubmit} noValidate>
                      <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
      
      bg={useColorModeValue('gray.50', 'gray.800')}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        // bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        // boxShadow={'lg'}
        p={6}
        my={1}>
          <Text align="left" fontSize={{ base: 'xl', md: 'xl' }}>
          Create new content link
        </Text>
        <FormControl isInvalid={formErrors.content_url} id="content_url" isRequired>
          <FormLabel mb={0} fontWeight="normal">Content url</FormLabel>
          <Input
          id="content_url" 
          name="content_url"
          value={formValues.content_url}
          onChange={handleChange}
          bg={useColorModeValue('white', 'gray.700')}
            placeholder="https://recipes.com/freshbuns"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
          <FormErrorMessage>{formErrors.content_url}</FormErrorMessage>
        </FormControl>
        <FormControl id="backbutton_url" >
          <FormLabel mb={0} fontWeight="normal">Backbutton url</FormLabel>
          <Input 
          id="backbutton_url" 
          name="backbutton_url"
          value={formValues.backbutton_url}
          onChange={handleChange}
          bg={useColorModeValue('white', 'gray.700')}
            placeholder="https://popads.com/affid=123456"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="display_ad_url" >
          <FormLabel mb={0} fontWeight="normal">Display ad url</FormLabel>
          <Input 
          id="display_ad_url" 
          name="display_ad_url"
          value={formValues.display_ad_url}
          onChange={handleChange}
          bg={useColorModeValue('white', 'gray.700')}
            placeholder="https://displayads.com/affid=123456"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button 
                          display={{ base: 'none', md: 'inline-flex' }}
                          fontSize={'sm'}
                          fontWeight={600}
                          color={'white'}
                          bg={'pink.300'}
                          w="full"
                          _hover={{
                            bg: 'pink.200',
                          }}>
            Cancel
          </Button>
          <Button 
                          display={{ base: 'none', md: 'inline-flex' }}
                          fontSize={'md'}
                          fontWeight={600}
                          color={'white'}
                          bg={'pink.400'}
                          w="full"
                          _hover={{
                            bg: 'pink.300',
                          }}
                        type='submit'>
            Create new content
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
                      </Container>
         </Box>
              </VStack>

























{/* 
<div className="modal fade" id="createItemModal" tabIndex="-1" aria-labelledby="createItemModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="createItemModalLabel">Create link</h5>
        <button type="button" className="btn-close" id="closeCreateItemModal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Content link*</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="content_url" onChange={handleInputChange} value={inputs.content_url}/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Backbutton link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="backbutton_url" onChange={handleInputChange} value={inputs.backbutton_url}/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Display ad link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="display_ad_url" onChange={handleInputChange} value={inputs.display_ad_url}/>
              </div>
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
            </form>
    </div>
  </div>
</div> */}






        </>
    )
}




export default CreateContent