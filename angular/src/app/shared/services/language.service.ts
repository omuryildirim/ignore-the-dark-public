import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LanguageService {
  private _language: string = "en";
  public translations: {[key: string]: string};

  /**
   * Initializer.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {
    this.setTranslation();
  }

  get language() {
    return this._language;
  }

  set language(newLanguage: string) {
    this._language = newLanguage;
    this.setTranslation();
  }

  public switchLanguage() {
    if (this.language === "tr") {
      this.language = "en";
    } else {
      this.language = "tr";
    }
  }

  private setTranslation() {
    let url = "../../../public/data/translations.json";
    if (this.language === "en") {
      url = "../../../public/data/translations_en.json";
    }

    this.httpClient.get(url)
      .subscribe((data: {[key: string]: string}) => {
        this.translations = data;
      });
  }
}
