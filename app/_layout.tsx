import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <Stack
          screenOptions={{
            headerTintColor: '#000000',
            headerStyle: {
              backgroundColor: '#f9f9f9'
            }
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: true }} />
          {/* ホーム */}
          <Stack.Screen name="home/index" options={{ headerTitle: 'ホーム' }} />
          {/* ラベル */}
          <Stack.Screen name="labels" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
          {/* メモ */}
          <Stack.Screen name="memos/index" options={{ headerTitle: 'メモ' }} />
          <Stack.Screen name="memos/create" options={{ headerTitle: '' }} />
          <Stack.Screen name="memos/[id]" options={{ headerTitle: '' }} />
        </Stack>
      </GluestackUIProvider>
    </Provider>
  );
}
