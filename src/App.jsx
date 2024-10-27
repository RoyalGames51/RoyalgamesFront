import { useState } from 'react'
import { Container, Box,Text, Flex } from '@chakra-ui/react';
import Nav from './components/Nav/nav';
import Novedades from './components/Novedades/novedades';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/home';
import Footer from './components/footer/footer';

function App() {
  

  return (
    <Container
    bgColor={"#a4a4a4"}
    maxW="100%"  w="100%"
    maxH="100%" h="100%"
    // bgSize="cover"
    // bgAttachment={"fixed"}
    // h={pathname != "/" ? "130vh" : undefined}
    mt={0}
    p={0}
    >
      <Nav/>

      <Routes>
      
        <Route path='/' element={<Home />} /> 
        {/* <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} /> */}
      </Routes>
      <Footer/>
    </Container>
  )
}

export default App;
