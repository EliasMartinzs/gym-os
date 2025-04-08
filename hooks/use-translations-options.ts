"use client";

import { EnumTranslations } from "@/lib/enum-tranlations";

type EnumTranslations = typeof EnumTranslations;
type TranslationKeys = keyof EnumTranslations;

type SelectOption<T extends string> = {
  value: T; // Valor original do enum (ex: "ACTIVE")
  label: string; // Tradução (ex: "Ativo")
};

export function getTranslatedOptions<
  T extends Record<string, string>,
  K extends TranslationKeys
>(enumObj: T, translationKey: K): SelectOption<T[keyof T]>[] {
  const translations = EnumTranslations[translationKey] as Record<
    T[keyof T],
    string
  >;

  return (Object.values(enumObj) as T[keyof T][]).map((value) => ({
    value, // Mantém o valor original do enum
    label: translations[value] || formatDefaultLabel(value),
  }));
}

function formatDefaultLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
