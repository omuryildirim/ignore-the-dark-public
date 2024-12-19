import type { LinksFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { Link } from '@remix-run/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import musicStyles from '~/styles/music.css';
import songDialogStyles from '~/styles/song-dialog.css';
import worksStyles from '~/styles/works.css';
import { LinkWithQuery } from '~/utils/components/LinkWithQuery';
import { Music } from '~/utils/components/music';
export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: musicStyles
  },
  {
    rel: 'stylesheet',
    href: songDialogStyles
  },
  {
    rel: 'stylesheet',
    href: worksStyles
  }
];

export const meta: MetaFunction = () => {
  return [{ title: 'Works' }];
};

// This tells remix to load the "home" namespace
export const handle = { i18n: 'common' };

export default function Works() {
  const { t } = useTranslation();
  const [selectedWork, setSelectedWork] = useState('');

  return (
    <div className="main">
      <div className={selectedWork ? 'content works active work-selected' : 'content works active'}>
        <LinkWithQuery className="close" to="/">
          {' '}
          X{' '}
        </LinkWithQuery>
        {!selectedWork && (
          <div className="work-selections">
            <div className="work-text" onClick={() => setSelectedWork('Music')}>
              {t('Music')}
            </div>
            <Link to="/photography" className="work-text">
              {t('Photography')}
            </Link>
          </div>
        )}
        {selectedWork === 'Music' && <Music />}
      </div>
    </div>
  );
}
