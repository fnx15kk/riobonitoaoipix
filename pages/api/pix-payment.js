import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, amount, customerInfo } = req.body;

    // Use o endpoint de Sandbox para testes
    const apiUrl = 'https://api.sandbox.mangopay.com/checkout/pix';  // Altere para o ambiente sandbox

    const payload = {
      client_secret: process.env.25cca9a5795f24cbf2887832f2235780,  // A chave secreta configurada
      orderId,
      amount,  // O valor da doação
      customer: customerInfo,  // Informações do cliente
    };

    try {
      // Faz a requisição para o endpoint de Sandbox da Mangofy
      const response = await axios.post(apiUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // A API da Mangofy retorna a URL do PIX e o QR Code
      const { pixUrl, qrCode } = response.data;

      // Retorne esses dados para o frontend
      return res.status(200).json({ pixUrl, qrCode });
    } catch (error) {
      console.error('Erro ao gerar pagamento PIX:', error);
      return res.status(500).json({ error: 'Erro ao gerar pagamento PIX' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
