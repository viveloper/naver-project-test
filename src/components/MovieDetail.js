import Component from './Component.js';

class MovieDetail extends Component {
  constructor({ $target, movie }) {
    super({
      $target,
      tagName: 'section',
      className: 'movie-detail',
    });

    this.state = {
      movie,
    };

    this.render();
  }
  render() {
    const { movie } = this.state;

    if (!movie) {
      this.el.innerHTML = '';
      return;
    }

    this.el.innerHTML = `
      <img src="${movie.image}" />
      <div>
        <h2>${movie.title}</h2>
        <h2>${movie.subtitle}</h2>
        <dl>
          <dt>개봉년도</dt>
          <dd>${movie.pubDate}</dd>
          <dt>감독</dt>
          <dd>${movie.director}</dd>
          <dt>배우</dt>
          <dd>${movie.actor}</dd>
          <dt>평점</dt>
          <dd>${movie.userRating}</dd>
        </dl>
      </div>
    `;
  }
}

export default MovieDetail;
