import React, { useState, useEffect } from 'react';
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

function CollectionsList() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [editing, setEditing] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('http://localhost:3000/collections');
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Erreur lors du chargement des collections:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/collections/${id}`, {
        method: 'DELETE'
      });
      fetchCollections();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = async (collection) => {
    setEditing(true);
    setSelectedCollection(collection);
  };

  const handleSubmitEdit = async (updatedCollection) => {
    try {
      await fetch(`http://localhost:3000/collections/${selectedCollection.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCollection)
      });
      fetchCollections();
      setEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gestion des collections</h1>
          <Button onClick={() => navigate('/collection/new')}>
            Ajouter une collection
          </Button>
        </div>

        <div className="rounded-lg shadow overflow-hidden">
          <Table.Root>
            <Table.Body>
              {collections.map((collection) => (
                <Row key={collection.id}>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{collection.name}</span>
                    </div>
                  </Cell>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(collection)}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(collection.id)}
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

export default CollectionsList;
