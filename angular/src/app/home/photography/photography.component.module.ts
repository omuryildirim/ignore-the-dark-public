import {NgModule} from '@angular/core';
import {PipesModule} from '../../shared/pipes.module';
import {PhotographyComponent} from './photography.component';
import {PhotographyService} from './photography.service';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    PipesModule,
    CommonModule
  ],
  declarations: [
    PhotographyComponent
  ],
  exports: [
    PhotographyComponent
  ],
  providers: [
    PhotographyService
  ]
})
export class PhotographyComponentModule {
}
