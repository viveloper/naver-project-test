import Component from '../components/Component.js';
import Header from '../components/Header.js';
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
      loading: false,
      data: null,
      error: null,
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
    this.setState({
      loading: true,
      data: null,
      error: null,
    });
    const { isError, data } = await api.fetchRecommendedMovies();
    if (!isError) {
      this.setState({
        loading: false,
        data,
        error: null,
      });
    } else {
      console.error(data);
      this.setState({
        loading: false,
        data: null,
        error: data,
      });
    }
  }

  render() {
    this.el.innerHTML = '';

    const { loading, data, error } = this.state;

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

    data.map(
      (movieGuide) =>
        new RecommendedMoves({
          $target: container,
          movieGuide,
        })
    );

    this.el.appendChild(container);
  }
}

export default HomePage;
