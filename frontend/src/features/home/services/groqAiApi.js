const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// hna ghadi nkhdmo b bhad lmodel d groq : llama-3.1-8b-instant (free tier: 14,400 requests/day )
export async function askGroq(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GROQ_API_KEY is not set");
  }

  const response = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // had b7al option l ai bach ykpn slightly creative bs7 mostly factual
      max_tokens: 600, // n3tiwh w7d limit li kafi l json
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err?.error?.message ?? `Groq returned HTTP ${response.status}`,
    );
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) throw new Error("Groq returned an empty response.");
  return text;
}
