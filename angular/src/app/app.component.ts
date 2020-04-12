import {Component} from '@angular/core';
import {LanguageService} from './shared/services/language.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ignore-the-dark',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public languageService: LanguageService) {
  }
}
