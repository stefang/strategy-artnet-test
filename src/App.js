import React, { useState, useEffect } from 'react';
import './App.css';
import { createDeviceDispatchable, createHostDispatchable } from '@iotes/core';
import { createIotes } from '@iotes/react-hooks';
import { artnetStrategy } from '@stefang/strategy-artnet';

const topology = {
  client: {
    name: 'artnet-strategy-test',
  },
  hosts: [{
    name: 'artnet-host'
  }],
  devices: [{
    hostName: 'artnet-host',
    type: 'ARTNET_BRIGHTSIGN',
    name: 'PARCAN',
  }],
}

const { useIotesDevice, useIotesHost } = createIotes({ topology: topology, strategy: artnetStrategy })

const App = () => {
  const [deviceSubscribe, deviceDispatch] = useIotesDevice()
  const [hostSubscribe, hostDispatch] = useIotesHost()
  var [interval, setIntervalRef] = useState();

  const sendArtnet = (event) => {
    clearInterval(interval);
    let val = {}
    console.log(event.currentTarget.value);
    switch (parseInt(event.currentTarget.value)) {
      case 1:
        val = {
          0: 255,
          1: 255,
          2: 0,
          3: 0,
        }
        break;
      case 2:
        val = {
          0: 255,
          1: 0,
          2: 255,
          3: 0,
        }
        break;
      case 3:
        val = {
          0: 255,
          1: 0,
          2: 0,
          3: 255,
        }
          break;
      case 4:
        val = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
        }

        break;
    }
    deviceDispatch(
      createDeviceDispatchable('PARCAN', 'UPDATE', val)
    )
  }

  const sendRandomArtnet = () => {
    deviceDispatch(
      createDeviceDispatchable('PARCAN', 'UPDATE', {
        0: 255,
        1: Math.random() > 0.5 ? 255 : 0,
        2: Math.random() > 0.5 ? 255 : 0,
        3: Math.random() > 0.5 ? 255 : 0,
      })
    )
  }

  useEffect(() => {
    setIntervalRef(setInterval(
      () => sendRandomArtnet()
      , 500))
  }, [])

  return (
    <>
      <p>
        <button value={1} onClick={sendArtnet}>Red</button>
        <button value={2} onClick={sendArtnet}>Green</button>
        <button value={3} onClick={sendArtnet}>Blue</button>
        <button value={4} onClick={sendArtnet}>Off</button>
      </p>
      <p>Client ID {topology.client.name}</p>
      <p>Device Subscribe: {JSON.stringify(deviceSubscribe)}</p>
      <p>Host Subscribe: {JSON.stringify(hostSubscribe)}</p>
    </>
  );
}

export default App;
