// src/views/MainPanel.js
import kind from '@enact/core/kind';
import {Panel} from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

const MainPanel = kind({
  name: 'MainPanel',
  render: ({onNext, ...rest}) => (
    <Panel {...rest} title="Main Panel">
      <BodyText>This is the first panel.</BodyText>
      <BottomNavBar onNext={onNext} />
    </Panel>
  )
});

export default MainPanel;
