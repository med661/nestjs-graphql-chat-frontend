import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const AlertComponent = ({ message, errorType }) => {
    return (
        console.log({ message, errorType }),
        <Alert status={errorType}>
            <AlertIcon />
            <AlertTitle>{errorType}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};

export default AlertComponent;
