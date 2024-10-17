import React from 'react';
import './MemberBreakdown.css';

const MemberBreakdown = ({ members, selectedDate }) => {
    if (!selectedDate) {
        return null;
    }

    // Filter the members' forecasts to show only data for the selected date
    const membersForSelectedDate = members.map(member => {
        const forecastForDate = member.forecast.filter(f => new Date(f.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString());
        return {
            ...member,
            forecastForDate
        };
    }).filter(member => member.forecastForDate.length > 0); // Only include members with data for the selected date

    return (
        <div className="breakdown-container">
            <h3>Breakdown for {new Date(selectedDate).toLocaleDateString()}</h3>
            <ul>
                {membersForSelectedDate.map(member => (
                    <li key={member.id}>
                        <strong>{member.name}</strong> ({member.type}) -
                        {member.type === 'Producer' ? '+' : '-'}
                        {member.forecastForDate.map(f => Math.abs(f.value).toFixed(2)).join(', ')} MW
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberBreakdown;
