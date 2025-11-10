import React, { useState } from 'react';
import PixCheckout from '../components/PixCheckout';  // Importe o componente PixCheckout

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Controla a visibilidade do pop-up (modal)

  // Função para abrir o modal
  const handleOpenModal = () => {
    setIsModalOpen(true);  // Abre o pop-up
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);  // Fecha o pop-up
  };

  return (
    <div>
      <h1>Bem-vindo à nossa campanha de doações!</h1>

      {/* Botão que abre o pop-up */}
      <button onClick={handleOpenModal}>Doar Agora</button>

      {/* Modal que exibe o componente PixCheckout */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <PixCheckout />  {/* Componente PixCheckout exibido dentro do modal */}
            <button onClick={handleCloseModal}>Fechar</button>  {/* Botão para fechar o modal */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

/* Estilos para o modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);  /* Fundo escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  /* Garante que o modal apareça por cima do conteúdo */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}
