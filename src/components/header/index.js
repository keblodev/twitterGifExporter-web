import { h, Component } from 'preact';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
        <h1>
          get any Twitter GIF from URL
        </h1>
				<nav>
					{/* <a href="/">Home</a>
					<a href="/privacy">Privacy</a>
					<a href="/eula">Eula</a> */}
				</nav>
			</header>
		);
	}
}
