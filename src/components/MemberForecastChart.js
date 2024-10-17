import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const MemberForecastChart = ({ forecastData }) => {
    if (!forecastData || forecastData.length === 0) {
        return <p>No forecast data available for members.</p>;
    }

    return (
        <div>
            <h2>Member Forecast Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
                    <Legend />
                    {/* Line for inflows/outflows, different colors */}
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MemberForecastChart;