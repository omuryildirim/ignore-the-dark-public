import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MindComponent} from "./home/mind/mind.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: HomeComponent},
  {path: "works", component: HomeComponent},
  {path: "music", component: HomeComponent},
  {path: "photography", component: HomeComponent},
  {path: "mind", component: MindComponent},
  {path: "**", redirectTo: ""}
];

export const routing = RouterModule.forRoot(routes);
