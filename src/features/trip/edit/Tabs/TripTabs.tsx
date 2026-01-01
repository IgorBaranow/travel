import { useState } from 'react';

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Tab, Tabs } from '@mui/material';

import type { Trip } from '../../types';
import TripInfoAndPlaces from './TripInfoAndPlaces';

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

function CustomTabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trip-edit-tabpanel-${index}`}
      aria-labelledby={`trip-edit-tab-${index}`}
      style={{ height: '90vh' }}
    >
      {children}
    </div>
  );
}

export default function TripTabs({ trip, onUpdate }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Edit trip info tabs"
        selectionFollowsFocus
        variant="scrollable"
        scrollButtons={false}
        sx={{
          mb: { xs: 2, md: 3 },
        }}
      >
        <Tab
          id="trip-edit-tab-0"
          label="Details"
          icon={<InfoOutlinedIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-tab-1"
          label="Documents"
          icon={<ReceiptIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-tab-2"
          label="Packing List"
          icon={<ChecklistIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-tab-3"
          label="Expenses"
          icon={<MonetizationOnIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-tab-4"
          label="Photos"
          icon={<CameraEnhanceIcon />}
          iconPosition="start"
        />
      </Tabs>
      <CustomTabPanel value={selectedTab} index={0}>
        <TripInfoAndPlaces trip={trip} onUpdate={onUpdate} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        Documents
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        Packing List
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={3}>
        Expenses
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={4}>
        Photos
      </CustomTabPanel>
    </Box>
  );
}