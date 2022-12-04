import { Tab, Tabs, Box } from '@mui/material';
import { TabPanel } from './TabPanel';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import AllRoles from './AllRoles';
import NewRole from './NewRole';
import AssignRoles from './AssignRoles';
import { ContractContext } from '../context';
import Members from './Members';

function a11yProps(index: number) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function ActionTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="action tabs">
          <Tab label="Create New Role" {...a11yProps(0)} />
          <Tab label="Assign Roles" {...a11yProps(1)} />
          <Tab label="All Roles" {...a11yProps(2)} />
          <Tab label="Members" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NewRole />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AssignRoles />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllRoles />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Members />
      </TabPanel>
    </Box>
  );
}
