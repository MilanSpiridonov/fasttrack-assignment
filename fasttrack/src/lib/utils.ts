import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertUnitsToDisplayName(units: string): string {
  switch (units) {
    case "percentagePoints":
      return "%"
    default:
      return ""
  }
}