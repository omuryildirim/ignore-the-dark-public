import {NgModule} from '@angular/core';
import {LocalizationPipe} from './pipes/localization.pipe';
import {SafePipe} from './pipes/safe.pipe';

@NgModule({
  declarations: [
    LocalizationPipe,
    SafePipe
  ],
  exports: [
    LocalizationPipe,
    SafePipe
  ]
})
export class PipesModule {}
