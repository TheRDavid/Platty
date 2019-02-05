import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dashboard } from "./components/Dashboard";
var filesystem = require("fs");

ReactDOM.render(
  <Dashboard fs={filesystem} />,
  document.getElementById("dashboard")
);
