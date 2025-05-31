import { asyncStoreKeySeperator, tables } from "@/constants";
import { asyncStoreDataT, tablesValueT } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function handleSubmitErrorHandler(e: any){
    console.error(e);
}

export function handleAppErrors<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> | void {
    return function (...args: Parameters<T>): ReturnType<T> | void {
        try {
            return func(...args);
        } catch (error) {
            console.log(func.name);
            console.log(error);
        }
    }}


export async function saveToEntityToAsyncStore(entity: tablesValueT , id: string,  data: Record<string, any>) {
    const dataToSave:asyncStoreDataT = {
    meta: {savedAt: new Date().toISOString()},
    data
    }
    const key = `${entity}${asyncStoreKeySeperator}${id}`
    AsyncStorage.setItem(key, JSON.stringify(dataToSave))
}

export async function getEntityFromAsyncStore(entity: tablesValueT , id: string, cacheMinutes?:10|15|30) {
    const key = `${entity}${asyncStoreKeySeperator}${id}`
    const res = await AsyncStorage.getItem(key)
    if (res) {
       const savedData= JSON.parse(res) as asyncStoreDataT
        return savedData.data
    }
}

export async function getAllFromAsyncStore() {
    const keys = await AsyncStorage.getAllKeys()
    const data:asyncStoreDataT[] = []
    for(let key of keys) {
        if (Object.keys(tables).includes(key.split(asyncStoreKeySeperator)[0])) {
         const res =   await AsyncStorage.getItem(key)
        res && data.push(JSON.parse(res))
        }
    }
 return data
}