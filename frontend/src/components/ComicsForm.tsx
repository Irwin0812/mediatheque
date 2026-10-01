import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Label,
  useTheme,
  useColorMode,
  Grid,
  GridItem
} from '@radix-ui/react';
import { Button } from '@radix-ui/react/button';
import { useStore } from 'react-redux';
import { v4 as uuid } from 'uuid';

function ComicsForm() {
  const navigate = useNavigate();
  const store = useStore();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    image: '',
    title_series: '',
    title_bf: '',
    artist: '',
    writer: '',
    publisher: '',
    volume_number: 1,
    total_volumes: 1,
    summary_series: '',
    summary_bf: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({...formData, id: uuid()});
    
    try {
      const response = await fetch('http://localhost:3000/comics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/comics');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la bande dessinée:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Ajouter une bande dessinée</h2>
        
        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Grid className="gap-4">
              <GridItem columns={1, 2}>
                <Label required>Image de couverture</Label>
                <Input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </GridItem>

              <GridItem columns={1, 2}>
                <Label required>Titre de la série</Label>
                <Input
                  type="text"
                  required
                  value={formData.title_series}
                  onChange={(e) => setFormData({...formData, title_series: e.target.value})}
                />
              </GridItem>

              {/* Continuez avec les autres champs... */}
            </Grid>

            <Button type="submit" className="w-full">
              Ajouter
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ComicsForm;
