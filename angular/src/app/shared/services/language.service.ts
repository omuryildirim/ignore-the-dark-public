import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LanguageService implements OnInit {
  private _language = 'en';
  public translations: {[key: string]: string};

  /**
   * Initializer.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get translations on creation.
   */
  ngOnInit() {
    this.getTranslations();
  }

  /**
   * Return language.
   */
  get language() {
    return this._language;
  }

  /**
   * Set language.
   * @param newLanguage: New language.
   */
  set language(newLanguage: string) {
    this._language = newLanguage;
    this.getTranslations();
  }

  /**
   * Switch between languages.
   */
  public switchLanguage() {
    if (this.language === 'tr') {
      this.language = 'en';
    } else {
      this.language = 'tr';
    }
  }

  /**
   * Get translations from back-end and store them.
   */
  private getTranslations() {
    let url = '../../../public/data/translations.json';
    if (this.language === 'en') {
      url = '../../../public/data/translations_en.json';
    }

    this.httpClient.get(url)
      .subscribe((data: {[key: string]: string}) => {
        this.translations = data;
      });
  }
}
