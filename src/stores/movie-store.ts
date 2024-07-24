import { defineStore } from 'pinia';
import { IMovie, TCreateMovie } from 'src/types';

interface IState {
  movies: IMovie[];
  movie: IMovie | null;
}

export const useMovieStore = defineStore('movie-store', {
  state: (): IState => ({
    movies: JSON.parse(localStorage.getItem('movies') || '[]') as IMovie[],
    movie: null,
  }),
  actions: {
    addnewMovie(newMovie: IMovie) {
      this.movies.push(newMovie);
      this.saveToLocalStorage();
    },
    updateMovie(id: string, movieToUpdate: TCreateMovie) {
      this.movies = this.movies.map((movie) =>
        movie.id === id ? { ...movie, ...movieToUpdate } : movie
      );
      this.saveToLocalStorage();
    },
    getMovie(id: string) {
      this.movie = this.movies.find((movie) => movie.id === id) ?? null;
    },
    saveToLocalStorage() {
      localStorage.setItem('movies', JSON.stringify(this.movies));
    },
    loadFromLocalStorage() {
      const movies = localStorage.getItem('movies');
      if (movies) {
        this.movies = JSON.parse(movies);
      }
    },
  },
});
