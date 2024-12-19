import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { Link, useLocation } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkWithQuery } from '~/utils/components/LinkWithQuery';
import { Languages } from '~/utils/constants';
import styles from '../styles/mind.css';
export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
];

export const meta: MetaFunction = () => {
  return [{ title: 'Mind' }];
};

type Article = Record<'en' | 'tr', { header: string; text: string; information: string }>;

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://example.com/data/articles.json');
  const articles: Article[] = await response.json();

  return {
    articles,
    ...Languages
  };
};

// This tells remix to load the "home" namespace
export const handle = { i18n: 'common' };

export default function Mind() {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [inverse, setInverse] = useState(true);
  const { t, i18n } = useTranslation();
  const { articles, lngs } = useLoaderData() as {
    articles: Article[];
    lngs: (typeof Languages)['lngs'];
  };
  const resolvedLanguage = i18n.language as 'en' | 'tr';
  const location = useLocation();

  const selectArticle = (index: number) => {
    setSelectedArticleIndex(index);
  };

  return (
    <div className="mind">
      <LinkWithQuery className="go__top" to="/">
        ^
      </LinkWithQuery>
      <div className={inverse ? 'content inverse' : 'content'}>
        <article>
          <header>
            <h1>Ignorantes Populus</h1>
          </header>
          <aside>
            {articles.map((article, index) => (
              <h4 key={article.tr.text} onClick={() => selectArticle(index)}>
                {index === selectedArticleIndex && <span>&bull; </span>}
                {t(article[resolvedLanguage].header)}
                {index === selectedArticleIndex && <span> &bull;</span>}
              </h4>
            ))}
            <div className="inverse-button" onClick={() => setInverse(!inverse)}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="adjust"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-adjust fa-w-16"
              >
                <path
                  fill="currentColor"
                  d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z"
                  className=""
                />
              </svg>
            </div>
          </aside>
          {articles[selectedArticleIndex] && (
            <section>
              {articles[selectedArticleIndex][resolvedLanguage].text ? (
                <>
                  <p
                    /* biome-ignore lint/security/noDangerouslySetInnerHtml: doesn't matter */
                    dangerouslySetInnerHTML={{
                      __html: articles[selectedArticleIndex][resolvedLanguage].text
                    }}
                  />
                  <div className="information">{articles[selectedArticleIndex][resolvedLanguage].information}</div>
                </>
              ) : (
                <div className="message">Article doesn't exists in English</div>
              )}
            </section>
          )}
        </article>
      </div>
      <div className="select__language">
        {Object.keys(lngs).map(
          (lng) =>
            lng !== resolvedLanguage && (
              <Link className="translate__button" key={lng} to={`${location.pathname}?lng=${lng}`}>
                {lngs[lng].nativeName}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
