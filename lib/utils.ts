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

/**
 * Calculates the duration between a given date and the current date in a human-readable format.
 * @param {Date | string} createdAt - The start date (can be a Date object or ISO string)
 * @returns {string} A human-readable duration string (e.g., "2 years and 3 months", "5 days", "1 month")
 * @example
 * // returns "3 days"
 * calculateDuration(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000));
 *
 * // returns "1 year and 2 months"
 * calculateDuration("2022-01-15T00:00:00Z");
 */
export function calculateDuration(createdAt: Date | string): number {
  const now = new Date();
  const createdDate =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  if (isNaN(createdDate.getTime())) {
    throw new Error("Invalid date provided to calculateDuration");
  }

  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

/**
 * Formats a duration in days into a human-readable string.
 * @param {number} days - The number of days to format
 * @returns {string} Formatted duration string
 * @private
 */
export function formatDurationFromDays(days: number): string {
  if (days < 0) {
    return "future date";
  }

  if (days < 30) {
    return `${days} dia${days !== 1 ? "s" : ""}`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} mês${months !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} ano${years !== 1 ? "s" : ""}`;
  }

  return `${years} ano${years !== 1 ? "s" : ""} e ${remainingMonths} mês${
    remainingMonths !== 1 ? "s" : ""
  }`;
}

/**
 * Formata uma data para retornar o nome do dia, número do dia e ano em sequência
 * @param date - Pode ser uma string de data, um objeto Date ou um timestamp
 * @returns String no formato "Dia-da-Semana, DD/AAAA" (ex: "Segunda-feira, 15/06/2023")
 */
export function formatFullDate(date: string | Date | number) {
  const newDate = new Date(date);

  if (isNaN(newDate.getTime())) {
    throw new Error("Data inválida fornecida");
  }

  const weekDay = newDate.toLocaleDateString("pt-BR", { weekday: "long" });
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const weekDayFormated = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);

  return `${weekDayFormated}, ${day}/${month}/${year}`;
}

// Funções auxiliares para manipulação de datas
export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function getNextWeekday(date: Date, dayIndex: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + ((dayIndex - result.getDay() + 7) % 7));
  return result;
}

export function setDayOfMonth(date: Date, day: number) {
  const result = new Date(date);
  result.setDate(day);

  // Se o dia for maior que o último dia do mês, ajusta para o último dia
  if (result.getDate() !== day) {
    result.setDate(0); // Vai para o último dia do mês anterior
  }

  return result;
}
