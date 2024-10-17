import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OutflowsChart = ({ chartData, onDateSelect }) => {
    if (!chartData || chartData.length === 0) {
        return <p>No data available to display.</p>;
    }

    // Create a copy of chartData and convert outflows to positive values
    const modifiedData = chartData.map(data => ({
        ...data,
        outflows: Math.abs(data.outflows)  // Convert outflows to positive values
    }));

    return (
        <div className="outflows-chart">
            <h3 className="chart-title">Outflows (Consumers)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={modifiedData}>
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
                        dataKey="outflows"
                        fill="#f44336"
                        onClick={(e) => onDateSelect(e.date)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OutflowsChart;