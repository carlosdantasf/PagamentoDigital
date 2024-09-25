import React from 'react';
import Lottie from 'lottie-react';
import './TrainLoading.css'

import trainLoading from '../../../public/Animation - 1721041310917.json'

// import { Container } from './styles';

const TrainLoading: React.FC = () => {
  return <div>
    <Lottie animationData={trainLoading} loop={true} />
    <div className='loadingMessage'><p>Carregando</p><span className='dots'></span></div>
  </div>;
}

export default TrainLoading;