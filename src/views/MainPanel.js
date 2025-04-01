import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';
import Calendar from '../components/Calendar/Calendar';
import MiniCalendar from '../components/Calendar/MiniCalendar';
import MiniWeather from '../components/Weather/MiniWeather';
import './mainpanel.css';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props} className="main-panel">
			<div className="grid-container">
				<MiniWeather />
				<MiniCalendar />
				{/* Add more components here if needed */}
			</div>
		</Panel>
	)
});

export default MainPanel;
