import { TransactionData, TransactionsResponse } from '@/redux/types';
import { List, ListItem } from '@mui/material';

type Props = {
  transactionDetail?: TransactionsResponse;
};
export const RightSection = (props: Props) => {
  const { transactionDetail } = props;
  if (!transactionDetail) {
    return <></>;
  }
  const { _id, __v, ...payload } = transactionDetail; // payload will contains the remaining attributes of TransactionsResponse (exclude '_id' and, '__v')
  const filteredKeys = Object.keys(payload); // The array of payload keys
  console.log({ filteredKeys });

  return (
    <List>
      {filteredKeys.map((key) => (
        <ListItem key={key}>
          <strong>{key}: </strong>
          {payload[key as keyof TransactionData]}
        </ListItem>
      ))}
    </List>
  );
};
