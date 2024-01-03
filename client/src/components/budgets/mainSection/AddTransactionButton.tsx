import { ChangeEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useCreateTransactionMutation } from '@/redux/transactionsApi';
import { TransactionData } from '@/redux/types';

export const AddTransactionButton = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<TransactionData>({
    name: '',
    type: '',
    description: '',
    amount: 0,
    // date: new Date(),
    category: '',
  });
  const [createTransaction] = useCreateTransactionMutation();

  const handleButtonClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form data when closing the dialog
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (): Promise<void> => {
    try {
      const result = await createTransaction({ data: formData });
      console.log({ result });
      window.location.reload();
      handleCloseDialog();
      console.log(result);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <>
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
          {/* Form fields */}
          <TextField
            label='Name'
            name='name'
            value={formData?.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Amount'
            name='amount'
            value={formData?.amount || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Category'
            name='category'
            value={formData?.category || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Type'
            name='type'
            value={formData?.type || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Description'
            name='description'
            value={formData?.description || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
