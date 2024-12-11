import { Box, Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from "../components/Authentication/Login.js";
import Register from "../components/Authentication/Register.js";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';

const Homepage = () => {
 const history =useHistory();
    useEffect(()=>{
      const user=  JSON.parse(localStorage.getItem("userInfo"));
      if(user){
        history.push("/chats")
      }
    },[history])

  return (
    <Container maxW='xl' centerContent> 
      <Box
      d='flex'
      justifyContent={"center"}
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="35px"
      borderWidth="1px"
      >
       <Text justifyContent={"center"} margin={"0 20% 0 20%"} fontSize={'xxx-large'} fontFamily="Work sans" color={"black"}>Chat-Around</Text>
      </Box>
      <Box bg="white" w="100%" color={"black"} p={4} borderRadius={"35px"} borderWidth={"1px"}>
        <Tabs variant='soft-rounded'>
  <TabList mb={"1em"}>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Register</Tab>
  </TabList>
  <TabPanels>
    <TabPanel><Login /></TabPanel>
    <TabPanel><Register /></TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
