import kind from '@enact/core/kind';
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import VirtualList from '@enact/sandstone/VirtualList';
import Item from '@enact/sandstone/Item';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import Switch from '@enact/sandstone/Switch';

import css from './SmartHome.module.less';

const itemSize = 96;

const SmartHomeBase = kind({
  name: 'SmartHome',

  handlers: {
    onToggleDevice: (ev, {deviceId, onToggleDevice}) => {
      if (onToggleDevice) {
        onToggleDevice(deviceId);
      }
    },
    onPopupClose: (ev, {onPopupClose}) => {
      if (onPopupClose) {
        onPopupClose();
      }
    },
    onItemFocus: (ev, {onItemFocus, index}) => {
      if (onItemFocus) {
        onItemFocus(index);
      }
    }
  },

  render: ({
    devices,
    focusedIndex,
    onToggleDevice,
    onScan,
    toastOpen,
    toastMsg,
    onPopupClose,
    onItemFocus,
    onScrollTo, // added to receive scrollTo fn from cbScrollTo
    ...rest
  }) => (
    <Panel className={css.panelContainer} {...rest}>
      <Header
        title={`\nSmart Home`}
        slotAfter={
          <Button className={css.scanButton} icon="search" onClick={onScan}>
            Scan for Devices
          </Button>
        }
      />

      <VirtualList
        dataSize={devices.length}
        itemSize={itemSize}
        cbScrollTo={(scrollToFn) => {
          if (onScrollTo) {
            onScrollTo(scrollToFn);
          }
        }}
        // scrollToIndex prop is less flexible, replaced with cbScrollTo control
        itemRenderer={({index, ...props}) => {
          const device = devices[index];
          return (
            <Item
              {...props}
              key={device.id}
              data-spotlight-id={`device-item-${index}`}
              slotAfter={
                <Switch
                  selected={device.isOn}
                  data-spotlight-id={`device-switch-${index}`}
                  onToggle={() => onToggleDevice(device.id)}
                />
              }
              // When item receives focus, call onItemFocus handler with index
              onFocus={() => onItemFocus(index)}
              // spotlightId set for currently focused item
              spotlightId={focusedIndex === index ? `device-item-${index}` : null}
              className={css.deviceItem}
            >
              <div className={css.deviceText}>
                <span className={css.deviceName}>{device.name}</span>
                {device.type === 'bulb' ? (
                  <span className={css.brightness}>Brightness: {device.brightness}%</span>
                ) : null}
              </div>
            </Item>
          );
        }}
      />

      <Popup
        open={toastOpen}
        onClose={onPopupClose}
        spotlightRestrict="self-only"
        spotlightModal
        scrimType="translucent"
        className={css.popupContainer}
      >
        {toastMsg}
      </Popup>
    </Panel>
  )
});

export default SmartHomeBase;
