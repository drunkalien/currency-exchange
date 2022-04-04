import "./App.css";
import { Navbar } from "./components";
import { useRoutes } from "react-router-dom";

import routes from "routes";
import { Box } from "@mui/material";

function App() {
  const routing = useRoutes(routes);
  return (
    <div className="App">
      <Box mb={5}>
        <Navbar />
      </Box>
      {routing}
    </div>
  );
}

export default App;
