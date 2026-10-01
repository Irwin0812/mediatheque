import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authActions';
import {
  Form,
  Input,
  Button,
  Alert,
  useTheme,
  useColorMode
} from '@radix-ui/react';
import { Label } from '@radix-ui/react-slot';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Dispatch login action
      dispatch(login({
        user: data.user,
        token: data.token
      }));
      
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de se connecter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Connexion</h2>
        
        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <Alert.Title>{error}</Alert.Title>
                </Alert>
              </div>
            )}
            
            <div>
              <Label required>Utilisateur</Label>
              <Input
                required
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <Label required>Mot de passe</Label>
              <Input
                type="password"
                required
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full justify-center"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </div>
        </Form>
        
        <div className="text-center">
          <Link to="/signup" className="text-blue-600 hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
