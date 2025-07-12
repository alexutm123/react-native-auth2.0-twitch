# react-native-auth2.0-twitch

auth 2.0 twitch

## Installation

```sh
npm install react-native-auth2.0-twitch
```

## Usage

Mandatory for iOS Universal Link and Android App Link

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
## License

MIT

