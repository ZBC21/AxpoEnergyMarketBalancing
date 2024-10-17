import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InflowsChart = ({ chartData, onDateSelect }) => {
    if (!chartData || chartData.length === 0) {
        return <p>No data available to display.</p>;
    }

    return (
        <div className="inflows-chart">
            <h3 className="chart-title">Inflows (Producers)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
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
                    <Bar
                        dataKey="inflows"
                        fill="#8f678d"
                        onClick={(e) => onDateSelect(e.date)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InflowsChart;