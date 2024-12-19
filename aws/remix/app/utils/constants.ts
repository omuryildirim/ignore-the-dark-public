export const Languages = {
  lngs: {
    en: { nativeName: 'EN' },
    tr: { nativeName: 'TR' }
  } as Record<string, Record<'nativeName', string>>
};

export const ExifKeys = ['date', 'exposureTime', 'fNumber', 'ISO', 'focalLength', 'make', 'model', 'lens'] as const;

export const ExifKeyLabels: { [K in (typeof ExifKeys)[number]]: string } = {
  date: 'Date',
  exposureTime: 'Exposure Time',
  fNumber: 'F Number',
  ISO: 'ISO',
  focalLength: 'Focal Length',
  make: 'Make',
  model: 'Model',
  lens: 'Lens'
};
