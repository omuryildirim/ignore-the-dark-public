import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next/react';
import i18next from '~/i18next.server';

import styles from './styles/index.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  {
    rel: 'stylesheet',
    href: styles
  }
];

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common'
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  const t = await i18next.getFixedT(request, 'common');
  const title = t('headTitle');
  return { locale, title };
};

export default function App() {
  const { i18n } = useTranslation();
  const { locale } = useLoaderData() as { locale: string };

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  const gaTrackingId = 'G-MYWL7RGQ96';

  return (
    <html lang={i18n.resolvedLanguage} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
        <script
          async
          id="gtag-init"
          /* biome-ignore lint/security/noDangerouslySetInnerHtml: doesn't matter */
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
