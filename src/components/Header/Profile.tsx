import { Flex, Text , Box, Avatar } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Matheus Oliveira</Text>
        <Text
          color="gray.300"
          fontSize="small"
        >
          mho.oliveira01@gmail.com</Text>
      </Box>

      <Avatar
        size="md"
        name="Matheus Oliveira"
        src="https://github.com/theusoliveira.png"
      />
    </Flex>
  );
}