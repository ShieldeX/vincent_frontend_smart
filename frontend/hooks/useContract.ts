import { Contract, providers } from 'ethers';

export const useContract = () => {
  const fetchRoles = async (provider: providers.JsonRpcProvider) => {
    const contract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'roleTypes',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'roleTypesCount',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],

      provider,
    );

    let roleTypesCount = await contract.roleTypesCount();
    let roleTypes = [];
    for (let i = 0; i < Number(roleTypesCount); i++) {
      roleTypes.push(await contract.roleTypes(i));
    }
    return roleTypes;
  };

  const addRole = async (
    signer: providers.JsonRpcSigner,
    address: string,
    role: number,
  ) => {
    const contract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_member',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '_roleType',
              type: 'uint256',
            },
          ],
          name: 'addRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      signer,
    );
    return await contract.addRole(address, role);
  };

  const addRoleType = async (signer: providers.JsonRpcSigner, role: string) => {
    const contract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      [
        {
          inputs: [
            {
              internalType: 'string',
              name: '_roleType',
              type: 'string',
            },
          ],
          name: 'addRoleType',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],

      signer,
    );
    return await contract.addRoleType(role);
  };

  const getMembersWithRole = async (provider: providers.JsonRpcProvider) => {
    const contract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'addresses',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'userRole',
          outputs: [
            {
              internalType: 'uint256',
              name: 'activationTime',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isActive',
              type: 'bool',
            },
            {
              internalType: 'string',
              name: 'roleType',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'membersCount',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      provider,
    );

    let membersCount = await contract.membersCount();
    let members = [];
    for (let i = 0; i < Number(membersCount); i++) {
      members.push(await contract.addresses(i));
    }
    return await Promise.all(
      members.map(async (member, i) => {
        let role = await contract.userRole(member);
        return {
          id: i + 1,
          address: member,
          activationTime: new Date(Number(role.activationTime) * 1000),
          isActive: role.isActive,
          roleType: role.roleType,
        };
      }),
    );
  };

  return {
    fetchRoles,
    addRole,
    addRoleType,
    getMembersWithRole,
  };
};
