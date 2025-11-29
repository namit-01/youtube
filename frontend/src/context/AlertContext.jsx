import { createContext, useState } from "react";
import CustomAlert from "../components/CustomAlert";

export const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [mess, setMess] = useState("");

  const showMessage = (message) => setMess(message);
  const hideMessage = () => setMess("");

  return (
    <AlertContext.Provider value={{ showMessage }}>
      {children}
      {mess && <CustomAlert message={mess} onClose={hideMessage} />}
    </AlertContext.Provider>
  );
};
