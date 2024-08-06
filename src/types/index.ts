export type TPayment = {
  id: number;
  data: string;
  monthlyPayment: number;
  interestPayment: number;
  principalPayment: number;
  balance: number;
};

export type TInput = {
  value: number;
  isValid: boolean;
  label: string;
  helperText: string
}

export type TInputs = {
  [key: string]: TInput;
}
