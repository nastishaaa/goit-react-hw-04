import Modal from 'react-modal';

Modal.setAppElement('#root'); // Додаємо для accessibility

export default function ImageModal({ image, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Затемнення всього фону
          zIndex: 9998, // Щоб було вище за інші елементи
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'transparent', // Робимо контент прозорим, якщо потрібно
          border: 'none', // Прибираємо рамки
          padding: 0, // Прибираємо зайві відступи
          zIndex: 9999, // Вища пріоритетність ніж overlay
        }
      }}
      contentLabel="Image Modal"
    ><img src={image} alt="Large view" style={{ maxWidth: '100%', maxHeight: '80hv' }} />
    </Modal>
  );
}
