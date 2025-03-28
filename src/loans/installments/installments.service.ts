import { Injectable } from '@nestjs/common';
import { Loan, LoanInstallment, LoanType, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { calculalteScheduleInstallments } from './utils';
@Injectable()
export class InstallmentsService {
  constructor(private prisma: PrismaService) {}
  async generateInstallments(loanId: number): Promise<any> {
    const installments = await this.prisma.loanInstallment.findMany({
      where: {
        loanId,
      },
    });

    if (installments.length > 0) {
      //logica para verificar si esta todo correcto, sino actualizar las cuotas.
      return installments;
    }
    const loan = await this.prisma.loan.findUnique({
      where: {
        id: loanId,
      },
      include: {
        loanType: true,
      },
    });

    //logic for generating installments
    const scheduleInstallments = calculalteScheduleInstallments(
      loan,
      loan.loanType,
    ).map((installment) => ({
      ...installment,
      loanId: loanId,
      paid: false, // or set the appropriate value
    }));

    const createdInstallments = await this.prisma.loanInstallment.createMany({
      data: scheduleInstallments,
    });

    return createdInstallments;
  }
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
        initalInstallments: Number(dataT.initalInstallments),
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
