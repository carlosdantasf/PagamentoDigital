import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const stationsMap = new Map(Object.entries({
        "cjp": { name: "Estação João Pessoa", service: "018763" },
        "ccl": { name: "Estação Cabedelo", service: "018844" },
        "cjc": { name: "Estação J. Camboinha", service: "019046" },
        "cjm": { name: "Estação J. Manguinhos", service: "019045" },
        "cpc": { name: "Estação Poço", service: "019048" },
        "cre": { name: "Estação Jacaré", service: "019050" },
        "crr": { name: "Estação Renascer", service: "019052" },
        "cmd": { name: "Estação Mandacaru", service: "019039" },
        "cib": { name: "Estação Ilha do Bispo", service: "019041" },
        "cam": { name: "Estação Alto do Mateus", service: "019043" },
        "cbx": { name: "Estação Bayeux", service: "019035" },
        "cvn": { name: "Estação Várzea Nova", service: "019037" },
        "czr": { name: "Estação Santa Rita", service: "019033" },
    }));

    const navigate = useNavigate();

    const checkKeyAndSend = (key: string) => {
        const stationData = stationsMap.get(key);

        if (stationData) {
            navigate(`/seller/${key}`, { state: { service: stationData.service, station: stationData.name } });
        } else {
            navigate('/not-found');
        }
    }

    return (
        <>
            <div className='disable-btn' onClick={() => navigate('/pix-disabled')}><span>Desabilitar</span></div>
            <h1>Em qual estação você está?</h1>
            <div className="stations-container">
                {Array.from(stationsMap.entries()).map(([key, { name }], index) => (
                    <div key={index} className="station-box" onClick={() => checkKeyAndSend(key)}>
                        {name}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;