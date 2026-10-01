import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Alert,
  useTheme,
  useColorMode
} from '@radix-ui/react';
import { Check } from 'lucide-react';
import { useCamera } from '@react_CAMERA_stream/camera';

function BarcodeScanner() {
  const camera = useCamera();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      windowBarcodeScanner();
    }
  }, []);

  const windowBarcodeScanner = () => {
    if (window.hasOwnProperty('ZXing')) {
      window.ZXing.decodeUrl(
        'http://localhost:3000/scanner?code='
      ).then((result) => {
        setResult(result);
        setError('');
      }).catch((err) => {
        setError(err.message || 'Erreur de scan');
        setResult('');
      });
    } else {
      setError('Le scanner de code-barres n\'est pas disponible');
 setResult('');
    }
  };

  const handleScan = () => {
    if (!result) {
      alert('Veuillez d\'abord scanner un code-barres.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:3000/api/barcode?code=${result}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Code-barres non trouvé');
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0];
      } else {
        throw new Error('Aucun article trouvé avec ce code-barres');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur pendant la récupération des informations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (result) {
      fetch('http://localhost:3000/api/barcode', {
        method: 'GET',
        headers: {
          'BarCode': result
        }
      });
    }
  };

  return (
    <div className={`min-h-screen p-8 ${useColorMode().colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Scanner un code-barres</h1>
          <Button onClick={() => navigate('/import')}>
            Import manuel
          </Button>
        </div>

        <div className="space-y-6">
          <Form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {error && (
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <Alert.Title>{error}</Alert.Title>
                  </Alert>
                </div>
              )}

              <Input
                type="text"
                placeholder="Code-barres scanné..."
                value={result}
                onChange={(e) => setResult(e.target.value)}
                ref={inputRef}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full justify-center"
              >
                {isLoading ? 'Recherche en cours...' : 'Rechercher'}
              </Button>
            </div>
          </Form>

          {result && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Résultat de la recherche</h2>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p>Code-barres trouvé : {result}</p>
                <Button onClick={() => setResult('')}>
                  Effacer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BarcodeScanner;
