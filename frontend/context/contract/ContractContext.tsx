import { providers } from 'ethers';
import { createContext } from 'react';

const defaultValues = {
  isLoading: false,
  setIsLoading: (value: boolean) => {},
  // isAdmin: false,
  // setIsAdmin: (value: boolean) => {},
  roles: [],
  setRoles: (roles: string[]) => {},
  fetchRoles: (provider: any) => Promise.resolve([]),
  createRole: (signer: any, role: string) => Promise.resolve(),
  assignRole: (signer: any, address: string, role: number) => Promise.resolve(),
  getMembersWithRole: (provider: any) => Promise.resolve([]),
};

interface IContractContext {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  // isAdmin: boolean;
  // setIsAdmin: (value: boolean) => void;
  roles: string[];
  setRoles: (roles: string[]) => void;
  fetchRoles: (provider: any) => Promise<string[]>;
  createRole: (signer: any, role: string) => Promise<void>;
  assignRole: (signer: any, address: string, role: number) => Promise<void>;
  getMembersWithRole: (provider: any) => Promise<
    {
      address: string;
      id: number;
      activationTime: Date;
      isActive: boolean;
      roleType: string;
    }[]
  >;
}

export const ContractContext = createContext<IContractContext>(defaultValues);
