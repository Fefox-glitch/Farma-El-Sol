import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [logged, setLogged] = useState<boolean>(localStorage.getItem('admin_auth') === 'true');

  const adminPass = import.meta.env.VITE_ADMIN_PASS || 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPass) {
      localStorage.setItem('admin_auth', 'true');
      setLogged(true);
    } else {
      setError('Contraseña incorrecta');
    }
  };

  if (logged) return <Navigate to="/admin/productos" replace />;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold text-brand-blue mb-4">Acceso administrador</h1>
        {error && (
          <div className="p-2 mb-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="border rounded px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña de administrador"
            />
            <p className="text-xs text-gray-500 mt-1">Configura `VITE_ADMIN_PASS` para producción.</p>
          </div>
          <button type="submit" className="bg-brand-accent text-white px-4 py-2 rounded font-semibold w-full">Ingresar</button>
        </form>
      </div>
    </main>
  );
};