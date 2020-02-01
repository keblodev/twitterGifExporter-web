import React from 'react';
import { useLocale } from 'common/utils/hooks';
import { localize } from 'common/utils/locale';
import style from './style.module.less';

import Vl from 'common/components/loaders/view'

export default function({locale}) {
    const {isLocaleUpdating} = useLocale(__dirname, {locale})
    return (
      <header className={style.header}>
        <Vl loading={isLocaleUpdating}><h1>{localize('twitterGiffer.headerText')}</h1></Vl>
        <a
          className={style.srcLink}
          href="https://github.com/ronanamsterdam/twitterGifExporter-web/tree/feat/sub-app"
          target="_blank" rel="noopener noreferrer"
        >
          <div>-> {localize('twitterGiffer.srcLink')}</div>
        </a>
      </header>
    );
}
