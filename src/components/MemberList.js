import React from 'react';
import MemberItem from './MemberItem';

const MemberList = ({ title, members, openMembers, openDates, toggleMember, toggleDate, groupForecastByDate }) => {
    return (
        <div style={{ width: '45%' }}>
            <h4>{title}</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {members.map((member) => {
                    const groupedForecast = groupForecastByDate(member.forecast);
                    return (
                        <MemberItem
                            key={member.id}
                            member={member}
                            groupedForecast={groupedForecast}
                            openMembers={openMembers}
                            openDates={openDates}
                            toggleMember={toggleMember}
                            toggleDate={toggleDate}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default MemberList;
