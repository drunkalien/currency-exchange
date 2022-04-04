import {
  Container,
  Grid,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CompareArrows } from "@mui/icons-material";
import { conversion } from "store/conversion";
import { useSnapshot } from "valtio";
import { Backdrop } from "components";
import { useAPIQuery } from "hooks";
import { SymbolsDTO } from "types";

const Home = () => {
  const converted = useSnapshot(conversion);
  const symbolsQuery = useAPIQuery<SymbolsDTO.Result>({ url: "symbols" });

  const symbols = Object.keys(symbolsQuery.data?.symbols || {});

  return (
    <Container>
      <Backdrop open={converted.isFetching} />
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              value={converted.amount || ""}
              onFocus={(e) => e.target.select()}
              onChange={(e) => converted.setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <InputLabel id="from">From</InputLabel>
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
          <Grid item xs={2}>
            <Button
              variant="outlined"
              sx={{
                padding: "15px",
                borderRadius: "50%",
              }}
              onClick={() => {
                converted.swap();
                converted.fetch();
              }}
            >
              <CompareArrows />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <InputLabel id="to">To</InputLabel>
              <Select
                sx={{ minWidth: "100px" }}
                label="To"
                labelId="to"
                value={converted.to || ""}
                onChange={(e) => {
                  converted.setTo((e.target.value as string) || "");
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
          <Grid item xs={3}>
            <TextField
              InputProps={{ readOnly: true }}
              variant="outlined"
              value={converted.result || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => converted.fetch()} variant="contained">
              Convert
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
