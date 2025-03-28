export enum TransactionTypes {
  DEPOSIT = 'DEPOSIT', //deposito de dinero
  WITHDRAWAL = 'WITHDRAWAL', //retiro de dinero
  TRANSFER = 'TRANSFER', //transferencia de dinero
  LOAN = 'LOAN', //prestamo de dinero
  REPAYMENT = 'REPAYMENT', //pago de prestamo
}

export enum LoanInterestTypes {
  FIXED = 'FIXED', //couta fija
  VARIABLE = 'VARIABLE', // couta al rebatir.
  REBATE = 'REBATE', // couta variable.
  MATURITY = 'MATURITY', // cuota al vencimiento.
}
