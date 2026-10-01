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

function ComicsList() {
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [editing, setEditing] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    try {
      const response = await fetch('http://localhost:3000/comics');
      const data = await response.json();
      setComics(data);
    } catch (error) {
      console.error('Erreur lors du chargement des bandes dessinées:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/comics/${id}`, {
        method: 'DELETE'
      });
      fetchComics();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = async (comic) => {
    setEditing(true);
    setSelectedComic(comic);
  };

  const handleSubmitEdit = async (updatedComic) => {
    try {
      await fetch(`http://localhost:3000/comics/${selectedComic.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComic)
      });
      fetchComics();
      setEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gestion des bandes dessinées</h1>
          <Button onClick={() => navigate('/comics/new')}>
            Ajouter une bande dessinée
          </Button>
        </div>

        <div className="rounded-lg shadow overflow-hidden">
          <Table.Root>
            <Table.Body>
              {comics.map((comic) => (
                <Row key={comic.id}>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <img
                        src={comic.cover}
                        alt={comic.title_series}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="text-sm font-medium truncate">{comic.title_series}</span>
                    </div>
                  </Cell>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(comic)}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(comic.id)}
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

export default ComicsList;
