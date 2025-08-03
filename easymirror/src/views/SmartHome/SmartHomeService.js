// SmartHomeService.js
const devices = [
  {id: "1", name: "Living Room Plug", type: "plug", isOn: true},
  {id: "2", name: "Kitchen Bulb", type: "bulb", isOn: false, brightness: 75},
  {id: "3", name: "Bedroom Plug", type: "plug", isOn: true},
  {id: "4", name: "Hallway Bulb", type: "bulb", isOn: false, brightness: 50},
  {id: "5", name: "Office Plug", type: "plug", isOn: false},
  {id: "6", name: "Dining Room Bulb", type: "bulb", isOn: true, brightness: 100},
  {id: "7", name: "Garage Plug", type: "plug", isOn: true},
  {id: "8", name: "Porch Bulb", type: "bulb", isOn: false, brightness: 20},
  {id: "9", name: "Bathroom Plug", type: "plug", isOn: true},
  {id: "10", name: "Guest Bedroom Bulb", type: "bulb", isOn: false, brightness: 60},
  {id: "11", name: "Laundry Room Plug", type: "plug", isOn: true},
  {id: "12", name: "Hallway Plug", type: "plug", isOn: false},
  {id: "13", name: "Living Room Bulb", type: "bulb", isOn: true, brightness: 80},
  {id: "14", name: "Kitchen Plug", type: "plug", isOn: true},
  {id: "15", name: "Patio Bulb", type: "bulb", isOn: false, brightness: 30},
  {id: "16", name: "Study Plug", type: "plug", isOn: false},
  {id: "17", name: "Master Bedroom Bulb", type: "bulb", isOn: true, brightness: 90},
  {id: "18", name: "Basement Plug", type: "plug", isOn: true},
  {id: "19", name: "Closet Bulb", type: "bulb", isOn: false, brightness: 10},
  {id: "20", name: "Front Porch Plug", type: "plug", isOn: true}
];


const SmartHomeService = {
    getDevices: function() {
        // Simulate async fetch (callback-style, typical for Enact/core)
        return devices;
    }
};

export default SmartHomeService;
