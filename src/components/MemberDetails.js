import React, { useState } from 'react';
import MemberList from './MemberList';
import './MemberDetails.css'; // External CSS file for styling

const MemberDetails = ({ members }) => {
    const [openMembers, setOpenMembers] = useState({});
    const [openDates, setOpenDates] = useState({});

    const toggleMember = (memberId) => {
        setOpenMembers((prev) => ({
            ...prev,
            [memberId]: !prev[memberId],
        }));
    };

    const toggleDate = (memberId, date) => {
        setOpenDates((prev) => ({
            ...prev,
            [memberId]: prev[memberId] === date ? null : date,
        }));
    };

    const groupForecastByDate = (forecast) => {
        return forecast.reduce((acc, curr) => {
            const dateKey = new Date(curr.date).toLocaleDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(curr);
            return acc;
        }, {});
    };

    if (!members || members.length === 0) {
        return <p>No members available.</p>;
    }

    const producers = members.filter((member) => member.type === 'Producer');
    const consumers = members.filter((member) => member.type === 'Consumer');

    return (
        <div className="member-details">
            <h3 className="section-title">Member Breakdown (Inflows and Outflows)</h3>
            <div className="member-columns">
                <MemberList
                    title="Producers"
                    members={producers}
                    openMembers={openMembers}
                    openDates={openDates}
                    toggleMember={toggleMember}
                    toggleDate={toggleDate}
                    groupForecastByDate={groupForecastByDate}
                />
                <MemberList
                    title="Consumers"
                    members={consumers}
                    openMembers={openMembers}
                    openDates={openDates}
                    toggleMember={toggleMember}
                    toggleDate={toggleDate}
                    groupForecastByDate={groupForecastByDate}
                />
            </div>
        </div>
    );
};

export default MemberDetails;
