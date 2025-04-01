import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date into a birthday string (DD/MM/YYYY)
 * @param date - Date to be formatted (can be string, Date, or timestamp)
 * @returns Formatted date in Brazilian format (e.g., "15/06/2005")
 * @throws Error if invalid date is provided
 */
export function formatDate(date: Date | string | number): string {
  // Convert to Date if input is string or number
  const parsedDate = new Date(date);

  // Check if date is valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  // Extract date components
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
