import React, { useState } from 'react';
import axios from 'axios';

function PixCheckout() {
  const [paymentInfo, setPaymentInfo] = useState({
    orderId: '12345',  // ID do pedido
    amount: null,      // O valor será alterado conforme a seleção do usuário
    customerInfo: {
      name: 'João Silva',
      email: 'joao@exemplo.com',
    },
  });

  const [pixUrl, setPixUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  // Função para alterar o valor da doação
  const handleAmountChange = (amount) => {
    setPaymentInfo((prevState) => ({
      ...prevState,
      amount: amount,  // Atualiza o valor de acordo com o botão selecionado
    }));
  };

  const handleGeneratePix = async () => {
    try {
      const response = await axios.post('/api/pix-payment', paymentInfo);
      setPixUrl(response.data.pixUrl);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Erro ao gerar pagamento PIX:', error);
      alert('Houve um erro ao gerar o pagamento.');
    }
  };

  return (
    <div>
      <h1>Doe o valor que o seu coração mandar! ❤️</h1>
      <p>Qual valor você deseja doar?</p>

      <div>
        {/* Botões para selecionar o valor */}
        {[30, 40, 50, 70, 100, 200].map((amount) => (
          <button key={amount} onClick={() => handleAmountChange(amount)}>
            R$ {amount}
          </button>
        ))}
      </div>

      <div>
        <button onClick={handleGeneratePix} disabled={!paymentInfo.amount}>
          Doar Agora
        </button>
      </div>

      {/* Exibe o QR Code e o link do PIX se o valor for gerado */}
      {pixUrl && (
        <div>
          <p>Aqui está o seu QR Code PIX:</p>
          <img src={qrCode} alt="QR Code PIX" />
          <p>Ou use esse link para copiar a chave PIX: <a href={pixUrl} target="_blank" rel="noopener noreferrer">Pagar via PIX</a></p>
        </div>
      )}
    </div>
  );
}

export default PixCheckout;
