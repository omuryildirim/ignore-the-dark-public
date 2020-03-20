/**
 * Usage: dateString | localDate:'format'
 **/

import {Pipe, PipeTransform} from '@angular/core';
import {LanguageService} from "../services/language.service";

@Pipe({
  name: "localize",
  pure: false
})
export class LocalizationPipe implements PipeTransform {

  /**
   * Initializer/
   * @param languageService
   */
  constructor(private languageService: LanguageService) {
  }

  /**
   * Transform text to local string.
   * @param value
   */
  transform(value: string) {
    return this.languageService.translations[value] || value;
  }
}
