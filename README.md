# react-native-auth2.0-twitch

auth 2.0 twitch

## Installation

```sh
npm install react-native-auth2.0-twitch
```

## Usage


```js
import { useTwitchAuth } from 'react-native-auth2.0-twitch';

const { startAuth, error } = useTwitchAuth({
    clientId: 'You client_id',
    redirectUri: 'You redirect_uri',
    onSuccess: (code) => {
      console.log('Code auth:', code);
    },
    onError: (err) => {
      console.error('Error auth:', err.message);
    }
  });
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
