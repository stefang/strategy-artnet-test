var dmxlib = require('@stefang/dmxnet');
window.dmx = {};
window.dmx.lib = new dmxlib.dmxnet({
  verbose: 0,
});
window.dmx.sender = window.dmx.lib.newSender({
  ip: "192.168.68.115",
  port: 6454,
  subnet: 0,
  universe: 0,
  net: 0,
});
window.dmx.send = function(msg) {
  console.log(msg);
  for (const [key, value] of Object.entries(msg)) {
    window.dmx.sender.prepChannel(parseInt(key), value);
  }
  window.dmx.sender.transmit();
}