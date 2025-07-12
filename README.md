# react-native-auth2.0-twitch

auth 2.0 twitch

## Installation

```sh
npm install react-native-auth2.0-twitch
```

## Usage

Mandatory for [iOS Universal Link](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content/) and [Android App Link](https://developer.android.com/training/app-links?hl=en) for redirect 

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

The result should be a code - which you can change to [access_token](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow) and use it to get the user data.


## Twitch OAuth Documentation

[Authentication](https://dev.twitch.tv/docs/authentication/)

## License

MIT

