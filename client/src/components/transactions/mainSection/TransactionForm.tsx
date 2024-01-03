import { useCreateTransactionMutation } from '@/redux/transactionsApi';
import { TransactionData, TransactionType } from '@/redux/types';
import {
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  MenuItem,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';

type Props = {
  onClose: () => void;
};
export const TransactionForm = (props: Props) => {
  const { onClose } = props;
  const [transactionType, setTransactionType] = useState('');
  const [createTransaction] = useCreateTransactionMutation();
  const [formData, setFormData] = useState<TransactionData>({
    date: '',
    name: '',
    type: undefined,
    description: '',
    amount: 0,
    category: '',
  });

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

  const handleTransactionTypeSelected = (
    fieldKey: keyof TransactionData,
    value: string
  ) => {
    setTransactionType(value);
    handleInputChange(fieldKey, value);
  };
  const handleFormSubmit = async (): Promise<void> => {
    try {
      onClose();
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
      if (key === 'type') {
        return (
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>Type</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={transactionType}
              label='Type'
              onChange={(event: SelectChangeEvent) =>
                handleTransactionTypeSelected(
                  fieldKey,
                  event.target.value as string
                )
              }
            >
              {Object.entries(TransactionType).map(([typeKey, typeValue]) => (
                <MenuItem key={typeValue} value={typeValue}>
                  {typeKey}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
    <>
      {renderFormFields(formData)}
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color='primary'>
          Add
        </Button>
      </DialogActions>
    </>
  );
};
