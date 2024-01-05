import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from './testIds';
import { IncomeResponse } from '@/redux/types';
import { useState } from 'react';
import { TimelinePicker } from '@/components/incomes/mainSection/TimelinePicker';
import { IncomesTable } from '@/components/incomes/mainSection/IncomesTable';
import { RightSection } from '@/components/incomes/rightSection/RightSection';

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
  const [selectedIncome, setSelectedIncome] = useState<IncomeResponse>();
  return (
    <Container data-test-id={testIds.incomes.container}>
      <MainContainer data-test-id={testIds.incomes.mainContainer.container}>
        <TimelinePicker />
        <IncomesTable onIncomeSelected={setSelectedIncome} />
      </MainContainer>
      <RightContainer data-test-id={testIds.incomes.rightContainer.container}>
        <RightSection incomeDetail={selectedIncome} />
      </RightContainer>
    </Container>
  );
};
