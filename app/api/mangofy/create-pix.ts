import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    console.log("[v0] Iniciando criação PIX. Valor:", amount)

    if (!amount || amount < 1) {
      console.log("[v0] Erro: valor inválido:", amount)
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
    }

    const mangofyApiKey = process.env.MANGOFY_SECRET_KEY

    if (!mangofyApiKey) {
      console.log("[v0] Erro: MANGOFY_SECRET_KEY não configurada")
      return NextResponse.json({ error: "Chave Mangofy não configurada" }, { status: 500 })
    }

    const endpoints = [
      {
        url: "https://api.mangofy.com.br/pix/qrcode",
        format: "v1",
      },
      {
        url: "https://mangofy.com.br/api/pix/qrcode",
        format: "v2",
      },
      {
        url: "https://api.mangofy.com.br/v1/charge/qrcode",
        format: "v3",
      },
    ]

    const mangofyPayload = {
      amount: Math.round(amount * 100),
      description: `Doação Rio Bonito do Iguaçu - R$ ${amount}`,
      reference_id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      expires_in: 3600,
    }

    console.log("[v0] Payload:", mangofyPayload)
    console.log("[v0] Chave API (primeiros 10 chars):", mangofyApiKey.substring(0, 10))

    let response: Response | null = null
    let lastError = ""

    for (const endpoint of endpoints) {
      try {
        console.log(`[v0] Tentando endpoint: ${endpoint.url}`)

        response = await fetch(endpoint.url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${mangofyApiKey}`,
            "Content-Type": "application/json",
            "X-API-Key": mangofyApiKey,
          },
          body: JSON.stringify(mangofyPayload),
        })

        console.log(`[v0] Status ${endpoint.url}:`, response.status)

        if (response.ok) {
          const responseData = await response.json()
          console.log("[v0] Resposta bem-sucedida:", responseData)

          return NextResponse.json({
            qrCode: responseData.qr_code || responseData.qrcode || responseData.image_url || responseData.brcode,
            pixKey: responseData.pix_key || responseData.copy_and_paste || responseData.brcode,
            transactionId: responseData.transaction_id || responseData.id || responseData.charge_id,
            amount: amount,
            expiresAt: new Date(Date.now() + 3600000).toISOString(),
            endpoint: endpoint.format,
          })
        }

        const text = await response.text()
        lastError = `${endpoint.url}: ${response.status} - ${text.substring(0, 100)}`
        console.log("[v0] Erro neste endpoint:", lastError)
      } catch (err) {
        lastError = `${endpoint.url}: ${String(err)}`
        console.log("[v0] Exceção neste endpoint:", lastError)
      }
    }

    console.error("[v0] Todos os endpoints falharam:", lastError)
    return NextResponse.json(
      {
        error: "Erro ao gerar QR code PIX",
        details: lastError,
        apiKey: mangofyApiKey.substring(0, 10) + "...",
      },
      { status: 500 },
    )
  } catch (error) {
    console.error("[v0] Erro ao criar PIX:", error)
    return NextResponse.json(
      {
        error: "Erro ao processar requisição",
        details: String(error),
      },
      { status: 500 },
    )
  }
}
