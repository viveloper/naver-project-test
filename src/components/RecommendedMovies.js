import Component from './Component.js';
import * as api from '../api/index.js';
import { imageLazyLoad } from '../util/lazyLoad.js';

class RecommendedMovies extends Component {
  constructor({ $target, data }) {
    super({
      $target,
      tagName: 'section',
      className: 'recommended-movies',
    });

    this.state = {
      data,
      movies: [],
    };

    this.fetchMovies(this.state.data.items.slice(0, 8));

    this.render();
  }

  async fetchMovies(ids) {
    const { isError, data } = await api.fetchMovies(ids);
    if (!isError) {
      this.setState({
        movies: data,
      });
    } else {
      console.error(data);
    }
  }

  render() {
    const { data, movies } = this.state;
    this.el.innerHTML = `
      <h1>${data.title}</h1>
      <ul>
        ${movies
          .map(
            ({ id, image, title }) => `
          <li>
            <div class="img-wrapper">
              <img class="movie-image lazy" data-id="${id}" data-src="${image}" />
            </div>
          </li>
        `
          )
          .join('')}
      </ul>
    `;

    this.el.querySelectorAll('img.movie-image').forEach((imgEl) => {
      imageLazyLoad(imgEl);
    });
  }
}

export default RecommendedMovies;
