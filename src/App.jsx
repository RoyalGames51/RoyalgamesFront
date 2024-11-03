import { useState } from 'react'
import { Container, Box,Text, Flex } from '@chakra-ui/react';
import Nav from './components/Nav/nav';
import Novedades from './components/Novedades/novedades';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/home';
import Footer from './components/footer/footer';
import { AuthProvider } from './context/oauthContext';
import Perfil from './components/Perfil/perfil';
import BuyChips from './components/Buychips/buyChips';
import LogOut from './components/Logout/logout';
import Panel from './components/Panel/panelAdmin';
import GameGrid from './components/Juegos/juegos';
import News from './components/News/news';

function App() {
  

  return (
    <Container
    bgColor={"white"}
    maxW="100%"  w="100%"
    maxH="100%" h="100%"
    // bgSize="cover"
    // bgAttachment={"fixed"}
    // h={pathname != "/" ? "130vh" : undefined}
    mt={0}
    p={0}
    >
      <AuthProvider>
      <Nav/>

      <Routes>
      
        <Route path='/' element={<Home />} /> 
         <Route path='/perfil' element={<Perfil />} />
         <Route path='/juegos' element={<GameGrid />} />
        <Route path='/chips' element={<BuyChips />} /> 
        <Route path='/logout' element={<LogOut />} /> 
        <Route path='/panel' element={<Panel/>}/>
        <Route path='/novedades' element={<News/>}/>
        
      </Routes>
      <Footer/>
      </AuthProvider>
    </Container>
  )
}

export default App;
