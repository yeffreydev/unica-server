import { Injectable } from '@nestjs/common';
import {
  Loan,
  LoanInstallment,
  LoanType,
  Transaction,
  User,
} from '@prisma/client';
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
}
