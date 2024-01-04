import { ExpenseData, ExpenseResponse } from '@/redux/types';
import { List, ListItem } from '@mui/material';

type Props = {
  expenseDetail?: ExpenseResponse;
};
export const RightSection = (props: Props) => {
  const { expenseDetail } = props;
  if (!expenseDetail) {
    return <></>;
  }
  const { _id, __v, ...payload } = expenseDetail; // payload will contains the remaining attributes of ExpensesResponse (exclude '_id' and, '__v')
  const filteredKeys = Object.keys(payload); // The array of payload keys
  console.log({ filteredKeys });

  return (
    <List>
      {filteredKeys.map((key) => (
        <ListItem key={key}>
          <strong>{key}: </strong>
          {payload[key as keyof ExpenseData]}
        </ListItem>
      ))}
    </List>
  );
};
