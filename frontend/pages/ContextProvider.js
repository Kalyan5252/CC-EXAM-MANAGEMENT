import './../app/globals.css';
import { AuthContext, AuthContextProvider } from '../contexts/authContext';

export const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <div className="h-screen">{children}</div>
    </AuthContextProvider>
  );
};
