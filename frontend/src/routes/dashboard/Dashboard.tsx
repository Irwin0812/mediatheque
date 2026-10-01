import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@radix-ui/react-progress';
import { useTheme } from 'styled-components';
import { useColorMode } from 'react-use-color-mode';
import { useStore } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comicsData, setComicsData] = useState([]);
  const [vinylsData, setVinylsData] = useState([]);
  
  useEffect(() => {
    fetch Comics Data();
    fetch Vinyls Data();
  }, []);

  const fetchComicsData = async () => {
    try {
      const response = await fetch('http://localhost:3000/comics');
      const data = await response.json();
      setComicsData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des bandes dessinées:', error);
    }
  };

  const fetchVinylsData = async () => {
    try {
      const response = await fetch('http://localhost:3000/vinyls');
      const data = await response.json();
      setVinylsData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des vinyles:', error);
    }
  };

  const totalComics = comicsData.length;
  const totalVinyls = vinylsData.length;

  return (
    <div className={`min-h-screen p-8 ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg shadow bg-opacity-10 p-6">
            <h2 className="text-xl font-semibold mb-4">Statistiques générales</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Bandes dessinées</h3>
                <p className="text-2xl font-bold">{totalComics}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Vinyles</h3>
                <p className="text-2xl font-bold">{totalVinyls}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow bg-opacity-10 p-6">
            <h2 className="text-xl font-semibold mb-4">Dernières additions</h2>
            <div className="space-y-4">
              {comicsData.slice(-3).map((comic) => (
                <div key={comic.id} className="flex items-center gap-4">
                  <img
                    src={comic.cover}
                    alt={comic.title_bf}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium">{comic.title_series}</h4>
                    <p className="text-sm text-gray-400">{comic.artist}</p>
                  </div>
                </div>
              ))}
              {vinylsData.slice(-3).map((vinyl) => (
                <div key={vinyl.id} className="flex items-center gap-4">
                  <img
                    src={vinyl.cover}
                    alt={vinyl.album_title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium">{vinyl.album_title}</h4>
                    <p className="text-sm text-gray-400">{vinyl.group_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Répartition des mediums</h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: 'BD', value: totalComics }, { name: 'Vinyles', value: totalVinyls }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
