import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateContent from './CreateContent';
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
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SunIcon,
} from '@chakra-ui/icons';
function Dashboard({authStateParent}) {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);
    const [items, setItems] = useState([])
    const [user, setUser] = useState([])
    const [item, setItem] = useState({})
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const domain = window.location.hostname
    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer`
      }
      
    function showContent(){
        headers["Authorization"] =  `Bearer ${localStorage.getItem("token")}`
        axios.get("http://localhost:8000/users/me", {headers: headers})
        .then(res => { setItems(res.data.contents);setUser(res.data)})
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))
    }
    useEffect(showContent, [CreateContent]);

    if (!items) return null;
    
    function logOut(){
        dispatch({
            type: "LOGOUT",
        })
    }
    function copyToClipboard(e) {
        console.log(`${domain}/${e}`);
        navigator.clipboard.writeText(`https://${domain}/g/${e}`);
    }
    function handleEditItemSubmit(event) {
        event.preventDefault();
        
        headers["Authorization"] =  `Bearer ${localStorage.getItem("token")}`
        axios.patch(`http://localhost:8000/content/${item.id}`, JSON.stringify(item), {headers: headers})
        .then(function(){
            showContent();
            document.getElementById('closeeditItemModal').click();})
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`)) 
        
        return
    }
    
    function handleEditItemInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setItem(values => ({...values, [name]: value}))
        // console.log(`${event.target.value} set`)
        
    }
    function editItem(item){
        setItem({"id": item.id,"content_url": item.content_url,"backbutton_url": item.backbutton_url, "display_ad_url": item.display_ad_url})
        // console.log(` ${item.id} hue`)
    }
    return (
        <div>
          <Container maxW='container.lg' mt={10}>
            <Box >
            asdd
            <VStack spacing='24px'>
              <Box  borderRadius={7} bg='gray.100' boxShadow={'lg'} borderLeftWidth={7}
                    _hover={{
                    textDecoration: 'none',
                    bg: 'pink.50',
                    borderLeftColor: "pink.300"
                    }}>
              
                <Grid templateColumns='repeat(12, 1fr)' gap={3} pb={1} pt={1} >
                  <GridItem   >45</GridItem>
                  <GridItem    ><SunIcon/></GridItem>
                  <GridItem   colStart={3} colEnd={10} overflow="hidden">https://stakoverflow.com/https://stackoverflow.com/https://stackoverflow.com/ </GridItem>
                  {/* <GridItem colStart={4} colEnd={5} h='10' bg='papayawhip' /> */}
                  <GridItem colStart={12} colEnd={14} h='6'  > 10886 <br/>clicks</GridItem>
                </Grid>
                <HStack>
                  <ButtonGroup size='sm' isAttached variant='outline' pl={3} pb={3}>
                    <Button mr='-px' w={40} overflow="hidden" >stackoverflow.com/</Button>
                    <Button mr='-px'>Visit</Button>
                    <Button mr='-px'>Edit</Button>
                    
                  </ButtonGroup>
                </HStack>
              </Box>
              </VStack>
            </Box>
          </Container>
        <Box bg='' w='100%' p={4} color='white'>
          
        






            <div className="container-sm">
            
            
            

            <div className="col col-lg-10">

      <CreateContent updateTable={showContent}/>
            <ul className="list-group">
                
               {items.filter((item) => {return item.content_url.includes("YC") || item.shortened_url.includes("YC") }).map((item, key) => {
                        return  <div className="list-group-item list-group-item-action" key={item.id}>
                                    <div className="row justify-content-between">
                                    <div className='col-auto '>{item.content_url}</div> 
                                    <div className='col-auto'>
                                        <span className="badge bg-secondary">{item.click_count} clicks</span> 
                                    </div> 
                                    </div>
                                    <div className='row'>
                                        <div className='col-auto'>
                                            <div className="btn-group btn-group-sm" role="group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text" id="btnGroupAddon">ID {item.id}</div>
                                                </div>
                                                <button type="button" className="btn btn-outline-primary text-truncate"  onClick={ () => copyToClipboard(item.shortened_url)} data-bs-toggle="tooltip" data-bs-placement="left" title="Copy">{domain}/{item.shortened_url} </button>
                                                <button type="button" className="btn btn-outline-primary" onClick={() => window.open(`https://${domain}/g/${item.shortened_url}`, '_blank').focus()}>Visit</button>
                                                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editItemModalLabel" onClick={() => editItem(item)} >Edit</button>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                
                    }).reverse()}
               
            </ul>
            </div>

            </div>
            <br/>

<div className="modal fade" id="editItemModalLabel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" id="closeeditItemModal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleEditItemSubmit}>
      <div className="modal-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Content link*</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="content_url" onChange={handleEditItemInputChange} value={item.content_url}/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Backbutton link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="backbutton_url" onChange={handleEditItemInputChange} value={item.backbutton_url}/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Display ad link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="display_ad_url" onChange={handleEditItemInputChange} value={item.display_ad_url}/>
              </div>
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
            </form>
      </div>
    </div>
  </div>
</div>


</Box>
        </div>

    )
}


export default Dashboard