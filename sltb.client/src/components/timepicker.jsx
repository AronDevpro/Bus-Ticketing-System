import React, {useEffect, useState} from 'react';

const DateTimePicker = () => {
        const [hour, setHour] = useState(0);
        const [minute, setMinute] = useState(0);

        const hours = [...Array(24).keys()].map((h) => String(h).padStart(2, '0'));
        const minutes = [...Array(60).keys()].map((m) => String(m).padStart(2, '0'));

        const handleHourChange = (event) => {
            setHour(event.target.value);
        };

        const handleMinuteChange = (event) => {
            setMinute(event.target.value);
        };

        return (
            <div className="container-fluid">
                <div className="input-group time">
                    <select
                        value={hour}
                        onChange={handleHourChange}
                        style={{ width: '50px', marginRight: '5px' }}
                    >
                        {hours.map((h) => (
                            <option key={h} value={h}>
                                {h}
                            </option>
                        ))}
                    </select>
                    <span>:</span>
                    <select value={minute} onChange={handleMinuteChange} style={{ width: '50px' }}>
                        {minutes.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    };

export default DateTimePicker;
