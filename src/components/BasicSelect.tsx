import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type PropsFunction = (level: string) => void;

interface Props {
  level: string;
  updateLevel: PropsFunction;
}

export default function BasicSelect({ level, updateLevel }: Props) {
  const [innerlevel, setInnerLevel] = React.useState(level);

  const handleChange = (event: SelectChangeEvent) => {
    setInnerLevel(event.target.value as string);
    updateLevel(event.target.value as string);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="level-select-label">Level</InputLabel>
        <Select
          labelId="level-select-label"
          id="level-select"
          value={innerlevel}
          label="level"
          onChange={handleChange}
        >
          <MenuItem value={1}>Easy</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
