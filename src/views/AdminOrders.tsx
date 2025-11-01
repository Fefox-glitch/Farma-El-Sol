import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { OrderModel, Order } from '../models/OrderModel';

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'canceled'>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await OrderModel.getAllOrders();
        setOrders(data);
      } catch (e: unknown) {
        console.error(e);
        setError('No se pudieron cargar las reservas.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatCL = (n: number) => `$${Number(n || 0).toLocaleString('es-CL')}`;

  const filteredOrders = (() => {
    let res = orders;
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      res = res.filter(o =>
        (o.buyer_name || '').toLowerCase().includes(q) ||
        (o.buyer_code || '').toLowerCase().includes(q) ||
        (o.seller_code || '').toLowerCase().includes(q) ||
        (o.id || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      res = res.filter(o => (o.status || 'pending') === statusFilter);
    }
    if (dateFrom) {
      const from = new Date(dateFrom + 'T00:00:00');
      res = res.filter(o => new Date(o.reserved_at) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo + 'T23:59:59');
      res = res.filter(o => new Date(o.reserved_at) <= to);
    }
    return res;
  })();

  const exportCSV = () => {
    type Row = {
      id: string;
      buyer_name: string | null;
      buyer_phone: string | null;
      buyer_code: string | null;
      seller_code: string | null;
      total: number;
      reserved_at: string;
      expires_at: string;
      status: string;
    };
    const rows: Row[] = filteredOrders.map(o => ({
      id: o.id,
      buyer_name: o.buyer_name,
      buyer_phone: o.buyer_phone,
      buyer_code: o.buyer_code,
      seller_code: o.seller_code,
      total: o.total,
      reserved_at: new Date(o.reserved_at).toISOString(),
      expires_at: new Date(o.expires_at).toISOString(),
      status: o.status || 'pending',
    }));
    const headers = Object.keys(rows[0] || {
      id: '', buyer_name: '', buyer_phone: '', buyer_code: '', seller_code: '', total: '', reserved_at: '', expires_at: '', status: ''
    }) as (keyof Row)[];
    const escape = (v: unknown) => {
      const s = String(v ?? '');
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const csv = [headers.join(',')]
      .concat(rows.map(r => headers.map(h => escape(r[h])).join(',')))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservas_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const flash = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2000);
  };

  const setOrderStatus = async (id: string, status: 'completed' | 'canceled') => {
    try {
      await OrderModel.updateOrderStatus(id, status);
      // refrescar datos
      const data = await OrderModel.getAllOrders();
      setOrders(data);
      flash(status === 'completed' ? 'Reserva marcada como completada' : 'Reserva cancelada');
    } catch (e) {
      console.error(e);
      setError('No se pudo actualizar el estado de la reserva.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-brand-blue">Administrador de Reservas</h1>
        <nav className="flex gap-2">
          <a className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" href="/admin/reservas">Reservas</a>
          <a className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" href="/admin/productos">Productos</a>
          <button className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={() => { localStorage.removeItem('admin_auth'); window.location.href = '/'; }}>Cerrar sesión</button>
        </nav>
      </div>

      {loading && (
        <div className="p-4 bg-gray-100 rounded">Cargando órdenes...</div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>
      )}
      {notif && (
        <div className="p-2 bg-green-50 border border-green-200 text-green-700 rounded mb-4">{notif}</div>
      )}

      {/* Filtros */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <input className="border rounded px-3 py-2" placeholder="Buscar (nombre, código, orden)" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
          <select className="border rounded px-3 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'completed' | 'canceled')}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completada</option>
            <option value="canceled">Cancelada</option>
          </select>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Desde</label>
            <input className="border rounded px-3 py-2 w-full" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Hasta</label>
            <input className="border rounded px-3 py-2 w-full" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <button className="bg-brand-accent text-white px-4 py-2 rounded font-semibold" onClick={exportCSV}>Exportar CSV</button>
        </div>
      </div>

      {!loading && !error && orders.length === 0 && (
        <div className="p-4 bg-gray-50 border rounded">No hay reservas registradas.</div>
      )}

      {!loading && !error && filteredOrders.length > 0 && (
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comprador</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Códigos</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserva</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comprobante vendedor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="text-sm text-gray-800">{o.id}</div>
                    <div className="text-xs text-gray-500">{new Date(o.created_at || o.reserved_at).toLocaleString('es-CL')}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-sm text-gray-800">{o.buyer_name}</div>
                    <div className="text-xs text-gray-500">{o.buyer_phone}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-brand-blue">{o.buyer_code}</span>
                      <button className="p-1 text-gray-500 hover:text-gray-800" onClick={() => navigator.clipboard?.writeText(o.buyer_code)} aria-label="Copiar código comprador"><Copy size={16} /></button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-sm text-brand-blue">{o.seller_code}</span>
                      <button className="p-1 text-gray-500 hover:text-gray-800" onClick={() => navigator.clipboard?.writeText(o.seller_code)} aria-label="Copiar código vendedor"><Copy size={16} /></button>
                    </div>
                  </td>
                  <td className="px-4 py-2 font-semibold text-brand-blue">{formatCL(o.total)}</td>
                  <td className="px-4 py-2 text-sm">
                    <div><span className="text-gray-500">Desde:</span> {new Date(o.reserved_at).toLocaleString('es-CL')}</div>
                    <div><span className="text-gray-500">Expira:</span> {new Date(o.expires_at).toLocaleString('es-CL')}</div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{o.status || 'pending'}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-xs whitespace-pre-line bg-gray-50 border rounded p-2 max-h-32 overflow-y-auto">
                      {o.seller_receipt_text || '—'}
                    </div>
                    {o.seller_receipt_text && (
                      <button className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1 rounded" onClick={() => navigator.clipboard?.writeText(o.seller_receipt_text!)}>
                        Copiar texto
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm" onClick={() => setOrderStatus(o.id, 'completed')}>Marcar completada</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={() => setOrderStatus(o.id, 'canceled')}>Cancelar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};