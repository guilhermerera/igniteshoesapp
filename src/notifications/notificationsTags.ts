import { OneSignal } from "react-native-onesignal";


export function tagUserEmaiLCreate(email: string) {
    OneSignal.User.addTag("user-email", email)
}