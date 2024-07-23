export type TGenre = 'Drama' | 'Thriller' | 'Comedy' | 'Anime';

export interface IGenre {
  id: string;
  name: string;
}

export interface IMovie {
  id: string;
  title: string;
  year: string;
  description: string;
  rating: number;
  image: string;
  genre: IGenre;
}
