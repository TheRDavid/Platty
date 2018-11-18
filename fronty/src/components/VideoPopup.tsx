import * as React from "react";
import { Login } from "./StandardLogin";
import { element } from "prop-types";

export interface IProps {
  title: String;
  mediaPath: string;
  youtubeEmbedConfig: string;
}
interface IState {
  playing: boolean;
}

export class VideoPopup extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      playing: true
    };
  }
  play() {
    this.setState({
      playing: true
    });
    var elems = document.querySelectorAll("#videoModal");
    var instance = M.Modal.init(elems, { dismissible: true })[0];

    // in case it was paused before
    var iframe = document.querySelector("iframe");
    if (iframe && !this.state.playing)
      iframe.src = this.props.mediaPath.concat(this.props.youtubeEmbedConfig);

    instance.open();
  }

  close = () => {
    this.setState({
      playing: false
    });
    var elems = document.querySelectorAll("#videoModal");
    var instance = M.Modal.getInstance(elems[0]);
    instance.close();
    var iframe = document.querySelector("iframe");
    var video = document.querySelector("video");
    if (iframe) {
      iframe.src = "https:";
      return;
    }
    if (video) video.pause();
  };

  render() {
    return (
      <div className="row">
        <link rel="stylesheet" type="text/css" href="src/css/videoPopup.css" />
        <div id="videoModal" className="modal">
          <link
            rel="stylesheet"
            type="text/css"
            href="src/css/videoPopup.css"
          />
          <div className="row">
            <nav>
              <div className="nav-wrapper">
                <div className="row breadcrumb title">
                  {this.props.title}
                  <button
                    className="btn-floating btn-close"
                    onClick={this.close}
                  >
                    <i className="material-icons md-16">close</i>
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className="row">
            <div className="modal-content">
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={this.props.mediaPath.concat(youtubeEmbedConfig)}
                  frameBorder="0"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
