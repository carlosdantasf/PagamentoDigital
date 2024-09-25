import { useNavigate } from 'react-router-dom';
import './PixDisabled.css';

const PixDisabled = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="pix-disabled-container">
            <button className="back-button" onClick={handleBackClick}>
                ← Home
            </button>
            <div className="pix-message-container">
                <div className="pix-mesage-title">
                    <h1>Sistema de pagamento PIX voltará em breve</h1>
                </div>
            </div>
        </div>
    );
};

export default PixDisabled;
