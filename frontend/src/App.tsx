import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/rootReducer';
import {
  DropdownMenu,
  DropdownTrigger,
  MenuItem,
  Menu
} from '@radix-ui/react-menu';
import { useTheme } from 'styled-components';
import './dark-mode.css';
import { DarkModeToggle } from './components';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [isDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return true;
  });

  const theme = useTheme();
  const { darkMode } = useSelector((state: any) => state);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  return (
    <Provider store={store}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? '!dark bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col md:flex-row h-screen">
          {/* Header */}

          <header className="md:w-64 p-4 border-b border-gray-300 dark:border-gray-700">
            <DarkModeToggle />
            <h1 className="text-xl font-bold">Mediatheque</h1>
            <nav className="mt-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Accueil
              </Link>
              <Link
                to="/collections"
                className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Collections
              </Link>
              <Link
                to="/comics"
                className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Bandes dessinées
              </Link>
              <Link
                to="/vinyls"
                className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Vinyles
              </Link>
            </nav>
          </header>

          <main className="flex-1">
            <div className="flex h-full">
              <aside className="w-64 border-r border-gray-300 dark:border-gray-700">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Collections</h2>
                  <ul className="space-y-2">
                    {['Personnel', 'Favoris', 'Dernièrement ajouté'].map((item) => (
                      <li key={item}>
                        <Link
                          to={`/collection/${item}`}
                          className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="flex-1 p-8 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/collections/*" element={<Collections />} />
                  <Route path="/comics/*" element={<Comics />} />
                  <Route path="/vinyls/*" element={<Vinyls />} />
                  <Route path="/users/*" element={<Users />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
