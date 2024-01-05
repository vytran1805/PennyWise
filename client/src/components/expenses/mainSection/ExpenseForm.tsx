import { useCreateExpenseMutation } from '@/redux/expensesApi';
import { ExpenseData } from '@/redux/types';
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
  const [formData, setFormData] = useState<ExpenseData>({
    date: '',
    name: '',
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
    fieldKey: keyof ExpenseData, // Instead of getting the key directly from the `formData` obj like before, pass in the field key is needed to manage the state for each field correctly
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

  const renderFormFields = (formFieldData: ExpenseData) => {
    return Object.keys(formFieldData).map((key, index) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const fieldKey = key as keyof ExpenseData;
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
          label={label} // Capitalize the first letter
          value={formFieldData[fieldKey] || ''} // Explicitly tells TS that the key belongs to the group of properties from ExpenseData interface
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