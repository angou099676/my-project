import { ToastContext } from "@/hooks/toast";
import { useState, useCallback, useMemo, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "./button";
import { Check, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AddToast, ToastVarient, Xpos, Ypos } from "@/index";

type Toast = {
    title?: string;
    message: string;
    varient: ToastVarient;
    position?: `${Ypos}-${Xpos}`
}

const TOAST_TIMEOUT: number = 5000

export function ToastProvider({ children }: { readonly children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const removeToast = useCallback(() => {
        setToasts(null);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, [])

    const addToast = useCallback(({ message, varient = "default", position = "top-right" }: AddToast) => {
        removeToast()
        const newToast: Toast = {
            message,
            varient,
            position
        }
        setToasts(newToast);
        timerRef.current = setTimeout(() => {
            removeToast()
        }, TOAST_TIMEOUT)

    }, [removeToast])

    const contextValue = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {toasts ? <Toast
                title={toasts?.title}
                message={toasts?.message || ""}
                varient={toasts?.varient || "default"}
                position={toasts?.position}
                onClose={() => removeToast()}
            /> : undefined}
        </ToastContext.Provider >
    );
}

// --- Toast Component ---
function Toast({ title, message, position, varient, onClose }: Toast & { onClose: () => void }) {

    const positionClasses: Record<`${Ypos}-${Xpos}`, string> = {
        "top-left": "top-12 left-4 animate-swipe-down",
        "top-center": "top-12 left-1/2 transform -translate-x-1/2 animate-swipe-down",
        "top-right": "top-12 right-4 animate-swipe-down",
        "bottom-left": "bottom-12 left-4 animate-swipe-up",
        "bottom-center": "bottom-12 left-1/2 transform -translate-x-1/2 animate-swipe-up",
        "bottom-right": "bottom-12 right-4 animate-swipe-up"
    };

    return (
        <Alert variant={varient} className={cn("fixed z-50 max-w-fit flex gap-12 items-center justify-between", positionClasses[position || "top-right"])}>
            <div className="flex items-center gap-2 justify-center">
                <span><GetToastIcon varient={varient} /></span>
                <div>
                    {title ? <AlertTitle>{title}</AlertTitle> : null}
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </div>
            </div>
            <Button onClick={onClose} className="w-fit h-fit p-0.4 cursor-pointer" size={"icon"} variant={"ghost"}><X width={18} height={18}/></Button>
        </Alert>
    );
}

function GetToastIcon({ varient }: { readonly varient: ToastVarient }) {
    switch (varient) {
        case "success":
            return <Check />;
        case "destructive":
            return <CircleX width={16} height={16} />;
        case "info": case "default":
            return <Info width={16} height={16} />;
        case "warning":
            return <TriangleAlert width={16} height={16} />;
        default:
            return null;
    }
}