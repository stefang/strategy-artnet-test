# mqtt-iotes-test
App to show iotes/mqtt can't commnicate between client instances.

* Open two terminal windows. 
* Change to this directory in both. 
* Run `npm install` in one of them.
* When it's finished run `npm run-script start-a` in one.
* Run `npm run-script start-b` in the other.

Messages sent from one client do not appear in the other client even though they are both subscribed to the same mqtt topic. In fact I only seem to see messages leaving iotes (based on the "direction":"O" in messages), nothing seems to come back from the server.

If you use something like [MQTT Explorer](http://mqtt-explorer.com/) to publish test messages with the following JSON to the topic on the test server the messages appear in both clients at `deviceSubscribe` as expected.

```
{
  "test": "message"
}
```

If you send the following JSON using [MQTT Explorer](http://mqtt-explorer.com/) it fails to register at `deviceSubscribe` but it does arrive at the MQTT client in the strategy.
```
{
  "test": "message2",
  "@@iotes_storeId": {}
}
```