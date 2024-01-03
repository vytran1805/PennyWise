import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Box,
} from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useCreateTransactionMutation } from '@/redux/transactionsApi';
import { TransactionData } from '@/redux/types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { testIds } from '../testIds';

export const AddTransactionButton = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<TransactionData>({
    date: '',
    name: '',
    type: '',
    description: '',
    amount: 0,
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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      console.log({ date });

      setFormData((prevFormData) => ({
        ...prevFormData,
        date: date.toDateString(), // Returns Date as a string value (without timezone)
      }));
    }
  };

  const handleInputChange = (
    fieldKey: keyof TransactionData, // Instead of getting the key directly from the `formData` obj like before, pass in the field key is needed to manage the state for each field correctly
    value: string | number
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldKey]: value,
    }));
  };

  const handleFormSubmit = async (): Promise<void> => {
    try {
      handleCloseDialog();
      const result = await createTransaction({ data: formData });
      console.log({ result });
      window.location.reload();
      console.log(result);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };
  const renderFormFields = (formFieldData: TransactionData) => {
    return Object.keys(formFieldData).map((key) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const fieldKey = key as keyof TransactionData;
      if (key === 'date') {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} key={key}>
            <DatePicker label='Date' name='date' onChange={handleDateChange} />
          </LocalizationProvider>
        );
      }
      return (
        <TextField
          key={key}
          label={label} // Capitalize the first letter
          value={formFieldData[fieldKey] || ''} // Explicitly tells TS that the key belongs to the group of properties from TransactionData interface
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(fieldKey, event.target.value)
          }
          fullWidth
          margin='normal'
        />
      );
    });
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
        <DialogContent>{renderFormFields(formData)}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
