import {NgModule} from '@angular/core';
import {MindComponent} from './mind.component';
import {MindService} from './mind.service';
import {PipesModule} from "../../shared/pipes.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
  ],
  declarations: [
    MindComponent
  ],
  exports: [
    MindComponent
  ],
  providers: [
    MindService
  ]
})
export class MindComponentModule {
}
