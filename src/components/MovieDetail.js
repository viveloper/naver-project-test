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
    const {
      movie: { image, title, subtitle, pubDate, director, actor, userRating },
    } = this.state;

    const _director = director
      .split('|')
      .filter((item) => !!item)
      .join(', ');
    const _actor = actor
      .split('|')
      .filter((item) => !!item)
      .join(', ');

    this.el.innerHTML = `
      <img src="${image}" />
      <div>
        <h2>${title}</h2>
        <h2>${subtitle}</h2>
        <dl>
          <dt>개봉년도</dt>
          <dd>${pubDate}</dd>
          <dt>감독</dt>
          <dd>${_director ? _director : '-'}</dd>
          <dt>배우</dt>
          <dd>${_actor ? _actor : '-'}</dd>
          <dt>평점</dt>
          <dd>${userRating}</dd>
        </dl>
      </div>
    `;
  }
}

export default MovieDetail;
