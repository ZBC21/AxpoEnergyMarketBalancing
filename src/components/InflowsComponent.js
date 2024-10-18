import React from 'react';

const InflowsComponent = ({ members, selectedDate }) => {
    if (!selectedDate || !members.length) {
        return <div>No inflow data available for this date</div>;
    }

    const producers = members.filter(member => member.type === 'Producer');

    return (
        <div className="inflow-component">
            <h3 style={{ color: 'green' }}>Inflows (Producers)</h3>
            <ul>
                {producers.map((producer) => {
                    const forecastForDate = producer.forecast.filter(f => f.date === selectedDate);
                    const totalInflow = forecastForDate.reduce((total, f) => total + f.value, 0);

                    return (
                        <li key={producer.id}>
                            <strong>{producer.name}</strong> &mdash;
                            <span style={{ color: 'green' }}>
                                +{totalInflow.toFixed(2)} MW
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default InflowsComponent;