export const URL = "https://rickandmortyapi.com/graphql";

export interface CharacterResponse {
  data: {
    characters: {
      info: {
        next: number;
        prev: number;
        pages: number;
      };
      results: any[];
    };
  };
}
