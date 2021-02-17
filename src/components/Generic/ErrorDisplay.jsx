import React from 'react';

const ErrorDisplay = ({msg}) => {
    return (
       <h2>{msg ? msg : "Whoopsie! Nothing here..."}</h2>
    );
};

export default ErrorDisplay;