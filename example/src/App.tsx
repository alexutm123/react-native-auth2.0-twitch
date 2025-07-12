import { View, Text, Button } from 'react-native';
import { useTwitchAuth } from 'react-native-auth2.0-twitch';

export default function App() {
  const { startAuth, error } = useTwitchAuth({
    clientId: 'cn6ekc2chjlpwutynsojhkfa89hjil',
    redirectUri: 'https://redirect-bloop.vercel.app',
    onSuccess: (code) => {
      console.log('Код авторизации:', code);
    },
    onError: (err) => {
      console.error('Ошибка авторизации:', err.message);
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Войти через Twitch" onPress={startAuth} />
      {error && <Text style={{ color: 'red' }}>Ошибка: {error}</Text>}
    </View>
  );
}
