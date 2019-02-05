import * as React from "react";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import * as frontendConfig from "../../settings/frontendConfig.json";
import * as userConfig from "../../settings/user.json";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { DialogContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { any } from "prop-types";
import { UserSettings } from "../datatypes/userSettings";

interface IState {
  formData: [string, string];
  errorStatus: [String, String];
  authentificationFailed: boolean;
  rememberMe: boolean;
}

interface Props {
  fs: any;
  onSuccess: (user: string) => void;
}

export class Login extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authentificationFailed: false,
      errorStatus: null,
      rememberMe: frontendConfig.rememberCredentials,
      formData:
        userConfig.mail == null
          ? ["a", ""]
          : [userConfig.mail, userConfig.password]
    };
  }

  handleKeyEvent = (e: any) => {
    if (e.key === "Escape") this.auth();
  };

  handleErrorDialogClose = () => {
    this.setState({ authentificationFailed: false });
    this.setState({
      formData: [this.state.formData[0], ""]
    });
  };

  respond = response => {
    if (response["type"] === "success") {
      var usrSettings: any = userConfig as UserSettings;
      usrSettings.mail = this.state.formData[0];
      usrSettings.password = this.state.formData[1];
      this.props.fs.writeFile(
        "./settings/user.json",
        JSON.stringify(usrSettings),
        err => {
          if (err) throw err;
          console.log("The file has been saved!");
        }
      );
      this.props.onSuccess(this.state.formData[0]);
    } else if (response["type"] === "error") {
      this.setState({
        errorStatus: ["Could not login", response["data"]],
        authentificationFailed: true
      });
    }
  };

  auth = () => {
    console.log("This ", this);
    var that = this;
    fetch(frontendConfig["backendAddress"] + "login", {
      body: JSON.stringify({
        email: this.state.formData[0],
        password: this.state.formData[1]
      }),
      method: "post"
    }).then(response =>
      response.json().then(response => this.respond(response))
    );
  };

  render() {
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={true}
        aria-describedby="alert-dialog-description"
        className="defaultDialog"
      >
        <DialogTitle id="simple-dialog-title">Who's this?</DialogTitle>
        <DialogContent>
          {/* Form */}

          <Grid container justify="center">
            <Avatar className="loginAvatar">
              <i className="far fa-user fa-4x" />
            </Avatar>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={8}>
              <TextField
                autoFocus
                value={this.state.formData[0]}
                onKeyDown={e => {
                  if (e.keyCode == 13) {
                    {
                      /* If ENTER key */
                    }
                    this.auth();
                  }
                }}
                onChange={e =>
                  this.setState({
                    formData: [e.target.value, this.state.formData[1]]
                  })
                }
                id="emailField"
                label="E-Mail"
                className="emailField"
                placeholder="username@provider.kp"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                value={this.state.formData[1]}
                onKeyDown={e => {
                  if (e.keyCode == 13) {
                    {
                      /* If ENTER key */
                    }
                    this.auth();
                  }
                }}
                onChange={e =>
                  this.setState({
                    formData: [this.state.formData[0], e.target.value]
                  })
                }
                id="passwordField"
                label="Password"
                placeholder="super-safe-password"
                margin="normal"
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={2} />
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={this.state.rememberMe}
                    value="gilad"
                  />
                }
                label="Remember me plz"
              />
            </Grid>
            <Grid item xs={2} />
            <Grid container xs={12} justify="flex-end">
              <span className="spanToRight" />
              <Button color="primary" onClick={this.auth}>
                Aight, go!
              </Button>
              <Button color="default">Crap, forgot creds</Button>
            </Grid>
          </Grid>

          {/* Authentification failed dialog*/}

          <Dialog
            onClose={this.handleErrorDialogClose}
            open={this.state.authentificationFailed}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Nope</DialogTitle>
            <DialogContent>
              <DialogContentText>You done fucked up :/</DialogContentText>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    );
  }
}
