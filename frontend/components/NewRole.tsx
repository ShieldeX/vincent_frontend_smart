import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useSigner } from 'wagmi';
import { ContractContext } from '../context';

export default function NewRole() {
  const [roleName, setRoleName] = useState('');
  const { createRole } = useContext(ContractContext);
  const { data: signer } = useSigner();

  const handleRoleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!roleName) {
      toast.error('Please enter a role name');
      return;
    }

    // Create role
    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          if (!signer) {
            reject('Signer not found. Please reconnect your wallet.');
            return;
          }

          await createRole(signer, roleName);
          resolve(`Role ${roleName} created successfully`);
        } catch (error: any) {
          let err = JSON.parse(JSON.stringify(error));

          console.log(err);

          reject(err?.reason || `Error creating role ${roleName}`);
        }
      }),
      {
        loading: 'Creating Role',
        success: (data) => String(data),
        error: (err) => String(err),
      },
    );
  };
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
    >
      <TextField
        id="outlined-role"
        label="Role"
        variant="outlined"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />

      {/* submit btn */}
      <Button variant="outlined" onClick={handleRoleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
