import { useGetExpenseQuery } from '@/redux/expensesApi';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export const ExpenseDetails = () => {
  // Get the id param from the URL.
  const { id } = useParams();
  const { data } = useGetExpenseQuery(id || '');

  const PostJsonDetail = () => {
    return (
      <Box>
        <div>{JSON.stringify(data, null, 2)}</div>
      </Box>
    );
  };

  return <PostJsonDetail />;
};
