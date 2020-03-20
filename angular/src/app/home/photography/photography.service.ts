import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class PhotographyService {
  /**
   * Initializer.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {}

  getPhotoData() {
    return this.httpClient.get("/api/photography");
  }

  getPhoto(photo: string): Observable<any> {
    return this.httpClient.get("../../../../../photography/" + photo, { responseType: "blob" });
  }
}
