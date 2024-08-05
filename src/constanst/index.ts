import {GridColDef} from "@mui/x-data-grid";

export const COLUMNS: GridColDef[] = [
  { field: 'data', headerName: 'Data', flex: 1 },
  { field: 'monthlyPayment', headerName: 'Monthly Payment', flex: 1 },
  { field: 'interestPayment', headerName: 'Interest Payment', flex: 1},
  { field: 'principalPayment', headerName: 'Principal Payment', flex: 1},
  { field: 'balance', headerName: 'Remaining Balance', flex: 1 },
];

export const VALIDATION_RULES = {
  minAmount: 1000,
  maxAmount: 100000,
  minTerm: 1,
  maxTerm: 20,
  minRate: 5,
};
