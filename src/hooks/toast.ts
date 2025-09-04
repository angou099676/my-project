import { createContext, useContext } from "react";
import { type ToastContextTypes } from "@/index.d";

export const ToastContext = createContext<ToastContextTypes>({} as ToastContextTypes);

export function useToast() {
    return useContext(ToastContext);
}