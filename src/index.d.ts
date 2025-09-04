import type { SVGProps } from "react"

export type CommonSvgProps = {
    svgProps?: SVGProps<SVGSVGElement>,
    className?: string,
    width?: number | string,
    height?: number | string,
    error?: boolean
}

export type ToastVarient = "default" | "success" | "destructive" | "warning" | "info"
export type Xpos = "left" | "center" | "right";
export type Ypos = "top" | "bottom";
export type AddToast = {
    message: string,
    varient?: ToastVarient,
    position?: `${Ypos}-${Xpos}`
}

export type ToastContextTypes = {
    addToast: ({ message, varient, position }: AddToast) => void
}