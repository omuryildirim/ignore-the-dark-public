import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MindService {
  /**
   * Initializer.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch articles from back-end.
   */
  getArticles() {
    return this.httpClient.get('../../public/data/articles.json');
  }
}
