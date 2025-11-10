import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, amount, customerInfo } = req.body;

    const apiUrl = 'https://api.mangofy.com/checkout/pix';  // URL da API da Mangofy

    const payload = {
      client_secret: process.env.MANGOFY_SECRET_KEY,  // A chave secreta configurada
      orderId,
      amount, // O valor da doação
      customer: customerInfo,  // Informações do cliente
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { pixUrl, qrCode } = response.data;

      return res.status(200).json({ pixUrl, qrCode });
    } catch (error) {
      console.error('Erro ao gerar pagamento PIX:', error);
      return res.status(500).json({ error: 'Erro ao gerar pagamento PIX' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
