import type { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );

    if (!resp.ok) throw new Error("Cannot process the request");

    const data = (await resp.json()) as OrthographyResponse;
    return {
      ok: true,
      ...data,
    };
  } catch (error: any) {
    return {
      userScore: 0,
      errors: error?.message,
      ok: false,
      message: "Cannot process the request",
    };
  }
};
