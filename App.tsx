import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserEmaiLCreate } from "./src/notifications/notificationsTags";
import { useEffect } from "react";

OneSignal.initialize("f0739497-2080-4939-876f-76e44a278250");
OneSignal.Notifications.requestPermission(true);

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	tagUserEmaiLCreate("guilhermerera@email.com");

	useEffect(() => {
		const handleNotificationClick = (event: NotificationClickEvent): void => {
			const { actionId } = event.result;
			switch (actionId) {
				case "1":
					console.log("Action 1");
					break;
				case "2":
					console.log("Action 2");
					break;
				default:
					console.log("Default action");
					break;
			}
		};

		OneSignal.Notifications.addEventListener("click", handleNotificationClick);

		return () =>
			OneSignal.Notifications.removeEventListener(
				"click",
				handleNotificationClick
			);
	}, []);
	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<CartContextProvider>
				{fontsLoaded ? <Routes /> : <Loading />}
			</CartContextProvider>
		</NativeBaseProvider>
	);
}
