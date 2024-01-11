import { useGetIncomeQuery } from '@/redux/incomesApi';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export const IncomeDetails = () => {
  const { id } = useParams<{ id: string }>(); // Access income ID from URL parameter
  const { data } = useGetIncomeQuery(id || ''); // Fetch income details based on the ID

  const PostJsonDetail = () => {
    return (
      <Box>
        <div>{JSON.stringify(data, null, 2)}</div>
      </Box>
    );
  };

  return <PostJsonDetail />;
};
