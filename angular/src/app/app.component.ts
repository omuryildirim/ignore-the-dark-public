import { Component } from '@angular/core';
import {LanguageService} from "./shared/services/language.service";

@Component({
  selector: 'ignore-the-dark', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public languageService: LanguageService) {
  }
}
