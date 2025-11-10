import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
    }

    const mangofyApiKey = process.env.MANGOFY_SECRET_KEY

    if (!mangofyApiKey) {
      return NextResponse.json({ error: "Chave Mangofy não configurada" }, { status: 500 })
    }

    const response = await fetch("https://api.mangofy.com.br/v1/pix/qrcode", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mangofyApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Converter para centavos
        description: `Doação Rio Bonito do Iguaçu - R$ ${amount}`,
        reference_id: `donation_${Date.now()}`,
        expires_in: 3600, // QR code expira em 1 hora
      }),
    })

    if (!response.ok) {
      console.error("[v0] Erro Mangofy:", response.statusText)
      return NextResponse.json({ error: "Erro ao gerar QR code" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({
      qrCode: data.qr_code, // String do QR code em base64 ou URL
      pixKey: data.pix_key, // Chave PIX para cópia
      transactionId: data.transaction_id,
      amount: amount,
    })
  } catch (error) {
    console.error("[v0] Erro ao criar PIX:", error)
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}
