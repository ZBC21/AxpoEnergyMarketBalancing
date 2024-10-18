import React from 'react';

const OutflowsComponent = ({ members, selectedDate }) => {
    if (!selectedDate || !members.length) {
        return <div>No outflow data available for this date</div>;
    }

    const consumers = members.filter(member => member.type === 'Consumer');

    return (
        <div className="outflow-component">
            <h3 style={{ color: 'red' }}>Outflows (Consumers)</h3>
            <ul>
                {consumers.map((consumer) => {
                    const forecastForDate = consumer.forecast.filter(f => f.date === selectedDate);
                    const totalOutflow = forecastForDate.reduce((total, f) => total + f.value, 0);

                    return (
                        <li key={consumer.id}>
                            <strong>{consumer.name}</strong> &mdash;
                            <span style={{ color: 'red' }}>
                                -{Math.abs(totalOutflow).toFixed(2)} MW
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default OutflowsComponent;