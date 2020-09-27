import Component from '../components/Component.js';
import RecommendedMoves from '../components/RecommendedMovies.js';
import * as api from '../api/index.js';

class HomePage extends Component {
  constructor({ $target, onMovieClick }) {
    super({
      $target,
      tagName: 'div',
      className: 'home-page',
    });

    this.onMovieClick = onMovieClick;

    this.state = {
      data: [],
    };

    this.fetchRecommendedMovies();

    this.handleClick = this.handleClick.bind(this);

    this.el.addEventListener('click', this.handleClick);

    this.render();
  }

  handleClick(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      this.onMovieClick(e.target.dataset.id);
    }
  }

  async fetchRecommendedMovies() {
    const { isError, data } = await api.fetchRecommendedMovies();
    if (!isError) {
      this.setState({
        data,
      });
    } else {
      console.error(data);
    }
  }

  render() {
    const { data } = this.state;
    this.el.innerHTML = `
      <header>
        <h1>🎬오늘의 추천 영화</h1>
      </header>
      <div class="container"></div>
    `;

    const container = this.el.querySelector('.container');

    data.map(
      (movieGuide) =>
        new RecommendedMoves({
          $target: container,
          data: movieGuide,
        })
    );
  }
}

export default HomePage;
