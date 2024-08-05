import React, {useCallback, useState} from 'react';
import {Button} from "@mui/material";
import {calculatePaymentsSchedule} from "./utils/calculatePaymentsSchedule";
import {DataGrid} from "@mui/x-data-grid";

import {TInputs, TPayment} from "./types";
import {
  COLUMNS,
  VALIDATION_RULES
} from "./constanst";
import './App.css';
import {InputsList} from "./components/InputsList";

const initialInputs: TInputs = {
  amount: {
    value: 0,
    isValid: true,
    label: 'The amount $',
    helperText: 'From $1000 to 100,000$'
  },
  term: {
    value: 0,
    isValid: true,
    label: 'Credit term',
    helperText: 'From 1 to 20 years'
  },
  rate: {
    value: 0,
    isValid: true,
    label: 'The interest rate %',
    helperText: 'From 5%'
  }
};
const {minAmount, maxAmount, minTerm, maxTerm, minRate} = VALIDATION_RULES;


function App() {
  const [inputs, setInputs] = useState<TInputs>(initialInputs);
  const [payments, setPayments] = useState<TPayment[]>([]);
  
  const inputChangedHandler = useCallback((inputId: string, enteredValue: string) => {
    const numericValue = parseFloat(enteredValue) || 0;
    
    setInputs((prevState) => ({
      ...prevState,
      [inputId]: { ...prevState[inputId], value: numericValue, isValid: true }
    }));
  }, []);
  
  const submitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const { amount, term, rate } = inputs;
    const isAmountValid = amount.value >= minAmount && amount.value <= maxAmount;
    const isTermValid = term.value > minTerm && term.value <= maxTerm;
    const isRateValid = rate.value >= minRate;
    
    if(!isAmountValid || !isTermValid || !isRateValid) {
      setInputs({
        amount: { ...amount, isValid: isAmountValid },
        term: { ...term, isValid: isTermValid },
        rate: { ...rate, isValid: isRateValid }
      });
      
      return;
    }
    
    const paymentsSchedule = calculatePaymentsSchedule(amount.value, rate.value, term.value);
    
    setPayments(paymentsSchedule);
  }, [inputs, minAmount, maxAmount, minTerm, maxTerm, minRate]);
  
  return (
    <div className="App">
      <form
          noValidate
          onSubmit={submitHandler}
      >
        <InputsList inputs={inputs} changedHandler={inputChangedHandler}/>
        
        <Button variant="contained" type="submit">
          Calculate
        </Button>
      </form>
      {payments.length > 0 && <div className="table">
        <DataGrid
            rows={payments}
            columns={COLUMNS}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 50]}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSorting
            disableColumnMenu
            disableColumnResize
        />
      </div>}
    </div>
  );
}

export default App;
