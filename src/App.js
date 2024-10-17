import React, { useState, useEffect } from 'react';
import CircleList from './components/CircleList';
import MemberDetails from './components/MemberDetails';
import ImbalanceChart from './components/ImbalanceChart';
import InflowsChart from './components/InflowsChart';
import OutflowsChart from './components/OutflowsChart';
import MemberBreakdown from './components/MemberBreakdown';  // New component for drill-down
import { getBalancingCircles, getMemberForecast } from './services/apiService';
import './App.css';

const App = () => {
    const [circles, setCircles] = useState([]);
    const [selectedCircleId, setSelectedCircleId] = useState(null);
    const [selectedCircleMembers, setSelectedCircleMembers] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);  // New state to track selected date

    useEffect(() => {
        const fetchCircles = async () => {
            try {
                const circlesData = await getBalancingCircles();
                setCircles(circlesData);
            } catch (error) {
                console.error('Error fetching balancing circles:', error);
            }
        };

        fetchCircles();
    }, []);

    const handleSelectCircle = async (circleId) => {
        setSelectedCircleId(circleId);

        const selectedCircle = circles.find(circle => circle.id === circleId);
        if (!selectedCircle || !selectedCircle.members) {
            console.error('No members found for this circle');
            return;
        }

        const membersWithForecasts = await Promise.all(
            selectedCircle.members.map(async (member) => {
                try {
                    const forecast = await getMemberForecast(member.id);
                    return {
                        ...member,
                        forecast: forecast.forecast
                    };
                } catch (error) {
                    console.error(`Error fetching forecast for member ${member.id}:`, error);
                    return { ...member, forecast: [] };
                }
            })
        );

        setSelectedCircleMembers(membersWithForecasts);

        const combinedData = {};
        membersWithForecasts.forEach(member => {
            member.forecast.forEach(forecast => {
                const { date, value } = forecast;
                if (!combinedData[date]) {
                    combinedData[date] = { date, inflows: 0, outflows: 0, imbalance: 0 };
                }
                if (member.type === 'Producer') {
                    combinedData[date].inflows += value;
                } else {
                    combinedData[date].outflows -= value;
                }
            });
        });

        Object.keys(combinedData).forEach(date => {
            combinedData[date].imbalance = combinedData[date].inflows + combinedData[date].outflows;
        });

        setChartData(Object.values(combinedData));
    };

    // Handle date selection for drill-down
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Energy Market Balancing</h1>
            <CircleList circles={circles} onSelectCircle={handleSelectCircle} />

            {selectedCircleId && (
                <>
                    {/* Imbalance Line Chart */}
                    <ImbalanceChart chartData={chartData} onDateSelect={handleDateSelect} />

                    {/* Two smaller charts for inflows and outflows */}
                    <div className="small-charts-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <InflowsChart chartData={chartData} onDateSelect={handleDateSelect} />
                        <OutflowsChart chartData={chartData} onDateSelect={handleDateSelect} />
                    </div>
                    {/* Drill-down based on the selected date */}
                    <MemberBreakdown members={selectedCircleMembers} selectedDate={selectedDate} />

                    {/* Member details breakdown */}
                    <MemberDetails members={selectedCircleMembers} />
                </>
            )}
        </div>
    );
};

export default App;
