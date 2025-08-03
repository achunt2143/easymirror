import React, {useState} from 'react';
import AppKind from './AppKind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

const App = () => {
    const [panelIndex, setPanelIndex] = useState(0);

    const handleNavigate = ({index}) => setPanelIndex(index);

    return (
        <AppKind index={panelIndex} onNavigate={handleNavigate} />
    );
};

export default App;
