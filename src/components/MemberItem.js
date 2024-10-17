import React from 'react';

const MemberItem = ({ member, groupedForecast, openMembers, openDates, toggleMember, toggleDate }) => {
    return (
        <li className="member-item">
            <div className="member-header" onClick={() => toggleMember(member.id)}>
                <strong>{member.name} ({member.type})</strong>
                <span className={`icon-toggle ${openMembers[member.id] ? 'open' : ''}`}>
                    {openMembers[member.id] ? '▲' : '▼'}
                </span>
            </div>

            {openMembers[member.id] && (
                <ul className="forecast-list">
                    {Object.keys(groupedForecast).map((date) => (
                        <li key={date}>
                            <div className="forecast-date" onClick={() => toggleDate(member.id, date)}>
                                {date} {openDates[member.id] === date ? '▲' : '▼'}
                            </div>

                            {openDates[member.id] === date && (
                                <ul className="forecast-details">
                                    {groupedForecast[date]
                                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                                        .map((forecast, index) => (
                                            <li key={index}>
                                                Time: {new Date(forecast.date).toLocaleTimeString()} -
                                                {member.type === 'Producer' ? '+' : '-'}{Math.abs(forecast.value).toFixed(2)} MW
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MemberItem;
