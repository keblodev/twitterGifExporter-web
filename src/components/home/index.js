import React, { Component } from 'react';
import style from './style.module.less';

import {BASE_URL} from '../../statics/config'

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
    // TODO:
    const kintok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwOWIzYzMzNi1kODVmLTExZTktOWU1MS0zNjBlNTkzOWEwZDEiLCJhdWQiOiJLaW50b0h1YkdhdGV3YXkiLCJleHAiOjE1Njk4MzM0MzAsImlhdCI6MTU2ODYyMzgzMCwiaXNzIjoiS2ludG9IdWJHYXRld2F5Iiwic3ViIjoie1wic2Vzc2lvbklkXCI6XCIwOWIzYzMzNi1kODVmLTExZTktOWU1MS0zNjBlNTkzOWEwZDFcIn0ifQ.OSeVXgThvROslyHEUFSeTNSOUuudlFSxD87u6PCt9VM'
    const baseUrl = 'https://e229472f-d0e1-4705-a961-ac77d8349f81.api.beta.kintohub.com/twitterapi'

    return (
      <div className={style.home}>
        <div
            className={style.homeContainer}
        >
            <h1>You found it! A simple Twitter GIF converter!</h1>
            <h2>Just paste your twitter link bellow and wait for magic to happen.</h2>
            <div
              className={style.inputContainer}
            >
              <input
                tabIndex="1"
                placeholder="paste your url here and press a button..."
                className={style.input}
                type="text"
                onKeyUp={this.onKeyUp}
                onChange={this.onChange}
              />
              <button
                className={style.button}
                tabIndex="2"
                // onClick={this.onSubmit}
              >Get that shit</button>
            </div>
            {
              this.state.url ? (
                <div style={{margin: '30px'}}>
                  {
                    !this.state.loaded ? (
                      <div>
                        Getting your thing...
                      </div>
                    ) : null
                  }
                  <img
                  onLoad={()=> this.setState({loaded: true})}
                  className={[
                    style.img,
                    !this.state.loaded ? style.imgSpin : ""
                  ].join(" ")}
                  // process.env.KINTOK
                  src={`${baseUrl}/process?url=${this.state.url}&kintok=${kintok}`}></img>

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
