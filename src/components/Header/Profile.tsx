import { Flex, Text, Box, Avatar } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({
  showProfileData = true,
}: ProfileProps): ReactElement {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Matheus Oliveira</Text>
          <Text color="gray.300" fontSize="small">
            mho.oliveira01@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Matheus Oliveira"
        src="https://github.com/theusoliveira.png"
      />
    </Flex>
  );
}
