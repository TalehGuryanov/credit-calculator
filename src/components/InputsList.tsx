import {AppInput} from "./UI/AppInput";
import {Box} from "@mui/material";
import React, {memo, useMemo} from "react";
import {TInputs} from "../types";

type InputsListProps = {
  inputs: TInputs;
  changedHandler: (input: string, value: string) => void;
}

export const InputsList = memo(({inputs, changedHandler}: InputsListProps) => {
  const inputList =
    useMemo(() => (Object.keys(inputs).map((input) =>
      (<AppInput
          label={inputs[input].label}
          value={inputs[input].value}
          hasError={!inputs[input].isValid}
          onChange={value => changedHandler(input, value)}
          helperText={inputs[input].helperText}
          key={input}
      />)
    )), [inputs, changedHandler]);
  
  return (<Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
  >
    {inputList}
  </Box>)
})
