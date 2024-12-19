import type { LoaderFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkWithQuery } from '~/utils/components/LinkWithQuery';
import { Languages } from '~/utils/constants';

export const meta: MetaFunction = () => {
  return [{ title: 'Ignore the Dark' }];
};

export const loader: LoaderFunction = () => {
  return Languages;
};

// This tells remix to load the "home" namespace
export const handle = { i18n: 'common' };

export default function Index() {
  const { lngs } = useLoaderData() as typeof Languages;
  const { t, i18n } = useTranslation();

  return (
    <div className="main">
      <LinkWithQuery className="element" to="/about">
        {t('About')}
      </LinkWithQuery>
      <LinkWithQuery className="element" to="/works">
        {t('Works')}
      </LinkWithQuery>
      <LinkWithQuery className="element" to="/mind">
        {t('Mind')}
      </LinkWithQuery>

      <div className="select__language">
        {Object.keys(lngs).map(
          (lng) =>
            lng !== i18n.language && (
              <Link className="translate__button" key={lng} to={`/?lng=${lng}`}>
                {lngs[lng].nativeName}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
