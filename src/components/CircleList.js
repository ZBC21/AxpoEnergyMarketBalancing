import React, { useState, useEffect } from 'react';
import { getBalancingCircles } from '../services/apiService';
import './CircleList.css';

const CircleList = ({ onSelectCircle }) => {
    const [circles, setCircles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getBalancingCircles()
            .then(data => {
                setCircles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load balancing circles');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="circle-grid-container">
            <h2 className="title">Balancing Circles</h2>
            <div className="circle-grid">
                {circles.map(circle => (
                    <div key={circle.id} className="circle-panel" onClick={() => onSelectCircle(circle.id)}>
                        <div className="panel-content">
                            <span className="circle-name">{circle.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CircleList;
