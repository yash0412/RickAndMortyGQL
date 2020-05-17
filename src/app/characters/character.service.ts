import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharacterResponse, URL } from "../shared.model";

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  getCharactersList(pageIndex: number): Observable<CharacterResponse> {
    const query = {
      query: `{
                characters(page: ${pageIndex}) {
                  info {
                    next
                    pages
                    prev
                  }
                  results {
                    id
                    name
                    location {
                      name
                    }
                    image
                    gender
                    type
                    status
                    species
                  }
                }
              }`
    };
    return this.http.post<CharacterResponse>(URL, query);
  }
}
