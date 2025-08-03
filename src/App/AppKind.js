import kind from '@enact/core/kind';
import TabLayout from '@enact/sandstone/TabLayout';
import Panels from '@enact/sandstone/Panels';
import { Tab } from '@enact/sandstone/TabLayout';
import HomeScreen from '../views/HomeScreen/HomeScreen';
import WeatherService from '../views/Weather/WeatherService';
import Notes from '../views/Notes/Notes';
import Calendar from '../views/Calendar/Calendar';
import CalendarService from '../views/Calendar/CalendarService';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import css from './App.module.less';
import Settings from '../views/Settings/Settings';
import SmartHome from '../views/SmartHome/SmartHome';

const AppKind = kind({
    name: 'AppKind',
    styles: {
        css,
        className: 'appKind'
      },
    handlers: {
        // Wrap onNavigate to call with {index}
        onNavigate: (ev, {onNavigate}) => {
            console.log('handler');
            if (onNavigate) {
                console.log('navigate', ev.index);
                onNavigate({index: ev.index});
            }
        }
    },
    render: ({index, onNavigate, ...rest}) => (
        <div className={css.appContainer}>
            {/* Panels shows the actual screen components with slide animations */}
            <Panels index={index} noAnimation={false} animate="slide" noCloseButton>
                <HomeScreen />
                <CalendarService />
                <WeatherService />
                <Notes />
                <SmartHome />
                <Settings />
            </Panels>
            {/* TabLayout configured with noPanels for custom panel content */}
            <TabLayout
                {...rest}
                selected={index}
                onSelect={onNavigate}
                orientation="horizontal"
            >
                <Tab title="Home" icon="home" />
                <Tab title="Calendar" icon="scheduler" />
                <Tab title="Weather" icon="light"/>
                <Tab title="Notes" icon="index"/>
                <Tab title="Smart Home" icon="smartfunction" />
                <Tab title="Settings" icon="gear"/>
            </TabLayout>
        </div>
    )
});

export default AppKind;
