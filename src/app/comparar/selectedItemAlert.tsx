import { Alert } from "@mui/material";
import { useEffect } from "react";

interface AlertComponentProps {
  setShowAlert: (showAlert: boolean) => void;
  alertMessage: string;
  success: boolean;
}

const ALERT_TIMEOUT = 1000;

const SelectedItemAlert: React.FC<AlertComponentProps> = ({
  setShowAlert,
  alertMessage,
  success,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, ALERT_TIMEOUT);

    return () => clearTimeout(timer);
  }, [setShowAlert]);

  return (
    <Alert
      severity={success ? "success" : "error"}	
      variant='filled'
      onClose={() => setShowAlert(false)}
    >
      {alertMessage}
    </Alert>
  );
};

export default SelectedItemAlert;
