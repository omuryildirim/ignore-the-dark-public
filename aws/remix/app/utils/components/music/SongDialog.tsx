import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MusicConstants } from '~/utils/components/music/constants';

// This tells remix to load the "home" namespace
export const handle = { i18n: 'common' };

export type SongDialogProps = {
  data: {
    songsConstant: 'simpleRepetitionsSongs' | 'existenceSongs' | 'dualitiesSongs';
    name: string;
  };
  onClose: (value: string) => void;
};

export const SongDialog = ({ data, onClose }: SongDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog onClose={onClose} open={true} aria-labelledby="dark" fullScreen={false} fullWidth={false}>
      <DialogTitle>{data.name}</DialogTitle>
      <DialogContent>
        <p className="story">{MusicConstants[data.songsConstant][data.name].story}</p>
        <div className="instruments">
          <h4>{t('Instruments')}</h4>
          {MusicConstants[data.songsConstant][data.name].instruments.map((instrument, index) => (
            <span key={instrument} className="instrument">
              {t(instrument)}
              {MusicConstants[data.songsConstant][data.name].instruments.length > index + 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
