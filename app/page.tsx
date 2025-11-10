"use client"

import { Heart, Share2, ThumbsUp, X, Users } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const donationAmounts = [30, 40, 50, 70, 100, 200]
    const names = ["João", "Maria", "Carlos", "Ana", "Pedro", "Lucas", "Beatriz", "Fernanda", "Rafael", "Gabriela"]

    const interval = setInterval(() => {
      const randomAmount = donationAmounts[Math.floor(Math.random() * donationAmounts.length)]
      const randomName = names[Math.floor(Math.random() * names.length)]

      setNotification({
        name: randomName,
        amount: randomAmount,
        id: Date.now(),
      })

      // Auto-hide notification after 5 seconds
      const hideTimeout = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(hideTimeout)
    }, 7000) // changed from 15000ms (15 seconds) to 7000ms (7 seconds)

    return () => clearInterval(interval)
  }, [])

  const checkoutLinks = {
    30: "https://go.ironpayapp.com.br/blnqr",
    40: "https://go.ironpayapp.com.br/mjrt8",
    50: "https://go.ironpayapp.com.br/77wlc",
    70: "https://go.ironpayapp.com.br/yv6ks",
    100: "https://go.ironpayapp.com.br/a4trf",
    200: "https://go.ironpayapp.com.br/ihpyi",
    custom: "https://go.ironpayapp.com.br/custom",
  }

  const donationAmounts = [30, 40, 50, 70, 100, 200]

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/design-mode/channels4_profile.jpg" alt="Vakinha Logo" className="w-10 h-10" />
            <span className="font-bold text-gray-900 text-lg">Vakinha</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">Entrar</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600">
              Comece uma vaquinha
            </button>
          </div>
        </div>
      </header>

      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50">
          <Heart className="w-5 h-5 fill-current" />
          <div>
            <p className="font-semibold">
              {notification.name} doou R$ {notification.amount}
            </p>
            <p className="text-sm text-green-100">Obrigado pela generosidade!</p>
          </div>
        </div>
      )}

      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md shadow-xl relative">
            {/* Close button */}
            <button
              onClick={() => setShowDonationModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo and header */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/design-mode/Captura%20de%20Tela%202025-11-09%20a%CC%80s%2013.48.20(1).png"
                alt="Canil Patas Seguras"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-bold text-lg text-gray-900">Instituição Salva e Protege </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
              Doe o valor que o seu coração mandar! ❤️
            </h2>

            {/* Subtitle */}
            <p className="text-center font-bold text-gray-900 mb-6 uppercase text-xs sm:text-sm">
              Qual valor você deseja doar?
            </p>

            {/* Amount buttons grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  className="py-3 px-2 border-2 border-gray-300 rounded-xl font-bold text-gray-900 text-xs sm:text-sm hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  R$ {amount}
                </button>
              ))}
            </div>

            {/* Custom amount button */}
            <button className="w-full py-3 px-4 border-2 border-green-500 border-dashed rounded-xl font-bold text-green-500 hover:bg-green-50 transition-colors mb-4 text-sm sm:text-base">
              Doar Agora
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12 items-start">
          {/* Left - Image */}
          <div className="flex-shrink-0 w-full md:w-1/2">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/design-mode/sao-bonito-do-iguacu-07-970x550(1).webp"
                alt="Food aid distribution in Mozambique"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-green-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ✓ Verificado
              </div>
            </div>
          </div>

          {/* Right - Campaign Details */}
          <div className="flex-1 flex flex-col justify-start">
            {/* Category */}
            <div className="mb-4">
              <span className="text-green-500 font-bold text-sm uppercase tracking-wide">DESTRUIÇÃO / DESASTRE </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {"Rio Bonito do Iguaçu pede socorro: Famílias perderam tudo!!!"}
            </h1>

            {/* ID */}
            <p className="text-gray-500 text-sm mb-6">ID: 5079586</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-300"
                  style={{ width: "35%" }}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">R$ 106.928,23 </p>
              <p className="text-gray-500 text-sm">de R$ 500.000,00</p>
            </div>

            {/* Hearts */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm">
                Corações Recebidos <span className="text-green-500 font-semibold">❤️ 6414</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => setShowDonationModal(true)}
                className="flex-1 bg-green-500 text-white py-3 rounded-full font-bold hover:bg-green-600 transition-colors text-sm sm:text-base"
              >
                DOAR AGORA
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex-shrink-0">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex-shrink-0">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex-shrink-0">
                <ThumbsUp className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Secure Donation Seal */}
            <div className="flex items-start gap-2 mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900">DOAÇÃO SEGURA</p>
                <p className="text-xs text-gray-600">Processamento protegido</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
              {
                "Enquanto você lê estas palavras, centenas de famílias em Rio Bonito do Iguaçu estão vivendo um sofrimento diário que ninguém deveria enfrentar. Elas perderam suas casas, seus bens, seu sustento… e agora lutam apenas para sobreviver.\n\nSem abrigo adequado, expostas ao frio, à chuva e ao medo constante, essas pessoas — muitas delas crianças e idosos — vivem um cenário de incerteza e dor. A falta de alimentos, água potável e assistência básica transforma cada amanhecer numa nova batalha.\n\nO furacão levou tetos, móveis, memórias. Levou a tranquilidade dessas famílias. Mas não pode levar nossa solidariedade.\n\nElas precisam de nós agora.\nCada gesto de ajuda se transforma em esperança.\nCada doação pode devolver dignidade.\nCada pessoa mobilizada pode fazer a diferença.\n\nEstenda a mão. Seja o apoio que elas precisam para reconstruir suas vidas.\nPorque quando uma comunidade sofre… todos nós sofremos juntos."
              }
            </p>
          </div>
        </div>

        {/* Organization Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-8 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/design-mode/Captura%20de%20Tela%202025-11-09%20a%CC%80s%2013.48.20.png"
              alt="Canil Patas Seguras Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-gray-900">Instituição Salva e Protege </p>
              <p className="text-gray-600 text-sm">Organização verificada</p>
            </div>
          </div>
          <button
            onClick={() => setShowDonationModal(true)}
            className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            DOAR AGORA <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="flex gap-8 mb-12 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-4 font-bold text-sm sm:text-lg transition-colors whitespace-nowrap ${
                activeTab === "about"
                  ? "text-gray-900 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => setActiveTab("helpers")}
              className={`pb-4 font-bold text-sm sm:text-lg transition-colors whitespace-nowrap ${
                activeTab === "helpers"
                  ? "text-gray-900 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Quem ajudou
            </button>
          </div>

          {activeTab === "about" ? (
            // About content
            <div className="space-y-4 mb-8">
              <p className="text-gray-700 text-sm sm:text-base">
                {
                  "No Paraná, a tragédia não é só a chuva que cai sem parar. É o desespero que assombra. O medo constante de não ter onde dormir e a dor de quem perdeu tudo da noite para o dia. Centenas de famílias em Rio Bonito do Iguaçu estão vivendo assim."
                }
              </p>
              <p className="text-gray-700 text-sm sm:text-base">{"🏚️ Sem casa, tentando sobreviver até amanhã"}</p>
              <p className="text-gray-700 text-sm sm:text-base">🥶 Expostas ao frio, à chuva e ao perigo</p>
              <p className="text-gray-700 text-sm sm:text-base">🍞 Sem comida suficiente para alimentar seus filhos</p>
              <p className="text-gray-700 text-sm sm:text-base">
                😢 Crianças que deveriam estar brincando… mas estão chorando de fome e medo
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                {
                  "Nos olhos delas, existe um pedido silencioso: “Não desista da gente.” Elas só querem uma chance.Uma oportunidade de recomeçar. De ter um lar, um prato de comida quente, segurança… e esperança. Com um simples gesto seu — uma doação, um litro de leite, roupas, cobertores ou qualquer ajuda — você devolve dignidade a quem só conheceu sofrimento nos últimos dias. 🤝 Ajude quem perdeu tudo."
                }
              </p>
            </div>
          ) : (
            // Who helped content
            <div className="space-y-8 py-8">
              {/* Contributions section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Contribuições</h3>
                  <p className="text-gray-600 text-base sm:text-lg">4255 pessoas doaram</p>
                </div>
              </div>

              {/* People section */}
              <div className="flex items-center justify-center py-12">
                <Users className="w-16 sm:w-24 h-16 sm:h-24 text-green-200" />
              </div>

              {/* Impact message */}
              <p className="text-center text-gray-600 text-sm sm:text-lg leading-relaxed">
                Juntos, estamos fazendo a diferença para milhares de Deoguinhos indefesos.
              </p>
            </div>
          )}

          {/* Impact Info */}
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8 border-l-4 border-green-500">
            <div className="space-y-3 text-center text-gray-700 text-sm sm:text-base">
              <p className="flex items-center justify-center gap-2">
                <span>🍽️</span> Com R$30 você garante 50 garrasfas de água.
              </p>
              <p className="flex items-center justify-center gap-2">
                <span>👨‍👩‍👧</span> Com R$70 você ajuda até 5 familias a sobreviver.
              </p>
              <p className="flex items-center justify-center gap-2">
                <span>🐶</span> Com R$100 você alimenta e ajuda na salvação de muitas famílias.
              </p>
            </div>
          </div>

          <p className="text-center text-gray-700 mb-4 text-sm sm:text-base">
            A fome e a doença não esperam. A cada dia sem ajuda, mais um doguinho morre por maus tratos.
          </p>

          <p className="text-center text-green-600 font-bold text-base sm:text-lg">
            ✓ Doe agora pela Vakinha online e transforme o pesadelo em vida.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Veja como ficou a depois da trágedia: </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="/images/design-mode/https___d32dgtrnmhd45e.cloudfront.net_11-08-2025_t_e2a7ccd1c6614f0abad48dc788cb5820_name_WhatsApp_Image_2025_11_07_at_22_43_53(1).avif"
                alt="Child receiving aid"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="/images/design-mode/4V7XASPKKRFIXIL2FQMOWQ7BXY(1).avif"
                alt="Baby receiving care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="/images/design-mode/captura_de_tela_2025-11-08_as_09.38.15(1).webp"
                alt="Family together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-50 rounded-xl p-6 sm:p-12 text-center mb-12">
          <p className="text-lg sm:text-xl text-gray-900 font-semibold mb-4">Doe o valor que o seu coração mandar! ❤️</p>
          <p className="text-gray-700 mb-8 text-sm sm:text-base">
            Você tem o poder da mudança. Doe agora e salve vidas.
          </p>
          <button
            onClick={() => setShowDonationModal(true)}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-green-600 transition-colors"
          >
            Doar Agora
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-gray-900 mb-4">Sobre</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Segurança
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-4">Contato</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Suporte
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Email
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-4">Siga-nos</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 Vakinha Online. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Fixed donation button at bottom of page */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <button
          onClick={() => setShowDonationModal(true)}
          className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 pointer-events-auto"
        >
          DOAR AGORA <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
