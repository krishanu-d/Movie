import AsyncStorage from "@react-native-async-storage/async-storage";

export const Utils = {
    async storeData(key, value) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
            return true;
        } catch (e) {
            console.log("Error in Storing Data--------->>>", e);
            return false;
        }
    },
    async getData(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("Error in Getting Data--------->>>", e);
            return null;
        }
    }
}