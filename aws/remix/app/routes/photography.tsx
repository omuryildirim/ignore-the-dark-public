import type { LinksFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import photographyStyles from '~/styles/photography.css';
import { LinkWithQuery } from '~/utils/components/LinkWithQuery';
import { ExifKeyLabels, ExifKeys } from '~/utils/constants';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: photographyStyles
  }
];

export const meta: MetaFunction = () => {
  return [{ title: 'Photography' }];
};

interface PhotoData {
  name: string;
  date: string;
  exposureTime: string;
  fNumber: string;
  ISO: string;
  focalLength: string;
  make: string;
  model: string;
  lens: string;
}

export const loader = async () => {
  const response = await fetch('https://photography.example.com/exif.json');
  const exif = (await response.json()) as Record<string, PhotoData>;

  return { exif };
};

// This tells remix to load the "home" namespace
export const handle = { i18n: 'common' };

export default function Photography() {
  const { exif } = useLoaderData() as { exif: Record<string, PhotoData> };
  const { t } = useTranslation();

  const [selectedPhotography, setSelectedPhotography] = useState('');
  const [selectedPhotographyData, setSelectedPhotographyData] = useState('');
  const [photoData, setPhotoData] = useState<Record<string, PhotoData>>({});
  const [photoNames, setPhotoNames] = useState<string[]>([]);

  useEffect(() => {
    setPhotoData(exif);
    setPhotoNames(Object.keys(exif));
  }, [exif]);

  const selectPhoto = (photo: string) => {
    setSelectedPhotography(photo);
    setSelectedPhotographyData(`https://photography.example.com/${photo}`);
  };

  const changePicture = (event: React.KeyboardEvent) => {
    const isArrowLeft = event.key === 'ArrowLeft';
    const isArrowUp = event.key === 'ArrowUp';
    const isArrowRight = event.key === 'ArrowRight';
    const isArrowDown = event.key === 'ArrowDown';

    if (isArrowLeft || isArrowUp || isArrowRight || isArrowDown) {
      let selectedPhotoIndex = photoNames.indexOf(selectedPhotography);
      if (selectedPhotoIndex > -1) {
        if (isArrowLeft || isArrowDown) {
          if (selectedPhotoIndex) {
            selectedPhotoIndex -= 1;
          }
        } else if (selectedPhotoIndex < photoNames.length - 1) {
          selectedPhotoIndex += 1;
        }
      } else {
        selectedPhotoIndex = 0;
      }

      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.scrollLeft = selectedPhotoIndex * 160;
      }
      selectPhoto(photoNames[selectedPhotoIndex]);
    }
  };

  const onScroll = (event: React.WheelEvent) => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollLeft = gallery.scrollLeft + event.deltaY;
    }
    return false;
  };

  return (
    <span className="photography-container">
      <div id="viewer" className="photography-view" onKeyUp={(event) => changePicture(event)}>
        {selectedPhotography ? (
          <>
            <img alt="ignorethedark" src={selectedPhotographyData} />
            <div className="exif">
              <table className="information">
                <tbody>
                  {ExifKeys.map((infoKey) => (
                    <tr key={infoKey}>
                      <td className="key">{ExifKeyLabels[infoKey]}:</td>
                      <td className="value">{photoData[selectedPhotography][infoKey]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div
        id="gallery"
        className={selectedPhotography ? 'photography selected' : 'photography'}
        onWheel={(event) => onScroll(event)}
        onKeyUp={(event) => changePicture(event)}
      >
        {photoData &&
          photoNames.map((name) => (
            <img
              key={name}
              alt="ignorethedark"
              src={`https://photography.example.com/thumbnails/${name}`}
              className={selectedPhotography === name ? 'selected' : ''}
              onClick={() => selectPhoto(name)}
            />
          ))}
      </div>
      <div className="close return-button">
        <LinkWithQuery to="/">{t('Return')}</LinkWithQuery>
      </div>
    </span>
  );
}
