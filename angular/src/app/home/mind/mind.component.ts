import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router"
import {LanguageService} from "../../shared/services/language.service";
import {MindService} from "./mind.service";

@Component({
  selector: "app-mind",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./mind.component.html",
  styleUrls: ["./mind.component.scss", "../home.component.scss"],
  providers: [MindService]
})

export class MindComponent implements OnInit {
  private selectedArticle = "Introduction";
  private selectedArticleIndex = 0;
  private inverse = true;

  public articles: { en: ArticleData; tr: ArticleData; }[];
  public articleHeaders: { en: string; tr: string }[] = [];

  constructor(private router: Router, private mindService: MindService,
              private languageService: LanguageService) {
  }

  ngOnInit() {
    this.createArticles();
  }

  private scrollTo() {
    this.router.navigate(["/"]);
  }

  private selectArticle(index: number) {
    this.selectedArticleIndex = index;
    this.selectedArticle = this.articles[index].en.header;
  }

  public createArticles() {
    this.mindService.getArticles().subscribe((data: { en: ArticleData; tr: ArticleData; }[]) => {
      this.articles = data;
      this.articleHeaders = [];
      for (const article of data) {
        this.articleHeaders.push({"en": article.en.header, "tr": article.tr.header});
      }
    });
  }

  private selectInverse() {
    this.inverse = !this.inverse;
  }
}

interface ArticleData {
  header: string;
  text: string;
  information: string;
}
