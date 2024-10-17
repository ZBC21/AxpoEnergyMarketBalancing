import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './ImbalanceChart.css';

const ImbalanceChart = ({ chartData, onDateSelect }) => {
    if (!chartData || chartData.length === 0) {
        return <p>No data available to display.</p>;
    }

    return (
        <div className="chart-container">
            <h2 className="chart-title">Inflows, Outflows, and Imbalance</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(tick) => new Date(tick).toLocaleString()}
                        tick={{ fill: "#333" }}
                    />
                    <YAxis tick={{ fill: "#333" }} />
                    <Tooltip
                        labelFormatter={(label) => new Date(label).toLocaleString()}
                        contentStyle={{ backgroundColor: '#f0f0f0', border: 'none' }}
                        itemStyle={{ color: '#333' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="imbalance"
                        stroke="#3f51b5"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                        onClick={(e) => onDateSelect(e.activeLabel)} // Pass selected date
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ImbalanceChart;
