import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

const SidebarDrawerContext = createContext({} as UseDisclosureReturn);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps): ReactElement {
  const disclousure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclousure.onClose();
  }, [disclousure, router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclousure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
