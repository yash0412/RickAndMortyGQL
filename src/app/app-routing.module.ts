import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "characters",
    pathMatch: "full"
  },
  {
    path: "characters",
    loadChildren: () =>
      import("./characters/characters.module").then(m => m.CharactersPageModule)
  },
  {
    path: "locations",
    loadChildren: () =>
      import("./locations/locations.module").then(m => m.LocationsPageModule)
  },
  {
    path: "episodes",
    loadChildren: () =>
      import("./episodes/episodes.module").then(m => m.EpisodesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
