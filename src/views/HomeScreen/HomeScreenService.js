import React, {useEffect, useState} from 'react';
import kind from '@enact/core/kind';

// You can do any background task here: API, timer, etc.
const ServiceLogic = kind({
    name: 'ServiceLogic',
    render: ({data}) => (
        <div>
            <p>Current time: {data}</p>
        </div>
    )
});

const Screen1Service = (props) => {
    const [now, setNow] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return <ServiceLogic data={now} {...props} />;
};

export default Screen1Service;
