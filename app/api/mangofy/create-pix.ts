import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    console.log("[v0] Criando PIX - Valor: R$ " + amount)

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
    }

    const apiKey = process.env.MANGOFY_SECRET_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Chave API não configurada" }, { status: 500 })
    }

    const response = await fetch("https://api.mangofy.com.br/api/v1/charge/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Mangofy usa centavos
        currency: "BRL",
        type: "pix", // Especificar que é PIX
        description: `Doação Rio Bonito do Iguaçu`,
        reference_id: `donation_${Date.now()}`,
      }),
    })

    console.log("[v0] Status da API:", response.status)

    const contentType = response.headers.get("content-type")

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Erro da API:", response.status, errorText.substring(0, 200))
      return NextResponse.json(
        {
          error: "Falha ao gerar QR code",
          status: response.status,
        },
        { status: response.status },
      )
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text()
      console.error("[v0] Resposta não é JSON:", text.substring(0, 100))
      return NextResponse.json(
        {
          error: "Resposta inválida do servidor",
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    console.log("[v0] PIX criado com sucesso:", data)

    return NextResponse.json({
      qrCode: data.qr_code_url || data.image_url || data.qr_code,
      pixKey: data.brcode || data.pix_key || data.copy_and_paste,
      transactionId: data.id || data.transaction_id,
      amount: amount,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    })
  } catch (error) {
    console.error("[v0] Erro na requisição:", error)
    return NextResponse.json(
      {
        error: "Erro ao processar doação",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
