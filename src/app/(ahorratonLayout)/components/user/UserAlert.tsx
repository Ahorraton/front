import React, { useEffect, useState } from 'react';
import { Alert, Box } from '@mui/material';

interface UserAlertProps {
    message: string;
    severity: 'success' | 'info';
    showAlert: boolean;
    setShowAlert: (show: boolean) => void;
}

const UserAlert: React.FC<UserAlertProps> = ({ severity, message, showAlert, setShowAlert }) => {
    const [opacity, setOpacity] = useState(1);
  
        useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

        return () => clearTimeout(timer);
        }
    }, [showAlert, setShowAlert]);

    return (
        <>
        { showAlert && (
            <Box
                sx={{
                    position: 'fixed',
                    top: '10%',
                    left: '50%',
                    width: '20%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
            <Alert 
                severity={severity} 
                variant="filled" 
                icon={false}
                sx={{
                    fontSize: '1rem',
                    width: '100%',
                    justifyContent: 'center', 
                }}>
                {message}
            </Alert>
            </Box>
        )}
        </>
    );
};

export default UserAlert;