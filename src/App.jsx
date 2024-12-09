import { useState, useEffect } from 'react';
import { Container, Box, Image, Button } from '@chakra-ui/react';
import Nav from './components/Nav/nav';
import Footer from './components/footer/footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import { AuthProvider } from './context/oauthContext';
import Perfil from './components/Perfil/perfil';
import BuyChips from './components/Buychips/buyChips';
import LogOut from './components/Logout/logout';
import Panel from './components/Panel/panelAdmin';
import GameGrid from './components/Juegos/juegos';
import News from './components/News/news';
import regaloBienvenida from '../src/assets/regalobienvenida.png';
import { useSelector, useDispatch } from 'react-redux';
import TermsAndConditions from './components/termsyConds/terminosYCondiciones';
import axios from 'axios';


function App() {
  const [showWelcomeGift, setShowWelcomeGift] = useState(false);
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkWelcomeGift = async () => {
      if (currentUser?.id && !currentUser.firstChips) {
        // Mostrar el regalo después de 2.5 segundos
        const timer = setTimeout(() => setShowWelcomeGift(true), 2500);

        try {
          // Actualizar `firstChips` en el backend
          await axios.put('https://royalback-f340.onrender.com/firstchips', { id: currentUser.id });

        } catch (error) {
          console.error('Error actualizando firstChips:', error);
        }

        return () => clearTimeout(timer); // Limpiar el temporizador
      }
    };

    checkWelcomeGift();
  }, [currentUser, dispatch]);

  const handleCloseGift = () => {
    setShowWelcomeGift(false);
  };

  return (
    <Container
      bgGradient="linear(to-t, white, gray.200)"
      maxW="100%"
      w="100%"
      maxH="100%"
      h="100%"
      mt={0}
      p={0}
    >
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil/:tab?" element={<Perfil />} />
          <Route path="/juegos" element={<GameGrid />} />
          <Route path="/chips" element={<BuyChips />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
        {/* Modal o Cartel de Bienvenida */}
        {showWelcomeGift && currentUser?.id && (
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p="30px"
            boxShadow="2xl"
            borderRadius="15px"
            width="400px"
            textAlign="center"
            zIndex="10"
          >
            <Image src={regaloBienvenida} alt="Regalo de bienvenida" mb={4} />
            <Box fontSize="2xl" fontWeight="bold">¡Felicidades!</Box>
            <Box>Has ganado 1,000,000 de fichas por ser uno de los primeros 1000 usuarios.</Box>
            <Button mt={4} colorScheme="teal" onClick={handleCloseGift}>
              ¡Gracias!
            </Button>
          </Box>
        )}
      </AuthProvider>
    </Container>
  );
}

export default App;
