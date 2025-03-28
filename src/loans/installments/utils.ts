import { Loan, LoanType } from '@prisma/client';
import { LoanInterestTypes } from 'src/constants';
import { IInstallment } from './types';

export const calculalteScheduleInstallments = (
  loan: Loan,
  type: LoanType,
): IInstallment[] => {
  if (type.name === LoanInterestTypes.FIXED) {
    return calculateFixedInstallments(loan);
  }
};

export const calculateFixedInstallments = (loan: Loan): IInstallment[] => {
  const payment = loan.amount / loan.initalInstallments;
  const interest = loan.amount * loan.interestRate;
  const installments: IInstallment[] = [];
  for (let i = 0; i < loan.initalInstallments; i++) {
    installments.push({
      payment: payment,
      interest: interest,
      date: new Date(new Date().setMonth(new Date().getMonth() + i)),
    });
  }
  return installments;
};
