import { TransactionData, TransactionResponse } from '@/redux/types';
import { List, ListItem } from '@mui/material';

type Props = {
  incomeDetail?: TransactionResponse;
};
export const RightSection = (props: Props) => {
  const { incomeDetail } = props;
  if (!incomeDetail) {
    return <></>;
  }
  const { _id, __v, ...payload } = incomeDetail; // payload will contains the remaining attributes of IncomesResponse (exclude '_id' and, '__v')
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
