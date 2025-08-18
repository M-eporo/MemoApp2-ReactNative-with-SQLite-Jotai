import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerTintColor: "#000000",
                headerStyle: {
                    backgroundColor: "#f9f9f9",
                }
            }}
        >
            <Stack.Screen name="index" options={{headerShown: true}} />
            {/* ホーム */}
            <Stack.Screen name="home/index" options={{headerTitle: "ホーム"}} />
            {/* ラベル */}
            <Stack.Screen name="labels" options={{headerShown: false, presentation: "fullScreenModal"}} />
            {/* メモ */}
            <Stack.Screen name="memos/index" options={{headerTitle: "メモ"}} />
            <Stack.Screen name="memos/create" options={{headerTitle: ""}} />
            <Stack.Screen name="memos/[id]" options={{headerTitle: ""}} />
        </Stack>
    )
}