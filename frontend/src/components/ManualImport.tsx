import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, useTheme, useColorMode } from '@radix-ui/react';
import { Check, X } from 'lucide-react';

function ManualImport() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    publisher: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Article ajouté avec succès!');
      } else {
        const data = await response.json();
        setError(data.message || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Import manuel</h1>
          <Button onClick={() => navigate('/scanner')}>
            Scan de code-barres
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <Alert.Title>{error}</Alert.Title>
              </Alert>
            )}

            {success && (
              <Alert variant="success">
                <Alert.Title>{success}</Alert.Title>
              </Alert>
            )}

            <div>
              <Label required>Titre</Label>
              <Input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <Label>Artiste</Label>
              <Input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({...formData, artist: e.target.value})}
              />
            </div>

            <div>
              <Label>Éditeur</Label>
              <Input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              />
            </div>

            <Button type="submit" className="w-full">
              Ajouter
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ManualImport;
