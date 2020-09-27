import Component from './components/Component.js';
import HomePage from './pages/HomePage.js';
import MovieDetailPage from './pages/MovieDetailPage.js';

class App extends Component {
  constructor({ $target }) {
    super({
      $target,
      tagName: 'main',
      className: 'app',
    });

    this.state = {
      path: location.pathname,
    };

    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);

    window.addEventListener('popstate', this.handlePopState);

    this.render();
  }

  handleMovieClick(id) {
    const path = `/movie/${id}`;
    if (path !== history.state?.path) {
      history.pushState({ path }, '', path);
    }
    this.setState({
      path,
    });
  }

  handlePopState(e) {
    const path = e.state?.path;
    this.setState({
      path: path ? path : location.pathname,
    });
  }

  render() {
    this.el.innerHTML = ``;

    const { path } = this.state;

    if (path === '/') {
      new HomePage({
        $target: this.el,
        onMovieClick: this.handleMovieClick,
      });
    } else if (path.startsWith('/movie/')) {
      new MovieDetailPage({
        $target: this.el,
        movieId: path.replace('/movie/', ''),
      });
    }
  }
}

export default App;
