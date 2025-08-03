import React, {Component} from 'react';
import SmartHomeBase from './SmartHomeBase';
import SmartHomeService from './SmartHomeService';

class SmartHome extends Component {
  constructor(props) {
    super(props);
    this.scrollTo = null;

    this.state = {
      devices: SmartHomeService.getDevices(),
      focusedIndex: 0,
      toastOpen: false,
      toastMsg: ''
    };
  }

  handleToggleDevice = (deviceId) => {
    this.setState(state => ({
      devices: state.devices.map(device =>
        device.id === deviceId ? {...device, isOn: !device.isOn} : device
      ),
      toastOpen: true,
      toastMsg: 'Device toggled!'
    }));
  };

  handleScan = () => {
    this.setState({
      toastOpen: true,
      toastMsg: 'Scanning...'
    });
  };

  handlePopupClose = () => {
    this.setState({toastOpen: false});
  };

  // Called from SmartHomeBase via onScrollTo prop to receive the scrollTo function
  handleScrollTo = (scrollToFn) => {
    this.scrollTo = scrollToFn;
  };

  handleItemFocus = (index) => {
    this.setState({focusedIndex: index}, () => {
      if (this.scrollTo) {
        // Imperatively scroll to the focused item and focus it
        this.scrollTo({index, focus: true});
      }
    });
  };

  render() {
    return (
      <SmartHomeBase
        devices={this.state.devices}
        focusedIndex={this.state.focusedIndex}
        onToggleDevice={this.handleToggleDevice}
        onScan={this.handleScan}
        toastOpen={this.state.toastOpen}
        toastMsg={this.state.toastMsg}
        onPopupClose={this.handlePopupClose}
        onItemFocus={this.handleItemFocus}
        onScrollTo={this.handleScrollTo}  // pass to receive scrollTo callback
      />
    );
  }
}

export default SmartHome;
