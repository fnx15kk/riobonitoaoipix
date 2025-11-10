"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  donationAmounts: number[]
}

export function DonationModal({ isOpen, onClose, donationAmounts }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [pixKey, setPixKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSelectAmount = async (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    setLoading(true)
    setQrCode(null)
    setPixKey(null)

    try {
      const response = await fetch("/api/mangofy/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) throw new Error("Erro ao gerar QR code")

      const data = await response.json()
      setQrCode(data.qrCode)
      setPixKey(data.pixKey)
    } catch (error) {
      console.error("[v0] Erro:", error)
      alert("Erro ao gerar QR code. Tente novamente.")
      setSelectedAmount(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCustomAmount = async () => {
    const amountNum = Number.parseFloat(customAmount)

    if (!customAmount || amountNum < 1) {
      alert("Por favor, insira um valor maior que R$ 1,00")
      return
    }

    await handleSelectAmount(amountNum)
  }

  const copyPixKey = () => {
    if (pixKey) {
      navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md shadow-xl relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>

        {/* Logo and header */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/images/design-mode/Captura%20de%20Tela%202025-11-09%20a%CC%80s%2013.48.20(1).png"
            alt="Canil Patas Seguras"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-bold text-lg text-gray-900">Instituição Salva e Protege</span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
          Doe o valor que o seu coração mandar! ❤️
        </h2>

        {/* Subtitle */}
        <p className="text-center font-bold text-gray-900 mb-6 uppercase text-xs sm:text-sm">
          {qrCode ? "Escaneie o QR code com seu banco" : "Qual valor você deseja doar?"}
        </p>

        {!qrCode ? (
          <>
            {/* Amount buttons grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  disabled={loading}
                  className="py-3 px-2 border-2 border-gray-300 rounded-xl font-bold text-gray-900 text-xs sm:text-sm hover:border-green-500 hover:text-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  R$ {amount}
                </button>
              ))}
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Ou digite um valor customizado:</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-2.5 text-gray-600 font-semibold">R$</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Ex: 25"
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:border-green-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleCustomAmount}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Doar
                </button>
              </div>
            </div>

            {/* Info text */}
            <p className="text-center text-xs text-gray-500">Escolha um valor acima ou customize sua doação</p>
          </>
        ) : (
          <>
            {/* QR Code display */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 flex flex-col items-center">
              {qrCode && (
                <img
                  src={qrCode || "/placeholder.svg"}
                  alt="QR Code PIX"
                  className="w-48 h-48 border-4 border-green-500 rounded-lg"
                />
              )}
              <p className="text-center text-sm text-gray-600 mt-4">
                Valor: <span className="font-bold text-lg text-green-500">R$ {selectedAmount}</span>
              </p>
            </div>

            {/* PIX Key copy section */}
            {pixKey && (
              <div className="mb-6">
                <p className="text-xs text-gray-600 mb-2 uppercase font-semibold">Ou copie a chave PIX:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixKey}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs bg-gray-50"
                  />
                  <button
                    onClick={copyPixKey}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Back button */}
            <button
              onClick={() => {
                setQrCode(null)
                setPixKey(null)
                setSelectedAmount(null)
                setCustomAmount("")
              }}
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl font-bold text-gray-900 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Escolher outro valor
            </button>
          </>
        )}

        {loading && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Gerando QR code...</p>
          </div>
        )}
      </div>
    </div>
  )
}
