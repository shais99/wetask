import React from 'react'

export function StatisticsInfoBlock(props) {

    const { info, type } = props;

    return (
        <span className="stat-info-block flex align-center justify-start">
            <div className="stat-info-img flex align-center justify-center">
                <img className={`stat-img ${type}`} src={`/assets/img/${type}.png`} alt="" />
            </div>
            <div className="stat-info-details flex column align-center justify-content">

                <p className={`stats-info-p ${(type === 'timeEstimation') ? 'last-stat-info' : '' }`}>{info.toFixed(1)}</p>
                <p className="secondary">{(type === 'createdBy') ? 'created by' : (type === 'timeEstimation') ? 'time estimation' : type}</p>
            </div>
        </span>
    );
};