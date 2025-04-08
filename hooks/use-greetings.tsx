"use client";

import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export function UseGreetings({ className }: Props) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hora = new Date().getHours();
    setGreeting(hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite");
  }, []);

  return <p className={className}>{greeting}</p>;
}
