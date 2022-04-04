import {
  Container,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import CurrencyTable from "components/CurrencyTable";
import { useAPIQuery } from "hooks";
import { conversion } from "store/conversion";
import { useSnapshot } from "valtio";

import { SymbolsDTO } from "types";

const List = () => {
  const converted = useSnapshot(conversion);
  const latestQuery = useAPIQuery({
    url: "latest",
    params: { base: converted.from, amount: converted.amount },
    options: {
      enabled: false,
      // refetchInterval: 15000,
    },
  });
  const symbolsQuery = useAPIQuery<SymbolsDTO.Result>({ url: "symbols" });

  const symbols = Object.keys(symbolsQuery.data?.symbols || {});

  const currencies = Object.entries(latestQuery.data?.rates || {});
  console.log(currencies);

  return (
    <Container>
      <Box component="form" sx={{ marginBottom: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              value={converted.amount}
              onFocus={(e) => e.target.select()}
              onChange={(e) => converted.setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel id="from">To</InputLabel>
              <Select
                sx={{ minWidth: "100px" }}
                label="From"
                labelId="from"
                value={converted.from || ""}
                onChange={(e) => {
                  converted.setFrom((e.target.value as string) || "");
                }}
              >
                {symbols.map((currency, idx) => (
                  <MenuItem key={idx} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={() => latestQuery.refetch()}>
              Convert
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CurrencyTable currencies={currencies} />
    </Container>
  );
};

export default List;
