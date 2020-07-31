import React, { useContext, useEffect } from 'react';
import './Alerts.css';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div className='alert-container'>
        <div
          key={alert.id}
          className={`alert alert-${alert.type} wrapper animated fadeInDown`}
        >
          <i className='fas fa-info-circle'></i> {alert.msg}
        </div>
      </div>
    ))
  );
};

export default Alerts;
