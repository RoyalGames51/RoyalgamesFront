import { Flex, Box, Stack, Link, Text, Heading } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function Footer() {
  return (
    <Stack>
      <Flex
        flexDirection={{ base: 'column', md: 'column' }}
        w='100%'

        /* position="sticky" */ // Esto hace que el footer se quede pegado al piso (sticky para que no tape el)
pt={"10%"}
        bottom="0" // Lo posiciona en la parte inferior de la ventana
      >
        <Flex
          bg='#000000'
          minWidth='max-content'
          alignItems="flex-start"
          pb={"2%"}
          gap='5'
          pt='1rem'
          boxSize='sm'
          w='100%'
          h='auto'
          color='white'
          px='3rem'
          flexDirection={{ base: 'column', md: 'row' }}
          bgGradient="linear(to-b, #2e2e2e, black)"
        >
          <Box w='auto' h='auto' p='1' textAlign='center' order={{ base: 3, md: 2 }} pr={"4%"}>
            <Heading fontSize="x-large" textAlign="left" mb={4}>Nosotros:</Heading>
            <Flex flexDirection='column' fontSize='1.3rem' textAlign="left">
              <Link href='/about' isExternal mb={2}>
                Sobre Nosotros <ExternalLinkIcon mx='2px' />
              </Link>
              
              <Link href='mailto:vamos.ong@gmail.com' isExternal mb={2}>
                royalgames2025@gmail.com <ExternalLinkIcon mx='2px' />
              </Link>
              <Link href='/terminos-y-condiciones' isExternal mb={2}>
                Terminos y condiciones <ExternalLinkIcon mx='2px' />
              </Link>
            </Flex>
          </Box>

          <Box w='auto' h='auto' p='1' textAlign='center' order={{ base: 3, md: 2 }} >
            <Flex flexDirection='column' fontSize='1.3rem' textAlign="left">
              <Text textAlign="left" >
                <Heading fontSize="x-large" textAlign="left" mb={4}>Nuestras redes:</Heading>
                <Text as="span">
                  <Text mb={2}> Facebook</Text>
                  <Text mb={2}> Instagram</Text>
                  <Text mb={2}> X </Text>
                </Text>
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Box maxW='100%' pl={"3%"} pr={"3%"} bgColor={"#000000"} >
          <Flex bg='#000000' color='white' fontSize='1.1rem' py='2' borderTop={"1px"} borderColor={"white"}>
            <Text >© RoyalGames 2024 Todos los Derechos Reservados.</Text>
          </Flex>
        </Box>
      </Flex>
    </Stack>
  )
}

export default Footer
