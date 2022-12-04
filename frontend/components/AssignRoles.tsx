import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { utils } from 'ethers';
import React from 'react';
import toast from 'react-hot-toast';
import { useSigner } from 'wagmi';
import { ContractContext } from '../context';

function AssignRoles() {
  const [member, setMember] = React.useState('');
  const [roleType, setRoleType] = React.useState('');

  const { roles, assignRole } = React.useContext(ContractContext);
  const { data: signer } = useSigner();

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!member) {
      toast.error('Please enter a member address');
      return;
    }

    if (roleType?.trim() === '') {
      toast.error('Please select a role type');
      return;
    }

    // validate member address
    try {
      utils.getAddress(member);
    } catch (error) {
      toast.error('Please enter a valid member address');
      return;
    }

    // Assign role

    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          if (!signer) {
            reject('Signer not found. Please reconnect your wallet.');
            return;
          }

          await assignRole(signer, member, Number(roleType));
          resolve(`Role ${roleType} assigned successfully`);
        } catch (error: any) {
          let err = JSON.parse(JSON.stringify(error));

          console.log(err);

          reject(err?.reason || `Error assigning role ${roleType}`);
        }
      }),
      {
        loading: 'Assigning Role',
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
      display="flex"
      autoComplete="off"
    >
      <TextField
        id="outlined-role"
        label="Member Address"
        variant="outlined"
        value={member}
        onChange={(e) => setMember(e.target.value.trim())}
      />
      {/* Drop down of role types */}
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">
          Role Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={roleType}
          onChange={(e) => setRoleType(e.target.value.toString())}
          label="Role Types"
        >
          {roles.map((role, i) => (
            <MenuItem key={role} value={i}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* submit btn */}
      <Button variant="outlined" onClick={handleAssignRole}>
        Submit
      </Button>
    </Box>
  );
}

export default AssignRoles;
