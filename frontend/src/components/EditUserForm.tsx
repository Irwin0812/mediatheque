import React, { useState, useEffect } from 'react';
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

function EditUserForm({ match: { params: { id } } }) {
  const navigate = useNavigate();
  const store = useStore();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    is_admin: false
  });

  const { users } = useSelector((state) => ({
    users: state.users.items
  }));

  useEffect(() => {
    const selectedUser = users.find(user => user.id === id);
    if (selectedUser) {
      setFormData({
        username: selectedUser.username,
        email: selectedUser.email,
        is_admin: selectedUser.is_admin
      });
    }
  }, [users, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = {
      ...formData,
      id
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      if (response.ok) {
        navigate('/users');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\' utilisateur:', error);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Modifier un utilisateur</h2>
          <Button onClick={handleCancel}>
            Annuler
          </Button>
        </div>

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
              <Label>Administrateur</Label>
              <Switch 
                checked={formData.is_admin}
                onCheckedChange={(checked) => setFormData({...formData, is_admin: checked})}
              />
            </div>

            <Button type="submit" className="w-full">
              Confirmer les modifications
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditUserForm;
