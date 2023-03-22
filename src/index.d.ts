import {manager} from './preload';

declare global {
    interface Window {
        manager: typeof manager;
    }
}