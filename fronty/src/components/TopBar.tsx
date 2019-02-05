import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import * as appConfig from "../../settings/app.json";
import { Typography } from "@material-ui/core";

export interface Props {
  fs: any;
}
interface IState {}

export class TopBar extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <AppBar position="static" className="mainTitleBar">
        <Toolbar>
          <IconButton color="inherit">
            <i className="fas fa-bars" />
          </IconButton>
          <InputBase
            className="mainSearchBar"
            placeholder="Search Artwork, Users, Groups..."
          />
          <Typography> build {appConfig.build} </Typography>
          <span className="spanToRight" />
          <IconButton color="inherit">
            <i className="far fa-comment-alt" />
          </IconButton>
          <IconButton color="inherit">
            <i className="far fa-bell" />
          </IconButton>
          <IconButton color="inherit">
            <i className="fas fa-sliders-h" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
