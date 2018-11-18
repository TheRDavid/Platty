import * as React from "react";
import { VideoPopup } from "./VideoPopup";
import { frontendConfig } from "../frontend-config";

interface IState {
  helpPopup: React.RefObject<VideoPopup>;
  formData: [String, String];
  errorStatus: [String, String];
}

export class Login extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorStatus: null,
      helpPopup: React.createRef(),
      formData: ["", ""]
    };
  }

  updateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "name") this.state.formData[0] = event.target.value;
    if (event.target.id === "password")
      this.state.formData[1] = event.target.value;
  };

  handleKeyEvent = (e: any) => {
    if (e.key === "Enter") this.auth();
  };

  auth = () => {
    var that = this;
    fetch(frontendConfig.backendAddress + "login", {
      body: JSON.stringify({
        email: this.state.formData[0],
        password: this.state.formData[1]
      }),
      method: "post"
    }).then(function(response) {
      response.json().then(function(json) {
        console.log(json);
        if (json["type"] === "success") {
          var elems = document.querySelectorAll("#loginModal");
          var instance = M.Modal.getInstance(elems[0]);
          instance.close();
        } else if (json["type"] === "error") {
          that.setState({
            errorStatus: ["Could not login", json["data"]]
          });
          M.Modal.init(document.querySelectorAll("#errorModal"), {})[0].open();
        }
      });
    });
  };

  updateState = () => {
    this.state.helpPopup.current.play();
  };

  componentDidMount() {
    var elems = document.querySelectorAll("#loginModal");
    var instance = M.Modal.init(elems, { dismissible: false })[0];
    instance.open();
  }

  render() {
    return (
      <div className="row">
        <link rel="stylesheet" type="text/css" href="src/css/login.css" />
        {this.state.errorStatus !== null && (
          <div id="errorModal" className="modal">
            <div className="modal-content">
              <h4>{this.state.errorStatus[0]}</h4>
              <p>{this.state.errorStatus[1]}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-close waves-effect waves-green btn-flat">
                Ok
              </button>
            </div>
          </div>
        )}
        <VideoPopup
          ref={this.state.helpPopup}
          title="Hope this helps"
          mediaPath="https://www.youtube.com/embed/yl_5hFNiEwM"
        />
        <div id="loginModal" className="modal">
          <nav>
            <div className="nav-wrapper">
              <div className="col s4 offset-s4 breadcrumb title">
                <img
                  className="responsive-img circle"
                  src="https://placeimg.com/480/480/any"
                />
              </div>
            </div>
          </nav>
          <div className="modal-content">
            <div className="row">
              <div className="input-field col s10 offset-s1">
                <input
                  onKeyPress={this.handleKeyEvent}
                  onChange={this.updateFormData}
                  placeholder="Name"
                  id="name"
                  type="text"
                  className="validate"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10 offset-s1">
                <input
                  onKeyPress={this.handleKeyEvent}
                  onChange={this.updateFormData}
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="validate"
                />
              </div>
            </div>

            <div className="row">
              <div className="modal-footer col s6 offset-s5">
                <div className="row">
                  <div className="col s7">
                    <button
                      onClick={this.updateState}
                      className="waves-effect waves-light btn-large btn-trouble"
                    >
                      I need help
                    </button>
                  </div>
                  <div className="col s3">
                    <button
                      onClick={this.auth}
                      className="waves-effect waves-light btn-large btn-accept"
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
