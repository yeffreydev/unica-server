import { LoanInstallment } from '@prisma/client';
import { LoanInterestTypes } from 'src/constants';

function calculateFixedInstallments(
  loanId: number,
  loanAmount: number,
  interestRate: number,
  startDate: Date,
  initialInstallments: number,
  initialNumber: number = 0,
) {
  const installmentsArray: LoanInstallment[] = [];
  let remainingBalance = loanAmount;

  for (let i = 0; i < initialInstallments; i++) {
    const installmentAmount = loanAmount / initialInstallments;
    const interest = loanAmount * interestRate;
    const date = new Date(startDate);
    remainingBalance -= installmentAmount;
    date.setMonth(date.getMonth() + i);
    installmentsArray.push({
      id: undefined,
      installment_number: i + initialNumber,
      payment: installmentAmount,
      interest,
      balance: remainingBalance,
      date,
      paid: false,
      loanId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return installmentsArray;
}

function calculateVariableInstallments(
  loanId: number,
  loanAmount: number,
  interestRate: number,
  startDate: Date,
  initialInstallments: number,
  initialNumber: number = 0,
) {
  const installmentsArray: LoanInstallment[] = [];
  let remainingBalance = loanAmount;

  for (let i = 0; i < initialInstallments; i++) {
    const installmentAmount = loanAmount / initialInstallments;
    const interest = remainingBalance * interestRate;
    const date = new Date(startDate);
    remainingBalance -= installmentAmount;
    date.setMonth(date.getMonth() + i + 1);
    installmentsArray.push({
      id: undefined,
      loanId,
      payment: installmentAmount,
      interest,
      balance: remainingBalance,
      date,
      paid: false,
      installment_number: i + initialNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return installmentsArray;
}

function calculateRebateInstallments(
  loanId: number,
  loanAmount: number,
  interestRate: number,
  startDate: Date,
  initialInstallments: number,
  initialNumber: number = 0,
) {
  const installmentsArray: LoanInstallment[] = [];
  let remainingBalance = loanAmount;

  for (let i = 0; i < initialInstallments; i++) {
    const installmentAmount = loanAmount / initialInstallments;
    const interest = remainingBalance * interestRate;
    const date = new Date(startDate);
    remainingBalance -= installmentAmount;
    date.setMonth(date.getMonth() + i);
    installmentsArray.push({
      id: i,
      payment: installmentAmount,
      interest,
      balance: remainingBalance,
      date,
      paid: false,
      loanId,
      createdAt: new Date(),
      updatedAt: new Date(),
      installment_number: i + initialNumber,
    });
  }

  return installmentsArray;
}

function calculateMaturityInstallments(
  loanId: number,
  loanAmount: number,
  interestRate: number,
  startDate: Date,
  initialInstallments: number,
  initialNumber: number = 0,
) {
  const installmentsArray: LoanInstallment[] = [];
  const totalInstallments = initialInstallments;
  const interest = loanAmount * interestRate;

  for (let i = 0; i < totalInstallments; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);

    if (i === totalInstallments - 1) {
      installmentsArray.push({
        id: undefined,
        payment: loanAmount,
        interest,
        balance: 0,
        date,
        paid: false,
        installment_number: i + initialNumber,
        loanId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      installmentsArray.push({
        id: undefined,
        payment: 0,
        balance: loanAmount,
        interest,
        date,
        paid: false,
        loanId,
        createdAt: new Date(),
        updatedAt: new Date(),
        installment_number: i + initialNumber,
      });
    }
  }

  return installmentsArray;
}

export function calculateInstallments(
  loanType: keyof typeof LoanInterestTypes,
  loanId: number,
  loanAmount: number,
  interestRate: number,
  initialInstallments: number,
  startDate: Date,
  initialNumber: number = 0,
) {
  if (loanType === LoanInterestTypes.FIXED) {
    return calculateFixedInstallments(
      loanId,
      loanAmount,
      interestRate,
      startDate,
      initialInstallments,
      initialNumber,
    );
  }
  if (loanType === LoanInterestTypes.VARIABLE) {
    return calculateVariableInstallments(
      loanId,
      loanAmount,
      interestRate,
      startDate,
      initialInstallments,
      initialNumber,
    );
  }
  if (loanType === LoanInterestTypes.REBATE) {
    return calculateRebateInstallments(
      loanId,

      loanAmount,
      interestRate,
      startDate,
      initialInstallments,
      initialNumber,
    );
  }
  if (loanType === LoanInterestTypes.MATURITY) {
    return calculateMaturityInstallments(
      loanId,
      loanAmount,
      interestRate,
      startDate,
      initialInstallments,
      initialNumber,
    );
  }

  return [];
}
