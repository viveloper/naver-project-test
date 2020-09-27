import Component from '../components/Component.js';
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
      movie: null,
      loading: false,
    };

    this.fetchMovie();

    this.render();
  }

  async fetchMovie() {
    const { movieId } = this.state;
    this.setState({
      loading: true,
    });
    const { isError, data } = await api.fetchMovie(movieId);
    if (!isError) {
      this.setState({
        movie: data,
        loading: false,
      });
    } else {
      console.error(data);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { movie, loading } = this.state;

    this.el.innerHTML = `
      <header>
        <h1>🎬오늘의 추천 영화</h1>
      </header>
      <div class="container"></div>
    `;

    const container = this.el.querySelector('.container');

    if (loading) {
      container.innerHTML = `<h2>Loading...</h2>`;
      return;
    }

    new MovieDetail({
      $target: container,
      movie,
    });
  }
}

export default MovieDetailPage;
