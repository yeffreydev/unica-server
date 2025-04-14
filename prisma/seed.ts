import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
import {
  ExpensesTypes,
  IncomeTypes,
  LoanInterestTypes,
  SocialFundsTypes,
  TransactionTypes,
} from 'src/constants';

export async function seed() {
  //seed bank identity
  const existingBank = await prisma.bankIdentity.findFirst();
  if (!existingBank) {
    await prisma.bankIdentity.create({
      data: {
        name: 'Nueva Banca',
        avatar: 'https://res.cloudinary.com/dk5b3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } else {
    console.log('Bank already exists');
  }
  // Seed roles
  const roles = ['Admin', 'User', 'Moderator'];

  for (const role of roles) {
    const existingRole = await prisma.role.findFirst({
      where: { name: role },
    });
    if (!existingRole) {
      await prisma.role.create({
        data: { name: role },
      });
      console.log(`Role ${role} created.`);
    } else {
      console.log(`Role ${role} already exists.`);
    }
  }

  // Seed the admin user
  const adminEmail = 'admin@example.com';
  const existingUser = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const adminRole = await prisma.role.findFirst({
      where: { name: 'Admin' },
    });

    const password = bcrypt.hashSync(
      '12345678',
      Number(process.env.SALT_ROUNDS),
    );
    // Ensure to hash the password before storing it
    await prisma.user.create({
      data: {
        name: 'Admin',
        lastname: 'User',
        dni: '12345678',
        email: adminEmail,
        password: password, // Replace this with a hashed password in the production
        phone: '1234567890',
        roleId: adminRole.id,
      },
    });
    console.log(`Admin user created.`);
  } else {
    console.log(`Admin user already exists.`);
  }

  //seed data for stocks

  const existingStock = await prisma.stock.findFirst();

  if (!existingStock) {
    // await prisma.stock.create({});
    const bankIdentity = await prisma.bankIdentity.findFirst();
    console.log(bankIdentity);

    if (!bankIdentity) {
      throw new Error('Bank identity not found');
    }

    const newStock = await prisma.stock.create({
      data: {
        name: 'Stock 1',
        price: 10,
        available: -1,
        total: -1,
        createdAt: new Date(),
        updatedAt: new Date(),
        bankIdentityId: bankIdentity.id,
      },
    });
    if (!newStock) {
      throw new Error('Stock not created');
    }
    console.log('Stock created');
  } else {
    console.log('Stock already exists');
  }

  //seed data for transactions types
  const transactionTypes = Object.keys(TransactionTypes);

  for (const type of transactionTypes) {
    const existingTransactionType = await prisma.transactionType.findFirst({
      where: { name: type },
    });
    if (!existingTransactionType) {
      await prisma.transactionType.create({
        data: { name: type },
      });
      console.log(`Transaction type ${type} created.`);
    } else {
      console.log(`Transaction type ${type} already exists
      `);
    }
  }

  //sed data for loan types

  const loanTypes = Object.keys(LoanInterestTypes);

  for (const type of loanTypes) {
    const existingLoanType = await prisma.loanType.findFirst({
      where: { name: type },
    });
    if (!existingLoanType) {
      await prisma.loanType.create({
        data: { name: type },
      });
      console.log(`Loan type ${type} created.`);
    } else {
      console.log(`Loan type ${type} already exists
      `);
    }
  }

  //seed data for social funds
  const socialFundsTypes = Object.keys(SocialFundsTypes);

  for (const type of socialFundsTypes) {
    const existingSocialFund = await prisma.socialFunds.findFirst({
      where: { name: type },
    });
    if (!existingSocialFund) {
      await prisma.socialFunds.create({
        data: { name: type },
      });
      console.log(`Social Fund ${type} created.`);
    } else {
      console.log(`Social Fund ${type} already exists
      `);
    }
  }

  //seed data for income types

  const incomeTypes = Object.keys(IncomeTypes);

  for (const type of incomeTypes) {
    const existingIncomeType = await prisma.incomesType.findFirst({
      where: { name: type },
    });
    if (!existingIncomeType) {
      await prisma.incomesType.create({
        data: { name: type },
      });
      console.log(`Income Type Fund ${type} created.`);
    } else {
      console.log(`Income Type Fund ${type} already exists
      `);
    }
  }

  //seed data for income types

  const expenseTypes = Object.keys(ExpensesTypes);

  for (const type of expenseTypes) {
    const existingExpenseType = await prisma.expensesType.findFirst({
      where: { name: type },
    });
    if (!existingExpenseType) {
      await prisma.expensesType.create({
        data: { name: type },
      });
      console.log(`Expense Type Fund ${type} created.`);
    } else {
      console.log(`Expense Type Fund ${type} already exists
      `);
    }
  }

  //run scripts on startup
}
