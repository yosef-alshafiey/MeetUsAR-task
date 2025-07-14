import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './Loader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, token, error, fetchUserInfo, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get('auth_token');
    
    if ((token || cookieToken) && !user && !error) {
      const timer = setTimeout(() => {
        fetchUserInfo(token || cookieToken);
      }, 100); 
      return () => clearTimeout(timer); 
    }
  }, [token, user, error, fetchUserInfo]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRetry = () => {
    const cookieToken = Cookies.get('auth_token');
    fetchUserInfo(token || cookieToken); 
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="header-text">Welcome to the Dashboard</h1>
        <p className="txt">
          Manage your shopping metaverse experience with ease
        </p>
        {error ? (
          <div>
            <span className="error">{error}</span>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#9414FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        ) : user ? (
          <div className="user-info">
            <p>User ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Dashboard;