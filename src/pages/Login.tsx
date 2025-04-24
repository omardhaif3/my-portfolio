import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(credentials.username, credentials.password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              fullWidth
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              fullWidth
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              icon={<LogIn size={18} />}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;