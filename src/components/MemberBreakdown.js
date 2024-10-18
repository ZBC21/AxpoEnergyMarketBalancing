import React from 'react';
import InflowsComponent from './InflowsComponent';
import OutflowsComponent from './OutflowsComponent';

const MemberBreakdown = ({ members, selectedDate }) => {
    if (!selectedDate) {
        return <div>Select a date to view the breakdown</div>;
    }

    return (
        <div className="member-breakdown">
            <h2>Breakdown for {new Date(selectedDate).toLocaleDateString()}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Render the inflows and outflows in two columns */}
                <InflowsComponent members={members} selectedDate={selectedDate} />
                <OutflowsComponent members={members} selectedDate={selectedDate} />
            </div>
        </div>
    );
};

export default MemberBreakdown;