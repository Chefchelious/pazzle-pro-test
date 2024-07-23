import { defineStore } from 'pinia';
import { IMovie } from 'src/types';
import MovieImage from 'assets/movie-image.jpeg';

interface IState {
  movies: IMovie[];
}

export const useMovieStore = defineStore('movie-store', {
  state: (): IState => ({
    movies: [
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2025',
      },
      {
        id: '123',
        description: 'asdasddsa',
        genre: {
          id: '43',
          name: 'Anime',
        },
        image: MovieImage,
        rating: 3,
        title: 'aidsji ji',
        year: '2026',
      },
    ],
  }),
  actions: {
    addnewMovie(newMovie: IMovie) {
      this.movies.push(newMovie);
    },
  },
});
