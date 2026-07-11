// src/components/ProtectedAdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAdminLoggedIn } from './auth';

export default function ProtectedAdminRoute({ children }) {
    if (!isAdminLoggedIn()) {
        return <Navigate to="/" replace />;
    }
    return children;
}