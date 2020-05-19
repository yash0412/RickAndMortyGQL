import { Component, OnInit } from "@angular/core";
import { CharacterService } from "./character.service";

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

  skeletonCount: any[];

  genders = {
    Male: { icon: "male-outline", color: "secondary" },
    Female: { icon: "female-outline", color: "danger" },
    unknown: { icon: "help-circle-outline", color: "success" },
    Genderless: { icon: "male-female-outline", color: "warning" }
  };

  characters: any[] = [];
  constructor(private characterSvc: CharacterService) {}

  ngOnInit() {
    this.getCharactersData(this.currentIndex);
  }

  showSkeleton() {
    this.skeletonCount = new Array(3);
  }

  hideSkeleton() {
    this.skeletonCount = [];
  }

  getCharactersData(pageIndex: number) {
    this.showSkeleton();
    this.characterSvc.getCharactersList(pageIndex).subscribe(response => {
      const { info, results } = response.data.characters;
      this.totalPages = info.pages;
      this.nextIndex = info.next;
      this.previousIndex = info.prev;
      this.hideSkeleton();
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
