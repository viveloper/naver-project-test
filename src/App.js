import HomePage from './pages/HomePage.js';
import MovieDetailPage from './pages/MovieDetailPage.js';

class App {
  constructor($target) {
    this.$target = $target;

    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.route = this.route.bind(this);

    window.addEventListener('popstate', this.handlePopState);

    this.route();
  }

  handleMovieClick(id) {
    const path = `/movie/${id}`;
    if (path !== history.state?.path) {
      history.pushState({ path }, '', path);
    }
    this.route();
  }

  handlePopState(e) {
    const path = e.state?.path;
    this.route(path);
  }

  route(path) {
    this.$target.innerHTML = '';

    if (!path) path = location.pathname;

    if (path === '/') {
      new HomePage({
        $target: this.$target,
        onMovieClick: this.handleMovieClick,
      });
    } else if (path.startsWith('/movie/')) {
      const movieId = Number(location.pathname.replace('/movie/', ''));
      new MovieDetailPage({
        $target: this.$target,
        movieId,
      });
    }
  }
}

export default App;
