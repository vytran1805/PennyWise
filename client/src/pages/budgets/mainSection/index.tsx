import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box'; //This default import can be up to six times faster than the named imports (import { Box } from '@mui/material') ?????
import { TransactionsTable } from './TransactionsTable';

export const MainSection = () => {
  const [value, setValue] = useState<Date | null>(null);
  const handleDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={['year', 'month']}
          label='Year and Month'
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={value}
          onChange={setValue}
          // renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    );
  };
  return (
    <Box>
      {handleDatePicker()}
      <TransactionsTable />
    </Box>
  );
};
