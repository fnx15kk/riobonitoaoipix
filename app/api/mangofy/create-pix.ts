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

    const mangofyPayload = {
      amount: Math.round(amount * 100), // Converter para centavos
      description: `Doação Rio Bonito do Iguaçu - R$ ${amount}`,
      reference_id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      expires_in: 3600, // QR code expira em 1 hora
    }

    console.log("[v0] Enviando para Mangofy:", mangofyPayload)

    const response = await fetch("https://api.mangofy.com.br/v1/pix/qrcode", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mangofyApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mangofyPayload),
    })

    console.log("[v0] Status Mangofy:", response.status)

    const responseData = await response.json()
    console.log("[v0] Resposta Mangofy:", responseData)

    if (!response.ok) {
      console.error("[v0] Erro Mangofy:", response.statusText, responseData)
      return NextResponse.json({ error: "Erro ao gerar QR code", details: responseData }, { status: 500 })
    }

    return NextResponse.json({
      qrCode: responseData.qr_code || responseData.qrcode || responseData.image_url,
      pixKey: responseData.pix_key || responseData.copy_and_paste || responseData.brcode,
      transactionId: responseData.transaction_id || responseData.id,
      amount: amount,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    })
  } catch (error) {
    console.error("[v0] Erro ao criar PIX:", error)
    return NextResponse.json({ error: "Erro ao processar requisição", details: String(error) }, { status: 500 })
  }
}
