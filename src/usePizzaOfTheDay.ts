import { useState, useEffect, useDebugValue } from "react";
import type { Pizza } from "./APIResponseTypes";

export const usePizzaOfTheDay = () => {
  // nilai default null perlu generic
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState<Pizza | null>(null);

  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = (await response.json()) as Pizza;
      setPizzaOfTheDay(data);
    }

    void fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
