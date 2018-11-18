import * as React from "react";
import * as ReactDOM from "react-dom";
import "./css/color.scss";

import { Dashboard } from "./components/Dashboard";

ReactDOM.render(<Dashboard login={true} />, document.getElementById("example"));
