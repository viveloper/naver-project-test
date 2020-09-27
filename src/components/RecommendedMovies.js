import Component from './Component.js';
import * as api from '../api/index.js';
import { imageLazyLoad } from '../util/lazyLoad.js';

class RecommendedMovies extends Component {
  constructor({ $target, movieGuide }) {
    super({
      $target,
      tagName: 'section',
      className: 'recommended-movies',
    });

    this.state = {
      movieGuide,
      movies: {
        loading: false,
        data: null,
        error: null,
      },
    };

    this.fetchMovies(movieGuide.items.slice(0, 8));

    this.render();
  }

  async fetchMovies(ids) {
    this.setState({
      movies: {
        loading: true,
        data: null,
        error: null,
      },
    });
    const { isError, data } = await api.fetchMovies(ids);
    if (!isError) {
      this.setState({
        movies: {
          loading: false,
          data,
          error: null,
        },
      });
    } else {
      console.error(data);
      this.setState({
        movies: {
          loading: false,
          data: null,
          error: data,
        },
      });
    }
  }

  render() {
    this.el.innerHTML = '';

    const {
      movieGuide,
      movies: { loading, data, error },
    } = this.state;

    const title = document.createElement('h1');
    title.innerText = movieGuide.title;
    this.el.appendChild(title);

    const movieList = document.createElement('ul');

    if (loading) {
      movieList.innerHTML = `<h2>Loading...</h2>`;
      this.el.appendChild(movieList);
      return;
    }
    if (error) {
      movieList.innerHTML = `<div><h2>Error!</h2><p>${error.message}</p><div/>`;
      this.el.appendChild(movieList);
      return;
    }
    if (!data) return;

    data.forEach(({ id, image, title }) => {
      const listItem = document.createElement('li');

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-wrapper';

      const img = document.createElement('img');
      img.className = 'movie-image lazy';
      img.dataset.id = id;
      img.dataset.src = image;
      imageLazyLoad(img);

      imgWrapper.appendChild(img);
      listItem.appendChild(imgWrapper);
      movieList.appendChild(listItem);
    });

    this.el.appendChild(movieList);
  }
}

export default RecommendedMovies;
