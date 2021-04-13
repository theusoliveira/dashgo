import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Th,
  Thead,
  Tr,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactElement } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UsersList(): ReactElement {
  const { data, isLoading, error } = useQuery('users', async () => {
    const res = await fetch('http://localhost:3000/api/users');
    const data = await res.json();

    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });

    return users;
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justfy="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      <Td px="6">
                        {isWideVersion && <Text>{user.created_at}</Text>}
                      </Td>
                      <Td>
                        <IconButton
                          aria-label="Editar usuário"
                          as="a"
                          size="sm"
                          fontSize="small"
                          colorScheme="purple"
                          icon={<Icon as={RiPencilLine} fontSize="16" />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
