import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { testIds } from '@/pages/transactions/testIds';
import { TransactionForm } from './TransactionForm';

export const AddTransactionButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleButtonClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form data when closing the dialog
  };

  return (
    <Box data-test-id={testIds.transactions.mainContainer.container}>
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
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
