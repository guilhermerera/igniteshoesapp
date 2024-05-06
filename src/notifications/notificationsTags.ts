import { OneSignal } from "react-native-onesignal";

export function tagUserEmaiLCreate(email: string) {
	OneSignal.User.addTag("user-email", email);
}

export function tagCartUpdate(itemsCount: string) {
	OneSignal.User.addTag("cart-items-count", itemsCount);
}
