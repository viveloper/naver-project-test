import Component from './Component.js';

class Header extends Component {
  constructor({ $target }) {
    super({
      $target,
      tagName: 'header',
      className: 'header',
    });
    this.render();
  }

  render() {
    this.el.innerHTML = `<h1>🎬오늘의 추천 영화</h1>`;
  }
}

export default Header;
