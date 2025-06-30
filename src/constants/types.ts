export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export interface CharactersQueryData {
  characters: {
    results: Character[];
    info: {
      next: number | null;
      prev: number | null;
    };
  };
}
