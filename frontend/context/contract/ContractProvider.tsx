import { useState } from 'react';
import { useContract } from '../../hooks';
import { ContractContext } from './ContractContext';

export const ContractProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { addRole, addRoleType, fetchRoles, getMembersWithRole } =
    useContract();
  return (
    <ContractContext.Provider
      value={{
        roles,
        isLoading,
        setIsLoading,
        setRoles,
        fetchRoles,
        createRole: addRoleType,
        assignRole: addRole,
        getMembersWithRole,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
