import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Label,
  useTheme,
  useColorMode,
  Switch,
  useMultiSelect,
  useCombobox,
  useBadge,
  useToast
} from '@radix-ui/react';
import { Button } from '@radix-ui/react/button';
import { useStore } from 'react-redux';
import { v4 as uuid } from 'uuid';

function UserRegistration() {
  const navigate = useNavigate();
  const store = useStore();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_admin: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({...formData, id: uuid()});

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/users');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\' utilisateur:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Inscription d'utilisateur</h2>
        
        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label required>Nom d'utilisateur</Label>
              <Input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            <div>
              <Label required>Email</Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <Label required>Mot de passe</Label>
              <Input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <Label>Administrateur</Label>
              <Switch 
                checked={formData.is_admin}
                onCheckedChange={(checked) => setFormData({...formData, is_admin: checked})}
              />
            </div>

            <Button type="submit" className="w-full">
              Confirmer l'inscription
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserRegistration;
