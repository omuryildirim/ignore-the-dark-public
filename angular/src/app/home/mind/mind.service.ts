import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MindService {
  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http.get("../../public/data/articles.json");
  }
}
