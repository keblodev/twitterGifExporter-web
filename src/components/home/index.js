import React, { useState } from 'react';

import { useLocale } from 'common/utils/hooks';
import { localize } from 'common/utils/locale';

import Vl from 'common/components/loaders/view'

import style from './style.module.less';
import {BASE_URL} from '../../statics/config'

export default ({locale}) => {
    const {isLocaleUpdating} = useLocale(__dirname, {locale})

    let _url = ""

    const [state, setState] = useState({
      url: "",
      loaded: false
    })

    const onChange = (e) => {
      _url = e && e.target.value;
    }

    const onKeyUp = (e) => {
      switch (e.keyCode) {
        case 13:
            onSubmit();
            break;
      }
    }

    const onSubmit = () => {
      if (state.url !== _url) {
        setState({
          url: _url,
          loaded: false
        });
      }
    }

    // TODO:
    const kintok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwOWIzYzMzNi1kODVmLTExZTktOWU1MS0zNjBlNTkzOWEwZDEiLCJhdWQiOiJLaW50b0h1YkdhdGV3YXkiLCJleHAiOjE1Njk4MzM0MzAsImlhdCI6MTU2ODYyMzgzMCwiaXNzIjoiS2ludG9IdWJHYXRld2F5Iiwic3ViIjoie1wic2Vzc2lvbklkXCI6XCIwOWIzYzMzNi1kODVmLTExZTktOWU1MS0zNjBlNTkzOWEwZDFcIn0ifQ.OSeVXgThvROslyHEUFSeTNSOUuudlFSxD87u6PCt9VM'
    const baseUrl = 'https://e229472f-d0e1-4705-a961-ac77d8349f81.api.beta.kintohub.com/twitterapi'

    return (
      <div className={style.home}>
        <div
            className={style.homeContainer}
        >
            <Vl loading={isLocaleUpdating}><h1>{localize('twitterGiffer.text1')}</h1></Vl>
            <Vl loading={isLocaleUpdating}><h2>{localize('twitterGiffer.text2')}</h2></Vl>
            <div
              className={style.inputContainer}
            >
              <input
                tabIndex="1"
                placeholder={localize('twitterGiffer.placeholder1')}
                className={style.input}
                type="text"
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
              <button
                className={style.button}
                tabIndex="2"
              ><Vl loading={isLocaleUpdating}>{localize('twitterGiffer.buttonText')}</Vl></button>
            </div>
            {
              state.url ? (
                <div style={{margin: '30px'}}>
                  {
                    !state.loaded ? (
                      <div>{localize('twitterGiffer.text3')}...</div>
                    ) : null
                  }
                  <img
                  onLoad={()=> setState({...state, loaded: true})}
                  className={[
                    style.img,
                    !state.loaded ? style.imgSpin : ""
                  ].join(" ")}
                  // process.env.KINTOK
                  src={`${baseUrl}/process?url=${state.url}&kintok=${kintok}`}></img>

                  {
                    state.loaded ? (
                      <div>{localize('twitterGiffer.text4')}...</div>
                    ) : null
                  }
                </div>
              ) : null
            }
        </div>
      </div>
    );
  }
