import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, amount, customerInfo } = req.body;

    // URL da API Mangofy para criar um pagamento via PIX
    const apiUrl = 'https://api.mangofy.com/checkout/pix';  // Substitua com a URL da Mangofy

    const payload = {
      client_secret: process.env.25cca9a5795f24cbf2887832f2235780,  // Usando a chave secreta que você configurou na Vercel
      orderId,
