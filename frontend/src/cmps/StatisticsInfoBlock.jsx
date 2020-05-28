import React from 'react'

export function StatisticsInfoBlock(props) {

    const { info, type } = props;
    return (
        <span className="stat-info-block flex align-center justify-center">
            <div className="stat-info-img flex align-center justify-center">
                <img className={`stat-img ${type}`} src={`/assets/img/${type}.png`} alt="" />
            </div>
            <div className="stat-info-details flex column align-center justify-content">

                <p className="stats-info-p">{info}</p>
                <p className="secondary">{(type === 'createdBy') ? 'created by' : type}</p>
            </div>
        </span>
    );
};