import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logger} from '../logger/Logger';

//store  string  in async storage
export async function storeString(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Logger.logError('error', e);
  }
}

//store  string  in async storage
export async function getString(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    Logger.logError('error', e);
  }
}

//store  string  in async storage
export async function storeObject(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    Logger.logError('error', e);
  }
}

//store  string  in async storage
export async function getObject(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    Logger.logError('error', e);
  }
}
