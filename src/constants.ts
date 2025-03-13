export enum TransactionTypes {
  DEPOSIT = 'DEPOSIT', //deposito de dinero
  WITHDRAWAL = 'WITHDRAWAL', //retiro de dinero
  TRANSFER = 'TRANSFER', //transferencia de dinero
  LOAN = 'LOAN', //prestamo de dinero
  REPAYMENT = 'REPAYMENT', //pago de prestamo
}

export enum LoanInterestTypes {
  SIMPLE = 'SIMPLE',
  COMPOUND = 'COMPOUND',
  FIXED = 'FIXED',
  VARIABLE = 'VARIABLE',
  ORDINARY = 'ORDINARY',
  LATE_PAYMENT = 'LATE_PAYMENT',
  NOMINAL = 'NOMINAL',
  EFFECTIVE = 'EFFECTIVE',
  BANK = 'BANK',
  LEGAL = 'LEGAL',
  USURIOUS = 'USURIOUS',
}
