import { Component, OnInit } from "@angular/core";
import { CharacterService } from "./character.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.page.html",
  styleUrls: ["./characters.page.scss"]
})
export class CharactersPage implements OnInit {
  totalPages: number = 0;
  currentIndex: number = 1;
  nextIndex: number = null;
  previousIndex: number = null;

  loading: HTMLIonLoadingElement = null;

  characters: any[];
  constructor(
    private characterSvc: CharacterService,
    public loadingController: LoadingController
  ) {}

  async presentLoading() {}

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: "Please wait..."
    });
    this.getCharactersData(this.currentIndex);
  }

  getCharactersData(pageIndex: number) {
    this.loading.present();
    this.characterSvc.getCharactersList(pageIndex).subscribe(response => {
      const { info, results } = response.data.characters;
      this.totalPages = info.pages;
      this.nextIndex = info.next;
      this.previousIndex = info.prev;
      this.loading.dismiss();
      this.characters = results;
    });
  }

  nextPage() {
    if (this.nextIndex) {
      this.getCharactersData(this.nextIndex);
    }
  }

  previousPage() {
    if (this.previousIndex) {
      this.getCharactersData(this.previousIndex);
    }
  }
}
