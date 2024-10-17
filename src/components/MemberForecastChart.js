import React from 'react';
import MemberInflowsOutflows from './MemberInflowsOutflows';

const MembersForecastChart = ({ members }) => {
    if (!members || members.length === 0) {
        return <p>No forecast data available.</p>;
    }

    return (
        <div className="members-forecast-chart">
            <h2>Members Forecast Breakdown</h2>
            <div className="forecast-grid">
                {members.map(member => (
                    <MemberInflowsOutflows key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

export default MembersForecastChart;
