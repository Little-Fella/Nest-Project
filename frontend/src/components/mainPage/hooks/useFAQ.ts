import { useState } from "react";

export const useFAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return { activeQuestion, toggleQuestion };
};
