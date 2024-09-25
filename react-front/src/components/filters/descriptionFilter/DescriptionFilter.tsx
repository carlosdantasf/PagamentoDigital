import React, { useState } from 'react';
import './DescriptionFilter.css'

interface DescriptionFilterProps {
    onFilterChange: (filter: string) => void;
}

const DescriptionFilter: React.FC<DescriptionFilterProps> = ({ onFilterChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        onFilterChange(value);
    };

    return (
        <div className="description-filter">
            <label htmlFor="description-select">Filtrar por Descrição:</label>
            <select id="description-select" value={selectedOption} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="passagem inteira">Passagem Inteira</option>
                <option value="passagem meia">Passagem Meia</option>
            </select>
        </div>
    );
};

export default DescriptionFilter;
