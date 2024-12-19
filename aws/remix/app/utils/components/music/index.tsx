import Particles, { initParticlesEngine } from '@tsparticles/react';
import type React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { loadFull } from 'tsparticles';
import type { SongDialogProps } from '~/utils/components/music/SongDialog';
import { SongDialog } from '~/utils/components/music/SongDialog';
import { MusicConstants } from '~/utils/components/music/constants';
import {
  dualitiesEffect,
  existenceEffect,
  ossifyEffect,
  simpleRepetitionsEffect
} from '~/utils/components/music/effects';

export const Music: React.FunctionComponent = () => {
  const [albumSelection, setAlbumSelection] = useState('Simple Repetitions');
  const [initParticles, setInitParticles] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  const [songDialog, setSongDialog] = useState<{ open: false } | { open: true; data: SongDialogProps['data'] }>({
    open: false
  });

  return (
    <>
      <div
        className={albumSelection === 'Simple Repetitions' ? 'music-container dark' : 'music-container'}
        id="music-container"
      >
        <label className="label">
          <div className="header">Music</div>
        </label>
        <div className="get__full">
          <div
            className={albumSelection === 'Existence' ? 'tab__link selected' : 'tab__link'}
            data-target=".existence"
            data-job="tab"
            data-usage="1"
            onClick={() => existenceEffect(setAlbumSelection)}
          >
            Existence
          </div>
          <div
            className={albumSelection === 'Dualities' ? 'tab__link selected' : 'tab__link'}
            data-target=".dualities"
            data-job="tab"
            data-usage="1"
            onClick={() => dualitiesEffect(setAlbumSelection)}
          >
            Dualities
          </div>
          <div
            className={albumSelection === 'Ossify' ? 'tab__link selected' : 'tab__link'}
            data-target=".ossify"
            data-job="tab"
            data-usage="1"
            onClick={() => ossifyEffect(setAlbumSelection)}
          >
            Ossify
          </div>
          <div
            className={albumSelection === 'Simple Repetitions' ? 'tab__link selected' : 'tab__link'}
            data-target=".existence"
            data-job="tab"
            data-usage="1"
            onClick={() => simpleRepetitionsEffect(setAlbumSelection)}
          >
            Simple Repetitions
          </div>
        </div>
        {MusicConstants.albums.map(
          (album) =>
            album.name === albumSelection && (
              <span key={album.name}>
                {album.name === 'Simple Repetitions' && initParticles && (
                  <Particles
                    id="tsparticles"
                    options={MusicConstants.simpleRepetitionParticles}
                    className="particle-canvas"
                    style={{ width: '100%', height: '100%' }}
                  />
                )}

                <div className="album-container">
                  <div className="album-story">
                    {album.story}
                    {album.songs.map((song, index) =>
                      album.songConstant ? (
                        <div
                          key={song}
                          className="song-link"
                          onClick={() =>
                            setSongDialog({
                              open: true,
                              data: {
                                name: song,
                                songsConstant: album.songConstant
                              }
                            })
                          }
                        >
                          {index + 1}. {song}
                        </div>
                      ) : (
                        <div key={song} className="song-name">
                          {index + 1}. {song}
                        </div>
                      )
                    )}
                  </div>
                  <div className="sounds existence" data-usage="1t" id="simple-repetitions">
                    {album.spotify ? (
                      <span className="spotify">
                        <iframe title="spotify-list" src={album.spotify} width="300" height="380" frameBorder="0" />
                      </span>
                    ) : (
                      <></>
                    )}
                    {album.soundcloud ? (
                      <span className="soundcloud">
                        <iframe
                          title="soundcloud-list"
                          src={album.soundcloud}
                          width="300"
                          height="380"
                          scrolling="no"
                          frameBorder="no"
                          allow="autoplay"
                        />
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </span>
            )
        )}
      </div>
      {songDialog.open ? <SongDialog data={songDialog.data} onClose={() => setSongDialog({ open: false })} /> : <></>}
    </>
  );
};
