import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from '../testIds';
import { MainSection } from './mainSection';
import { RightSection } from './RightSection';

const Container = styled(Box)`
  display: flex;
  height: 100%;
`;

const MainContainer = styled(Box)`
  background: white;
  flex: 2;
`;

const RightContainer = styled(Box)`
  flex: 1;
`;

export const Budgets = () => {
  return (
    <Container data-test-id={testIds.budgets.container}>
      <MainContainer data-test-id={testIds.budgets.mainContainer}>
        <MainSection />
      </MainContainer>
      <RightContainer data-test-id={testIds.budgets.rightContainer}>
        <RightSection />
      </RightContainer>
    </Container>
  );
};
