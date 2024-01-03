import { TransactionsResponse } from '@/redux/types';
import React from 'react';

type Props = {
  transactionDetail?: TransactionsResponse;
};
export const RightSection = (props: Props) => {
  const { transactionDetail } = props;
  return (
    <>
      <div>Name: {transactionDetail?.name}</div>
      <div>Amount: {transactionDetail?.amount}</div>
      <div>Description: {transactionDetail?.description}</div>
      <div>Date: {transactionDetail?.date}</div>
      <div>Category: {transactionDetail?.category}</div>
    </>
  );
};
