import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(user)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="addNewCategory" options={{
        presentation: 'modal',
        animation: 'fade_from_bottom',
        headerShown: true,
        title: 'Add new category'
      }}/>
      <Stack.Screen name="addNewCategoryItem" options={{
        presentation: 'modal',
        animation: 'fade_from_bottom',
        headerShown: true,
        title: 'Add new Item'
      }}/>
    </Stack>
  );
}
