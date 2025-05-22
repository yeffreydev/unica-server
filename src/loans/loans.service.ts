import { Injectable } from '@nestjs/common';
import { Loan, LoanInstallment, LoanType, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LoanInterestTypes, TransactionTypes } from 'src/constants';
import { calculateInstallments } from './loans.utils';

@Injectable()
export class LoanTransactionService {
  constructor(private prisma: PrismaService) {}

  async getAllLoanTransactions(): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      include: {
        user: true,
        loanType: true,
      },
    });
  }

  async getLoanInstallments(loanId: string): Promise<LoanInstallment[]> {
    return this.prisma.loanInstallment.findMany({
      where: {
        loanId: Number(loanId),
      },
    });
  }

  async createLoanTransaction(dataT: Loan): Promise<Loan> {
    //create the loan.
    // create the installments
    // assign the installments to the loan
    let interestRate = Number(dataT.interestRate);

    const { loanTypeId } = dataT;

    const loanType = await this.prisma.loanType.findUnique({
      where: {
        id: loanTypeId,
      },
    });
    console.log(loanType);
    // let installmentsprev = calculateInstallments(
    //   loanType.name as keyof typeof LoanInterestTypes,
    //   2,
    //   dataT.amount,
    //   dataT.interestRate,
    //   dataT.initalInstallments,
    //   dataT.date,
    // );
    // console.log(installmentsprev);
    //{ amount: '500', userId: 18, months: 0 } 20,

    const loan = await this.prisma.loan.create({
      data: {
        ...dataT,
        interestRate,
        status: 'PENDING',
        amount: Number(dataT.amount),
        initalInstallments: Number(dataT.initalInstallments),
      },
      include: {
        user: true,
      },
    });

    let installments = calculateInstallments(
      loanType.name as keyof typeof LoanInterestTypes,
      loan.id,
      loan.amount,
      loan.interestRate,
      loan.initalInstallments,
      loan.date,
    );

    console.log(installments);

    const createdInstallments = await this.prisma.loanInstallment.createMany({
      data: installments,
    });
    return loan;
  }
  async getUsersWithLoans(): Promise<any> {
    const userWithLoans = await this.prisma.user.findMany({
      include: {
        loans: {
          include: {
            payments: true,
          },
        },
      },
    });

    interface UserWithLoans extends User {
      _totalLoans: number;
      _totalPaid: number;
    }

    let newUsers: UserWithLoans[] = userWithLoans.map((user) => {
      const totalAccLoans = user.loans.reduce((acc, loan) => {
        return acc + loan.amount;
      }, 0);

      const _totalPaid = user.loans.reduce((acc, loan) => {
        return (
          acc +
          loan.payments.reduce((acc, payment) => {
            return acc + payment.amount;
          }, 0)
        );
      }, 0);

      return {
        ...user,
        _totalLoans: totalAccLoans,
        _totalPaid,
      };
    });

    return newUsers;
  }
  async getLoanTypes(): Promise<LoanType[]> {
    return this.prisma.loanType.findMany();
  }

  async getCurrentMontInstallments(): Promise<
    (LoanInstallment & { user: User })[]
  > {
    const installments = await this.prisma.loanInstallment.findMany({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
      include: {
        loan: {
          include: {
            user: true,
          },
        },
      },
    });

    return installments.map((installment) => ({
      ...installment,
      user: installment.loan.user,
    }));
  }
  async deleteLoanTransaction(id: string): Promise<Loan> {
    const findLoand = await this.prisma.loan.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!findLoand) {
      throw new Error('Loan not found');
    }
    // First, delete the installments associated with the loan
    await this.prisma.loanInstallment.deleteMany({
      where: {
        loanId: Number(id),
      },
    });

    // Then, delete the loan itself
    return this.prisma.loan.delete({
      where: {
        id: Number(id),
      },
    });
  }

  //obtener los prestamos por usuario y sus cuotas
  async getLoansWithNextInstallmentByUserId(userId: string): Promise<any[]> {
    const loans = await this.prisma.loan.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        loanInstallments: {
          where: {
            paid: false,
          },
          orderBy: {
            date: 'asc',
          },
          take: 1,
        },
        loanType: true,
      },
    });

    return loans;
  }

  async updateLoanTransaction(id: string, data: Loan): Promise<Loan> {
    const findLoan = await this.prisma.loan.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        loanInstallments: true,
        loanType: true,
      },
    });

    if (!findLoan) {
      throw new Error('Loan not found');
    }

    const updatedLoan = await this.prisma.loan.update({
      where: {
        id: Number(id),
      },
      data,
    });

    // If the date is updated, adjust the dates of the installments
    if (data.date && data.date !== findLoan.date) {
      const newInstallmentDates = calculateInstallments(
        findLoan.loanType.name as keyof typeof LoanInterestTypes,
        findLoan.id,
        findLoan.amount,
        findLoan.interestRate,
        findLoan.initalInstallments,
        data.date,
      );

      await this.prisma.loanInstallment.deleteMany({
        where: {
          loanId: Number(id),
        },
      });

      await this.prisma.loanInstallment.createMany({
        data: newInstallmentDates,
      });
    }

    return updatedLoan;
  }

  async payLoan(
    loanId: string,
    data: { paymentAmount: number; date: Date; interestAmount: number },
  ): Promise<LoanInstallment> {
    //check if the loan exists - [x]
    // x - Check if the amount is valida and not greater than the installment.
    // get the next unpaid installment
    // save the payment
    // update the installment with the payment
    // update the loan status if all installments are paid
    // update the installment status to paid
    // if the amount is difernt to installment amount, create a new installments with the rest of the amount.

    //check if the loan exists - [x]

    const loan = await this.prisma.loan.findUnique({
      where: {
        id: Number(loanId),
      },
      include: {
        loanInstallments: true,
      },
    });

    if (!loan) {
      throw new Error('Loan not found');
    }

    // x - Check if the amount is valida and not greater than the installment.

    // get the next unpaid installment
    const nextInstallment = loan.loanInstallments.find(
      (installment) => !installment.paid,
    );

    // save the payment
    const payment = await this.prisma.loanPayment.create({
      data: {
        amount: data.paymentAmount,
        loanId: Number(loanId),
      },
    });

    const interestPayment = await this.prisma.loanInterestPayment.create({
      data: {
        amount: data.interestAmount,
        loanId: Number(loanId),
      },
    });
    // update the installment with the payment

    if (!nextInstallment) {
      throw new Error('No pending installments');
    }

    await this.prisma.loanInstallment.update({
      where: {
        id: nextInstallment.id,
      },
      data: {
        paid: true,
        payment: data.paymentAmount,
        interest: data.interestAmount,
      },
    });

    // update the loan status if all installments are paid
    const allPaid = loan.loanInstallments.every(
      (installment) => installment.paid,
    );
    if (allPaid) {
      await this.prisma.loan.update({
        where: {
          id: Number(loanId),
        },
        data: {
          status: 'PAID',
        },
      });
    }

    // if the amount is difernt to installment amount, create a new installments with the rest of the amount.

    const remainingAmount =
      data.paymentAmount - nextInstallment.payment - data.interestAmount;
    let updatedInstallment: LoanInstallment | null = null;

    if (remainingAmount > 0) {
      updatedInstallment = await this.prisma.loanInstallment.create({
        data: {
          payment: remainingAmount,
          interest: 0,
          date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          loanId: Number(loanId),
          paid: false,
        },
      });

      return updatedInstallment;
    }
    return nextInstallment;
  }

  async getPaidInstallments() {
    const paidInstallments = await this.prisma.loanInstallment.findMany({
      where: {
        paid: true,
      },
      include: {
        loanPayments: true,
        LoanInterestPayment: true,
        loan: {
          include: {
            user: true,
          },
        },
      },
    });

    return paidInstallments.map((installment) => ({
      ...installment,
      user: installment.loan.user,
    }));
  }
}
