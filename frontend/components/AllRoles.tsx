import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import { ContractContext } from '../context';

function AllRoles() {
  const { roles, setRoles, fetchRoles } = useContext(ContractContext);

  const provider = useProvider();

  useEffect(() => {
    provider && fetchRoles(provider).then((roles) => setRoles(roles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);
  return (
    <Box>
      {roles.map((role, index) => (
        <Box key={index} display="flex" gap={1}>
          <Typography>{index + 1}.</Typography>
          <Typography> {role}</Typography>
        </Box>
      ))}

      {roles.length === 0 && (
        <Typography color="text.secondary">No roles found!</Typography>
      )}
    </Box>
  );
}

export default AllRoles;
