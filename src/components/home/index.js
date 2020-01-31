import React, { useState } from 'react';

import { useLocale } from 'common/utils/hooks';
import { localize } from 'common/utils/locale';

import Vl from 'common/components/loaders/view'

import style from './style.module.less';
import {API_URL, API_TOKEN} from '../../statics/config'

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
        default:
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
                // eslint-disable-next-line
                tabIndex="1"
                placeholder={localize('twitterGiffer.placeholder1')}
                className={style.input}
                type="text"
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
              <button
                className={style.button}
                // eslint-disable-next-line
                tabIndex="2"
                onClick={onSubmit}
              ><Vl loading={isLocaleUpdating}>{localize('twitterGiffer.buttonText')}</Vl></button>
            </div>
            {
              state.url ? (
                <div className={style.imgContainer}>
                  {
                    !state.loaded ? (
                      <div>{localize('twitterGiffer.text3')}...</div>
                    ) : null
                  }
                  <img
                  alt="gif"
                  onLoad={()=> setState({...state, loaded: true})}
                  className={[
                    style.img,
                    !state.loaded ? style.imgSpin : ""
                  ].join(" ")}
                  src={`${API_URL}/process?url=${state.url}&kintok=${API_TOKEN}`}/>
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
