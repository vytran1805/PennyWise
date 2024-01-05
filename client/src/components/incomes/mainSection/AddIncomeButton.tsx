import { useState } from 'react';
import { Button, Dialog, DialogTitle, Box } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { testIds } from '@/pages/incomes/testIds';
import { IncomeForm } from './IncomeForm';

export const AddIncomeButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleButtonClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form data when closing the dialog
  };

  return (
    <Box data-test-id={testIds.incomes.mainContainer.container}>
      <GridToolbarContainer>
        <Button
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleButtonClick}
        >
          Add record
        </Button>
      </GridToolbarContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Income</DialogTitle>
        <IncomeForm onClose={handleCloseDialog} />
      </Dialog>
    </Box>
  );
};
