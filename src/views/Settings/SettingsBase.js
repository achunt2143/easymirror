import kind from '@enact/core/kind';
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import Switch from '@enact/sandstone/Switch';

import css from './Settings.module.less'; // Sample styles (optional)

const SettingsBase = kind({
  name: 'SettingsBase',

  handlers: {
    onToggleTheme: (ev, {onToggleTheme}) => {
      if (onToggleTheme) onToggleTheme();
    }
  },

  render: ({theme, onToggleTheme, ...rest}) => (
    <Panel {...rest} className={css.panelContainer}>
      <Header title={`\nSettings`} />
      <Item
        slotAfter={
          <Switch
            selected={theme === 'neutral'}
            onToggle={onToggleTheme}
          />
        }
      >
        Neutral Mode
      </Item>
    </Panel>
  )
});

export default SettingsBase;
