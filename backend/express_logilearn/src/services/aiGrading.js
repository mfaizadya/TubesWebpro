const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async function nilaiEsai(soal, jawaban) {
    const prompt = `
        kamu adalah asisten penilai soal esai.

        Soal:
        ${soal}

        Jawaban pelajar:
        ${jawaban}

        Aturan penilaian:
        - Nilai kesesuaian jawaban dengan soal
        - Skor antara 0.0 sampai 1.0
        - 0.0 = salah total
        - 1.0 = sangat benar dan lengkap
        - Jawaban sebagian benar diberi skor proporsional
        - Gunakan Bahasa Indonesia formal

        Format jawaban WAJIB JSON:
        {
            "skor": number
        }
    `

    const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ProcessingInstruction.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: ProcessingInstruction.env.OPENROUTER_MODEL,
            messages: [{role: "user", content: prompt}],
            temperature: 0.2
        })
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    let parsed
    try {
        parsed = JSON.parse(content)
    } catch {
        throw new Error("AI response is not valid JSON")
    }

    return {
        score: Math.max(0, Math.min(parsed.score, 1)),
    }
}

module.exports = {
    nilaiEsai
}