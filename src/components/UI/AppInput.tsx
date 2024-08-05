import { TextField } from "@mui/material";
import React, {memo} from "react";

type TAppInputProps = {
  hasError: boolean;
  value: number;
  label: string;
  onChange: (value: string) => void;
  helperText?: string;
}

export const AppInput = memo(({hasError, value, label, onChange, helperText}: TAppInputProps) =>
  (<TextField
        id="standard-basic"
        label={label}
        variant="standard"
        error={hasError}
        value={value || ''}
        required
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        helperText={helperText || null}
    />)
);
