import React from 'react';

const MemberInflowsOutflows = ({ member }) => {
    if (!member || !Array.isArray(member.forecast)) {
        return <p>No forecast data available for this member.</p>;
    }

    // Calculate inflows and outflows for the member
    const inflows = member.forecast
        .filter(forecast => member.type === 'Producer')
        .reduce((sum, forecast) => sum + forecast.value, 0); // Inflows for producers

    const outflows = member.forecast
        .filter(forecast => member.type === 'Consumer')
        .reduce((sum, forecast) => sum + forecast.value, 0); // Outflows for consumers

    return (
        <div className="inflows-outflows-container">
            <h3>{member.name}</h3>
            <div className="inflow-outflow-details">
                <div style={{ color: 'green' }}>
                    <strong>Inflows (Producers):</strong> {inflows.toFixed(2)} MW
                </div>
                <div style={{ color: 'red' }}>
                    <strong>Outflows (Consumers):</strong> {outflows.toFixed(2)} MW
                </div>
            </div>
        </div>
    );
};

export default MemberInflowsOutflows;
