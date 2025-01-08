import React from 'react';
import * as Icons from '@mui/icons-material';

const DynamicIcon = ({ iconName, className, ...props }) => {
    // Dynamically access the icon component from the Icons object
    const IconComponent = Icons[iconName];
    if (!IconComponent) {
        console.error(`Icon "${iconName}" not found.`);
        return null; // Return nothing if the icon is not found
    }
    return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;