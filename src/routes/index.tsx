import { Home, List } from "components";

const homeRoutes = {
  path: "/",
  element: <Home />,
};

const listRoutes = {
  path: "/list",
  element: <List />,
};

const routes = [homeRoutes, listRoutes];

export default routes;
