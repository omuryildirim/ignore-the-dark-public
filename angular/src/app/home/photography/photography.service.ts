import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PhotographyService {
  /**
   * Initializer.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch photo data from back-end.
   */
  getPhotoData() {
    return this.httpClient.get('/api/photography');
  }

  /**
   * Load a certain photo as blob.
   * @param photo: Name of photo.
   */
  getPhoto(photo: string): Observable<any> {
    return this.httpClient.get('../../../../../photography/' + photo, { responseType: 'blob' });
  }
}
