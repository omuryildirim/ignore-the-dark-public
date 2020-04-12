import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LanguageService} from '../../shared/services/language.service';
import {MindService} from './mind.service';

@Component({
  selector: 'app-mind',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mind.component.html',
  styleUrls: ['./mind.component.scss', '../home.component.scss']
})

export class MindComponent implements OnInit {
  private selectedArticle = 'Introduction';
  private selectedArticleIndex = 0;
  private inverse = true;

  public articles: { en: ArticleData; tr: ArticleData; }[];
  public articleHeaders: { en: string; tr: string }[] = [];

  /**
   * Initializer.
   * @param router
   * @param mindService
   * @param languageService
   */
  constructor(private router: Router, private mindService: MindService, private languageService: LanguageService) {
  }

  /**
   * Create articles on component creation.
   */
  ngOnInit() {
    this.getArticles();
  }

  /**
   * Navigate to default path.
   */
  private navigateToDefaultPath() {
    this.router.navigate(['/']);
  }

  /**
   * Select one of the articles.
   * @param index: Article index.
   */
  private selectArticle(index: number) {
    this.selectedArticleIndex = index;
    this.selectedArticle = this.articles[index].en.header;
  }

  /**
   * Fetch articles from database and store data.
   */
  public getArticles() {
    this.mindService.getArticles().subscribe((data: { en: ArticleData; tr: ArticleData; }[]) => {
      this.articles = data;
      this.articleHeaders = [];
      for (const article of data) {
        this.articleHeaders.push({'en': article.en.header, 'tr': article.tr.header});
      }
    });
  }

  /**
   * Select inverse color set.
   */
  private selectInverse() {
    this.inverse = !this.inverse;
  }
}

interface ArticleData {
  header: string;
  text: string;
  information: string;
}
