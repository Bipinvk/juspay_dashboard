import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export type DateRangeType =
  | "week"
  | "month"
  | "year"
  | "today"
  | "7"
  | "30"
  | "60"
  | "90";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumber(value: any): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";

  const fixed = num.toFixed(2); // e.g., "100.00", "100.10", "99.99"
  return fixed.replace(/\.?0+$/, ""); // removes ".00" or trailing "0"
}
export function formatDate(date: Date | null | undefined): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // months are 0-indexed
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}

export function getDateRangeByType(type: DateRangeType): {
  start: string;
  end: string;
} {
  const today = new Date();
  let start: Date, end: Date;

  switch (type) {
    case "today": {
      start = new Date(today);
      end = new Date(today);
      break;
    }

    case "7":
    case "30":
    case "60":
    case "90": {
      start = new Date(today);
      start.setDate(today.getDate() - parseInt(type));
      end = new Date(today);
      break;
    }

    case "week": {
      const day = today.getDay();
      start = new Date(today);
      start.setDate(today.getDate() - day);
      end = new Date(today);
      end.setDate(today.getDate() + (6 - day));
      break;
    }

    case "month": {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    }

    case "year": {
      start = new Date(today.getFullYear(), 0, 1);
      end = new Date(today.getFullYear(), 11, 31);
      break;
    }

    default:
      throw new Error(`Unsupported type: ${type}`);
  }

  const format = (date: Date): string => date.toISOString().split("T")[0];

  return {
    start: format(start),
    end: format(end),
  };
}


// src/utils/subscribeToPush.ts
export async function subscribeToPush(vapidPublicKey: string) {

  if (!('serviceWorker' in navigator)) throw new Error('Service Workers not supported');
  if (!('PushManager' in window)) throw new Error('Push not supported');
  
   let registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    registration = await navigator.serviceWorker.register('/service-worker.js');
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') throw new Error('Notification permission denied');
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
  }
 
  return subscription;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}