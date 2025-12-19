const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

async function nilaiEsai(soal, jawaban) {
  const prompt = `
Kamu adalah asisten penilai soal esai.

Soal:
${soal}

Jawaban pelajar:
${jawaban}

Aturan:
- Skor 0.0 sampai 1.0
- 0.0 = salah total
- 1.0 = sangat benar

Jawab HANYA dengan JSON VALID.
JANGAN tambahkan teks apapun.

Contoh:
{"score":0.75}
`

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1
    })
  })

  const data = await response.json()

  if (data.error) {
    console.error("GROQ ERROR:", data.error)
    throw new Error(data.error.message)
  }

  if (!data.choices || !data.choices.length) {
    console.error("GROQ RESPONSE:", data)
    throw new Error("AI response invalid")
  }

  const raw = data.choices[0].message.content.trim()

  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) {
    console.error("RAW AI OUTPUT:", raw)
    throw new Error("AI output not JSON")
  }

  const parsed = JSON.parse(match[0])

  return {
    score: Math.max(0, Math.min(parsed.score, 1))
  }
}

module.exports = { nilaiEsai }
