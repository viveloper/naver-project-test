import Component from '../components/Component.js';
import Header from '../components/Header.js';
import MovieDetail from '../components/MovieDetail.js';
import * as api from '../api/index.js';

class MovieDetailPage extends Component {
  constructor({ $target, movieId }) {
    super({
      $target,
      tagName: 'div',
      className: 'movie-detail-page',
    });

    this.state = {
      movieId,
      movie: {
        loading: false,
        data: null,
        error: null,
      },
    };

    this.fetchMovie();

    this.render();
  }

  async fetchMovie() {
    const { movieId } = this.state;
    this.setState({
      movie: {
        loading: true,
        data: null,
        error: null,
      },
    });
    const { isError, data } = await api.fetchMovie(movieId);
    if (!isError) {
      this.setState({
        movie: {
          loading: false,
          data,
          error: null,
        },
      });
    } else {
      console.error(data);
      this.setState({
        movie: {
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
      movie: { loading, data, error },
    } = this.state;

    new Header({ $target: this.el });
    const container = document.createElement('div');
    container.className = 'container';

    if (loading) {
      container.innerHTML = `<h2>Loading...</h2>`;
      this.el.appendChild(container);
      return;
    }
    if (error) {
      container.innerHTML = `<div><h2>Error!</h2><p>${error.message}</p><div/>`;
      this.el.appendChild(container);
      return;
    }
    if (!data) return;

    new MovieDetail({
      $target: container,
      movie: data,
    });

    this.el.appendChild(container);
  }
}

export default MovieDetailPage;
