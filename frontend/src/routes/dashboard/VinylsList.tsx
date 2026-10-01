import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table } from '@radix-ui/react-table';
import {
  Column,
  Header,
  Row,
  Cell,
  useTableTheme,
  useTheme,
  useColorMode
} from '@radix-ui/react-table';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPrimitive,
  DialogPrimitive.Title,
  DialogPrimitive.Close
} from '@radix-ui/react-dialog';
import {-trash, edit} from '@radix-ui/react-slot';
import { Check, X } from 'lucide-react';

function VinylsList() {
  const [vinyls, setVinyls] = useState([]);
  const [selectedVinyl, setSelectedVinyl] = useState(null);
  const [editing, setEditing] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVinyls();
  }, []);

  const fetchVinyls = async () => {
    try {
      const response = await fetch('http://localhost:3000/vinyls');
      const data = await response.json();
      setVinyls(data);
    } catch (error) {
      console.error('Erreur lors du chargement des vinyles:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/vinyls/${id}`, {
        method: 'DELETE'
      });
      fetchVinyls();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = async (vinyl) => {
    setEditing(true);
    setSelectedVinyl(vinyl);
  };

  const handleSubmitEdit = async (updatedVinyl) => {
    try {
      await fetch(`http://localhost:3000/vinyls/${selectedVinyl.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVinyl)
      });
      fetchVinyls();
      setEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gestion des vinyles</h1>
          <Button onClick={() => navigate('/vinyls/new')}>
            Ajouter un vinyle
          </Button>
        </div>

        <div className="rounded-lg shadow overflow-hidden">
          <Table.Root>
            <Table.Body>
              {vinyls.map((vinyl) => (
                <Row key={vinyl.id}>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <img
                        src={vinyl.cover}
                        alt={vinyl.album_title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="text-sm font-medium truncate">{vinyl.album_title}</span>
                    </div>
                  </Cell>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(vinyl)}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(vinyl.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </Cell>
                </Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
}

export default VinylsList;
