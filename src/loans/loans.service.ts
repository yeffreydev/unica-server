import { Injectable } from '@nestjs/common';
import { Loan, LoanType, Transaction, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionTypes } from 'src/constants';
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
  async createLoanTransaction(dataT: Loan): Promise<Loan> {
    let interestRate = 0;
    return this.prisma.loan.create({
      data: {
        ...dataT,
        interestRate,
        status: 'PENDING',
        amount: Number(dataT.amount),
        months: Number(dataT.months),
      },
      include: {
        user: true,
      },
    });
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
}
