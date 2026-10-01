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

function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      });
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = async (user) => {
    setEditing(true);
    setSelectedUser(user);
  };

  const handleSubmitEdit = async (updatedUser) => {
    try {
      await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
      });
      fetchUsers();
      setEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <Button onClick={() => navigate('/user/new')}>
            Ajouter un utilisateur
          </Button>
        </div>

        <div className="rounded-lg shadow overflow-hidden">
          <Table.Root>
            <Table.Body>
              {users.map((user) => (
                <Row key={user.id}>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{user.username}</span>
                    </div>
                  </Cell>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
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

export default UsersList;
