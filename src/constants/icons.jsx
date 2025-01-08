import React from 'react';
import * as Icons from '@mui/icons-material';

const DynamicIcon = ({ iconName, className, ...props }) => {
    
    const IconComponent = Icons[iconName];
    
    if (!IconComponent) {
        console.error(`Icon "${iconName}" not found.`);
        return null; 
    }
    return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;