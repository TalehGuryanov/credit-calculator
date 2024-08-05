import {TPayment} from "../types";
import {formatDate} from "./formatDate";

export const calculatePaymentSchedule = (amount: number, annualRate: number, term: number): TPayment[] => {
  const monthlyRate = annualRate / 12 / 100;
  const totalPayments = term * 12;
  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  let balance = amount;
  const schedule: TPayment[] = [];
  
  for (let i = 0; i < totalPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    
    const date = new Date();
    // NOTE: Payments starting from the next month
    date.setMonth(date.getMonth() + i + 1);
    
    schedule.push({
      id: i,
      data: formatDate(date),
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      interestPayment: parseFloat(interestPayment.toFixed(2)),
      principalPayment: parseFloat(principalPayment.toFixed(2)),
      balance: parseFloat(balance.toFixed(2))
    });
  }
  
  return schedule;
};

