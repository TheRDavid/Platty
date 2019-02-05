import * as React from "react";
import { Login } from "./StandardLogin";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import * as themeDefinition from "../style/theme.json";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import * as appConfig from "../../settings/app.json";
import { AppSettings } from "../datatypes/AppSettings";
import { Typography } from "@material-ui/core";
import { TopBar } from "./TopBar";
import { throws } from "assert";
import { SideMenu } from "./SideMenu";

const theme = createMuiTheme({
  palette: themeDefinition.palette
});
export interface Props {
  fs: any;
}
interface IState {
  signedIn: boolean;
  userEmail: string;
}

export class Dashboard extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = { signedIn: false, userEmail: null };
  }

  signIn = (user: string) => {
    this.setState({ signedIn: true, userEmail: user });
  };

  render() {
    // increase build number
    var appSettings: any = appConfig as AppSettings;
    appSettings.build++;
    this.props.fs.writeFile(
      "./settings/app.json",
      JSON.stringify(appSettings),
      err => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );

    return (
      <MuiThemeProvider theme={theme}>
        <TopBar fs={this.props.fs} />

        <Grid
          className="mainGrid"
          container
          spacing={32}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {!this.state.signedIn ? (
            <Grid item xs={5}>
              <Login fs={this.props.fs} onSuccess={this.signIn} />
            </Grid>
          ) : null}
        </Grid>
      </MuiThemeProvider>
    );
  }
}
