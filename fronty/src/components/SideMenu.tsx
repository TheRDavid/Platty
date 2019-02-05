import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import * as appConfig from "../../settings/app.json";
import { Typography } from "@material-ui/core";

export interface Props {
  fs: any;
}
interface IState {}

export class SideMenu extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Drawer open={true} variant="persistent">
        <List>
          <ListItem button key={"text"}>
            <ListItemIcon>
              <IconButton color="inherit">
                <i className="fas fa-plus" />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={"Add Piece"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"text"}>
            <ListItemIcon>
              <IconButton color="inherit">
                <i className="fas fa-plus" />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={"Add Piece"} />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
