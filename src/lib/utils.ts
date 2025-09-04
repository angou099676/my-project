import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidPassword(password: string): boolean {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  return regex.test(password)
}

export function validatePassword(password: string) {
  return {
    hasMinLen: password.length >= 8,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[\W_]/.test(password),
  }
}

export function isValidEmail(email: string): boolean {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  return regex.test(email)
}