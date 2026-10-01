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
import { FileInput } from '@radix-ui/react-file-input';

function EditComicForm({ match: { params: { id } } }) {
  const navigate = useNavigate();
  const store = useStore();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    cover: '',
    title_series: '',
    title_bf: '',
    artist: '',
    writer: '',
    publisher: '',
    volume_number: 0,
    total_volumes: 0,
    summary_series: '',
    summary_bf: ''
  });

  const { comics } = useSelector((state) => ({
    comics: state.comics.items
  }));

  useEffect(() => {
    const selectedComic = comics.find(c => c.id === id);
    if (selectedComic) {
      setFormData({
        cover: selectedComic.cover,
        title_series: selectedComic.title_series,
        title_bf: selectedComic.title_bf,
        artist: selectedComic.artist,
        writer: selectedComic.writer,
        publisher: selectedComic.publisher,
        volume_number: selectedComic.volume_number,
        total_volumes: selectedComic.total_volumes,
        summary_series: selectedComic.summary_series,
        summary_bf: selectedComic.summary_bf
      });
    }
  }, [comics, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = {
      ...formData,
      id,
      // Convertir les volumes en string pour l'envoi
      volume_number: formData.volume_number.toString(),
      total_volumes: formData.total_volumes.toString()
    };

    try {
      const response = await fetch(`http://localhost:3000/comics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      if (response.ok) {
        navigate('/comics');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la bande dessinée:', error);
    }
  };

  const handleFileSelect = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, cover: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate('/comics');
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Modifier une bande dessinée</h2>
          <Button onClick={handleCancel}>
            Annuler
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label required>Couverture actuelle</Label>
              <img
                src={formData.cover}
                alt="Couverture"
                className="mt-2 w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <Label>Changer la couverture</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label required>Titre de la série</Label>
              <Input
                type="text"
                required
                value={formData.title_series}
                onChange={(e) => setFormData({...formData, title_series: e.target.value})}
              />
            </div>

            <div>
              <Label required>Titre de la bande dessinée</Label>
              <Input
                type="text"
                required
                value={formData.title_bf}
                onChange={(e) => setFormData({...formData, title_bf: e.target.value})}
              />
            </div>

            <div>
              <Label>Dessinateur</Label>
              <Input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({...formData, artist: e.target.value})}
              />
            </div>

            <div>
              <Label>Scénariste</Label>
              <Input
                type="text"
                value={formData.writer}
                onChange={(e) => setFormData({...formData, writer: e.target.value})}
              />
            </div>

            <div>
              <Label>Éditeur</Label>
              <Input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData(...formData, publisher: e.target.value)}
              />
            </div>

            <div>
              <Label>Numéro du tome</Label>
              <Input
                type="number"
                value={formData.volume_number}
                onChange={(e) => setFormData(...formData, volume_number: Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Nombre de tomes</Label>
              <Input
                type="number"
                value={formData.total_volumes}
                onChange={(e) => setFormData(...formData, total_volumes: Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Résumé de la série</Label>
              <Input
                type="text"
                value={formData.summary_series}
                onChange={(e) => setFormData(...formData, summary_series: e.target.value)}
              />
            </div>

            <div>
              <Label>Résumé de la bande dessinée</Label>
              <Input
                type="text"
                value={formData.summary_bf}
                onChange={(e) => setFormData(...formData, summary_bf: e.target.value)}
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

export default EditComicForm;
