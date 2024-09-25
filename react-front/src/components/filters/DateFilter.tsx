import { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterContext';
import './DateFilter.css';

const DateFilter = () => {
    const { startDate, endDate, setStartDate, setEndDate } = useFilter();
    const [localStartDate, setLocalStartDate] = useState<string>(startDate);
    const [localEndDate, setLocalEndDate] = useState<string>(endDate);

    useEffect(() => {
        setStartDate(localStartDate);
    }, [localStartDate]);

    useEffect(() => {
        setEndDate(localEndDate);
    }, [localEndDate]);

    return (
        <div className="filter-container">
            <div>
                <label htmlFor="start-date">Data Inicial:</label>
                <input
                    type="date"
                    id="start-date"
                    value={localStartDate}
                    onChange={(e) => setLocalStartDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="end-date">Data Final:</label>
                <input
                    type="date"
                    id="end-date"
                    value={localEndDate}
                    onChange={(e) => setLocalEndDate(e.target.value)}
                />
            </div>
        </div>
    );
};

export default DateFilter;