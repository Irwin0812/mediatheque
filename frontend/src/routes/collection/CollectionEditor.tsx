import React, { useState } from 'react';
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

function CollectionEditor({ collection, onSubmit }) {
  const navigate = useNavigate();
  const store = useStore();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    name: collection?.name || '',
    items: collection?.items || [],
    isPublic: collection?.isPublic || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({...formData, id: uuid()});
    
    try {
      const response = await fetch('http://localhost:3000/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/collections');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la collection:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">
          {collection ? 'Modifier une collection' : 'Ajouter une nouvelle collection'}
        </h2>
        
        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label required>Nom de la collection</Label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <Label>Est publiée</Label>
              <Switch 
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
              />
            </div>

            <Button type="submit" className="w-full">
              {collection ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CollectionEditor;
