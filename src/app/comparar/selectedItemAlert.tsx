import { Alert } from "@mui/material";
import { useEffect } from "react";

interface AlertComponentProps {
  setShowAlert: (showAlert: boolean) => void;
}

const ALERT_TIMEOUT = 3000;

const SelectedItemAlert: React.FC<AlertComponentProps> = ({ setShowAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, ALERT_TIMEOUT);

    return () => clearTimeout(timer);
  }, [setShowAlert]);

  return (
    <Alert severity="success" onClose={() => setShowAlert(false)}>
      Agregado a lista
    </Alert>
  );
};

export default SelectedItemAlert;
