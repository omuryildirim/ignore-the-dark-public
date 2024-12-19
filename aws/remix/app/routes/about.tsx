import type { MetaFunction } from '@remix-run/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { currentLevelExpEducationList, currentLevelExpInterestsList, papersAndAwards } from '~/routes/constants';
import { LinkWithQuery } from '~/utils/components/LinkWithQuery';

export const meta: MetaFunction = () => {
  return [{ title: 'About' }];
};

// This tells remix to load the "home" namespace
export const handle = { i18n: 'common' };

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="main">
      <div className="content about active">
        <LinkWithQuery className="close" to="/">
          X
        </LinkWithQuery>
        <div className="quote">{t('About__Quote')}</div>
        <div className="main__container">
          <div className="header">{t('About')}</div>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: doesn't matter */}
          <span dangerouslySetInnerHTML={{ __html: t('philosophy_exp') }} />
        </div>
        <div className="main__container">
          <div className="header">{t('About_Current_Level')}</div>
          <div>
            <span>{t('current_level_exp')}</span>
          </div>
          <div className="box active">
            <div className="header">{t('Education')}</div>
            <ul>
              {currentLevelExpEducationList.map((edu) => (
                <li key={edu}>{edu}</li>
              ))}
            </ul>
            <div className="header">{t('Papers & Awards')}</div>
            <ul>
              {papersAndAwards.map((paper, index) => (
                <>
                  {/* biome-ignore lint/security/noDangerouslySetInnerHtml: doesn't matter */}
                  <li key={paper} dangerouslySetInnerHTML={{ __html: paper }} />
                </>
              ))}
            </ul>
          </div>
          <div className="header">{t('Interests')}</div>
          <ul>
            {currentLevelExpInterestsList.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>

        <div className="cv-holder">
          <a className="clear" href="/img/CV-2024.pdf" target="_blank" rel="noreferrer">
            {t('See CV')}
          </a>
        </div>
      </div>
    </div>
  );
}
