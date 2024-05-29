import { useCreateExpenseMutation } from '@/redux/expensesApi';
import { TransactionData } from '@/redux/types';
import { Button, DialogActions, TextField, DialogContent } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';

type Props = {
  onClose: () => void;
};
export const ExpenseForm = (props: Props) => {
  const { onClose } = props;
  const [createExpense] = useCreateExpenseMutation();
  const [formData, setFormData] = useState<TransactionData>({
    user_id: '',
    date: undefined,
    name: '',
    description: '',
    amount: 0,
    category_id: '',
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      console.log('handleDateChange', typeof date);

      setFormData((prevFormData) => ({
        ...prevFormData,
        date: date, // Returns Date as a string value (without timezone)
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
      onClose();
      const result = await createExpense({ data: formData });
      console.log({ result });
      window.location.reload();
      console.log(result);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const renderFormFields = (formFieldData: TransactionData) => {
    return Object.keys(formFieldData).map((key, index) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const fieldKey = key as keyof TransactionData;
      const uniqueKey = `${key}-${index}`;

      if (key === 'date') {
        return (
          <LocalizationProvider key={uniqueKey} dateAdapter={AdapterDateFns}>
            <DatePicker label='Date' name='date' onChange={handleDateChange} />
          </LocalizationProvider>
        );
      }

      return (
        <TextField
          id={key}
          name={key}
          key={uniqueKey}
          type={key === 'amount' ? 'number' : 'text'}
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
      <DialogContent>{renderFormFields(formData)}</DialogContent>
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
