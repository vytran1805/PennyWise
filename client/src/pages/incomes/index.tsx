import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from './testIds';
import { TimelinePicker } from '@/components/incomes/mainSection/TimelinePicker';
import { IncomesTable } from '@/components/incomes/mainSection/IncomesTable';
import { IncomeDetails } from '@/components/incomes/rightSection/IncomeDetails';
import { Route, Routes } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  /* width: 100%; */
  height: 100%;
`;

const MainContainer = styled(Box)`
  background: white;
  flex: 2;
  padding: 10px;
  gap: 10px;
`;

const RightContainer = styled(Box)`
  flex: 1;
  padding: 10px;
`;

export const Incomes = () => {
  return (
    <Container data-test-id={testIds.incomes.container}>
      <MainContainer data-test-id={testIds.incomes.mainContainer.container}>
        <TimelinePicker />
        <IncomesTable />
      </MainContainer>
      <RightContainer data-test-id={testIds.incomes.rightContainer.container}>
        <Routes>
          <Route path='/:id' element={<IncomeDetails />} />
        </Routes>
      </RightContainer>
    </Container>
  );
};
