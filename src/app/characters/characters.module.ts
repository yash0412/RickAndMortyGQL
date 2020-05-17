import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CharactersPageRoutingModule } from "./characters-routing.module";

import { CharactersPage } from "./characters.page";

import { HttpClientModule } from "@angular/common/http";
import { CharacterService } from "./character.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharactersPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CharactersPage],
  providers: [CharacterService]
})
export class CharactersPageModule {}
