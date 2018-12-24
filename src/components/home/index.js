import { h, Component } from 'preact';
import style from './style.less';

export default class Home extends Component {

  _url = ""

  state = {
    url: "",
    loaded: false
  }

  onChange = (e) => {
    this._url = e && e.target.value;
  }

  onKeyUp = (e) => {
    switch (e.keyCode) {
      case 13:
          this.onSubmit();
          break;
    }
  }

  onSubmit = () => {
    if (this.state.url !== this._url) {
      this.setState({
        url: this._url,
        loaded: false
      });
    }
  }

  render = () => {
    return (
      <div class={style.home}>
        <div
            class={style.homeContainer}
        >
            <h1>You found it! A simple Twitter GIF converter!</h1>
            <h2>Just paste your twitter link bellow and wait for magic to happen.</h2>
            <div
              class={style.inputContainer}
            >
              <input
                tabIndex="1"
                placeholder="paste your url here and press a button..."
                class={style.input}
                type="text"
                onkeyup={this.onKeyUp}
                onChange={this.onChange}
              />
              <button
                class={style.button}
                tabIndex="2"
                onClick={this.onSubmit}
              >Get that shit</button>
            </div>
            {
              this.state.url ? (
                <div style="margin: 30px;">
                  {
                    !this.state.loaded ? (
                      <div>
                        Getting your thing...
                      </div>
                    ) : null
                  }
                  <img
                  onload={()=> this.setState({loaded: true})}
                  class={[
                    style.img,
                    !this.state.loaded ? style.imgSpin : ""
                  ].join(" ")}
                  src={"http://localhost:3000/process?url="+this.state.url}></img>

                  {
                    this.state.loaded ? (
                      <div>
                        Now right click on img -> Save As...
                      </div>
                    ) : null
                  }
                </div>
              ) : null
            }
        </div>
      </div>
    );
  }

}