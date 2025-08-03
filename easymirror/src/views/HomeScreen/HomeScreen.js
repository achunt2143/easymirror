import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/sandstone/Panels';
import Icon from '@enact/sandstone/Icon';
import Button from '@enact/sandstone/Button';
import {Link} from '@enact/ui/Routable';
import css from './HomeScreen.module.less';
import Item from '@enact/sandstone/Item';

const HomeScreen = kind({
	name: 'HomeScreen',

	styles: {
		css,
		className: 'homeScreen'
	},

	render: (props) => (
		<Panel {...props}>
			<Header title={`\n`} />
			<div className={css.topSection}>
				<div className={css.time}>10:47</div>
				<div className={css.date}>Tue, Apr 23</div>
				<div className={css.location}>San Francisco | <Icon size="small" title="light">light</Icon> 72°F</div>
			</div>

			<div className={css.grid}>
				<div className={css.card}>
					<h3>Weather</h3>
					<div className={css.weatherRow}>
						<div>Tue<br /><Icon size="small" title="light">light</Icon><br />72°F</div>
						<div>Wed<br /><Icon size="small" title="light">light</Icon><br />70°F</div>
						<div>Thu<br /><Icon size="small" title="light">light</Icon><br />69°F</div>
					</div>
				</div>

				<div className={css.card}>
					<h3>Settings</h3>
					<p>Wi-Fi: Connected</p>
					<p>Brightness: 70%</p>
				</div>

				<div className={css.card}>
					<h3>Calendar</h3>
					<p>Meeting</p>
					<p>11:30 AM</p>
				</div>

				<div className={css.card}>
					<h3>Notes</h3>
					<p>Pick up groceries</p>
				</div>
			</div>
		</Panel>
	)
});

export default HomeScreen;
