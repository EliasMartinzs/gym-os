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
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Converte uma string de data no formato "dd/mm/aaaa" para um objeto Date.
 * Retorna undefined se a data for inválida ou não estiver no formato correto.
 *
 * @param dateString - String no formato "dd/mm/aaaa"
 * @returns Objeto Date correspondente ou undefined se inválido
 */
export function parseDateString(dateString: string): Date | undefined {
  if (!dateString) return undefined;

  // Verifica o formato com regex mais rigoroso
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  if (!dateRegex.test(dateString)) return undefined;

  const [day, month, year] = dateString.split("/").map(Number);

  // Cria a data (mês é 0-based)
  const date = new Date(year, month - 1, day);

  // Verifica se a data é válida e corresponde aos valores de entrada
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValidDate ? date : undefined;
}
