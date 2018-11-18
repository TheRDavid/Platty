import * as React from "react";
import { Login } from "./StandardLogin";

export interface DashboardProps {
  login: Boolean;
}

export class Dashboard extends React.Component<DashboardProps, {}> {
  render() {
    if (this.props.login) {
      return <Login />;
    }
    return <h1>Heldlo there</h1>;
  }
}
