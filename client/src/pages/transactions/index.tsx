import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from './testIds';
import { TransactionsResponse } from '@/redux/types';
import { useState } from 'react';
import { TimelinePicker } from '../../components/transactions/mainSection/TimelinePicker';
import { TransactionsTable } from '../../components/transactions/mainSection/TransactionsTable';
import { RightSection } from '../../components/transactions/rightSection/RightSection';

const Container = styled(Box)`
  display: flex;
  width: 100%;
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

export const Transactions = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionsResponse>();
  return (
    <Container data-test-id={testIds.transactions.container}>
      <MainContainer
        data-test-id={testIds.transactions.mainContainer.container}
      >
        <TimelinePicker />
        <TransactionsTable onTransactionSelected={setSelectedTransaction} />
      </MainContainer>
      <RightContainer
        data-test-id={testIds.transactions.rightContainer.container}
      >
        <RightSection transactionDetail={selectedTransaction} />
      </RightContainer>
    </Container>
  );
};
