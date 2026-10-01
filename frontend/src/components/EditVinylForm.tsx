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

function EditVinylForm({ match: { params: { id } } }) {
  const navigate = useNavigate();
  const store = useStore();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    cover: '',
    group_name: '',
    album_title: '',
    track_count: 0,
    track_list: [],
    music_style: '',
    publisher: '',
    release_date: new Date()
  });

  const { vinyls } = useSelector((state) => ({
    vinyls: state.vinyls.items
  }));

  useEffect(() => {
    const selectedVinyl = vinyls.find(v => v.id === id);
    if (selectedVinyl) {
      setFormData({
        cover: selectedVinyl.cover,
        group_name: selectedVinyl.group_name,
        album_title: selectedVinyl.album_title,
        track_count: selectedVinyl.track_count,
        track_list: selectedVinyl.track_list.split(', '),
        music_style: selectedVinyl.music_style,
        publisher: selectedVinyl.publisher,
        release_date: new Date(selectedVinyl.release_date)
      });
    }
  }, [vinlys, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = {
      ...formData,
      id,
      track_list: formData.track_list.join(', ')
    };

    try {
      const response = await fetch(`http://localhost:3000/vinyls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      if (response.ok) {
        navigate('/vinyls');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'album:', error);
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
    navigate('/vinyls');
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Modifier un album</h2>
          <Button onClick={handleCancel}>
            Annuler
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label required>Jaquette actuelle</Label>
              <img
                src={formData.cover}
                alt="Jaquette"
                className="mt-2 w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <Label>Changer la jaquette</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label required>Groupe</Label>
              <Input
                type="text"
                required
                value={formData.group_name}
                onChange={(e) => setFormData({...formData, group_name: e.target.value})}
              />
            </div>

            <div>
              <Label required>Titre de l'album</Label>
              <Input
                type="text"
                required
                value={formData.album_title}
                onChange={(e) => setFormData({...formData, album_title: e.target.value})}
              />
            </div>

            <div>
              <Label required>Nombre de chansons</Label>
              <Input
                type="number"
                required
                value={formData.track_count}
                onChange={(e) => setFormData({...formData, track_count: Number(e.target.value)})}
              />
            </div>

            <div>
              <Label>Tracks</Label>
              <div className="space-y-2">
                {formData.track_list.map((track, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      value={track}
                      onChange={(e) => {
                        const newList = [...formData.track_list];
                        newList[index] = e.target.value;
                        setFormData({...formData, track_list: newList});
                      }}
                    />
                    {index > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newList = [...formData.track_list];
                          newList.splice(index, 1);
                          setFormData({...formData, track_list: newList});
                        }}
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({...formData, track_list: [...formData.track_list, '']});
                }}
              >
                Ajouter une chanson
              </Button>
            </div>

            <div>
              <Label>Style musical</Label>
              <Input
                type="text"
                value={formData.music_style}
                onChange={(e) => setFormData({...formData, music_style: e.target.value})}
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

            <div>
              <Label>Date de sortie</Label>
              <Input
                type="date"
                value={formData.release_date.toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, release_date: new Date(e.target.value)})} 
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

export default EditVinylForm;
