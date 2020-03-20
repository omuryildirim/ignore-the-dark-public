import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import {LanguageService} from "../shared/services/language.service";

@Component({
  selector: "app-home",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {
  public location: string;
  public works: Array<string> = ["Music", "Photography"]; // , "Source_Codes"
  public selectedWork: string = "";

  public currentLevelExpEducationList = [
    "M.Sc. Technische Universität München, Electric and Information Engineering",
    "M.Sc. Yıldız Technical University, Electronic Engineering",
    "B.Sc. Yıldız Technical University, Electronic and Communication Engineering",
  ];

  public papersAndAwards = [
    "Yildirim, Ömür et al. <a href='https://ieeexplore.ieee.org/abstract/document/8778341/' target='_blank'>\"Decision Process of Autonomous Drones for Environmental Monitoring.\"</a> 2019 IEEE International Symposium on INnovations in Intelligent SysTems and Applications (INISTA). IEEE, 2019.",
    "<a href='http://inista.org/inista19/Best%20Paper%20Awards.pdf' target='_blank'>INISTA '19 Best Paper Award</a>",
    "Yildirim, Ömür et al. <a href='https://www.researchgate.net/profile/Fuat_Beser/publication/320508628_Bulanik_Mantik_Kullanarak_Hava_Savunma_Karar_Destek_Sistemi_Tasarimi_Air_Defence_Decision_Support_System_Design_Using_Fuzzy_Logic/links/59e918fd458515c3633b81dc/Bulanik-Mantik-Kullanarak-Hava-Savunma-Karar-Destek-Sistemi-Tasarimi-Air-Defence-Decision-Support-System-Design-Using-Fuzzy-Logic.pdf' target='_blank'>\"Bulanık Mantık Kullanarak Hava Savunma Karar Destek Sistemi Tasarımı Air Defence Decision Support System Design Using Fuzzy Logic.\"</a>"
  ];

  public currentLevelExpInterestsList = [
    "Autonomous Systems",
    "Machine Learning, -Deep Learning, Neural Networks, Reinforcement Learning-",
    "Computer Vision",
    "Humanoid Robotics",
    "AI with Web Applications"
  ];

  constructor(private router: Router, private appLocation: Location, public languageService: LanguageService) {
  }

  ngOnInit() {
    this.location = this.appLocation.path();
    if (this.location === "/photography") {
      this.selectedWork = "Photography";
    } else if (this.location === "/music") {
      this.selectedWork = "Music";
    }
  }

  public selectWork(work: string) {
    this.selectedWork = work;
    this.router.navigateByUrl("/" + work.toLowerCase());
  }

  public navigateToSubPage(subPage: string) {
    this.router.navigateByUrl("/" + subPage);
    this.location = this.appLocation.path();
  }
}
