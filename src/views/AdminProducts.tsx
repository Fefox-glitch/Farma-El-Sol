import { useEffect, useMemo, useState } from 'react';
import { ProductModel, CategoryModel } from '../models/ProductModel';
import { Product, Category } from '../lib/supabase';

type EditableProduct = Product & { editing?: boolean; discount_percent?: number };

export const AdminProducts = () => {
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | 'all'>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
  const [notif, setNotif] = useState<string | null>(null);

  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '', description: '', price: 0, discount_price: null,
    image_url: '', category_id: '', stock: 0, featured: false,
    requires_prescription: false, requires_retention: false,
  });
  const [newDiscountPercent, setNewDiscountPercent] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [data, cats] = await Promise.all([
          ProductModel.getAllProducts(),
          CategoryModel.getAllCategories(),
        ]);
        setProducts(data.map(p => ({ ...p, editing: false, discount_percent: p.discount_price ? Math.round((1 - (p.discount_price / p.price)) * 100) : 0 })));
        setCategories(cats);
      } catch (e: unknown) {
        console.error(e);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const refresh = async () => {
    const [data, cats] = await Promise.all([
      ProductModel.getAllProducts(),
      CategoryModel.getAllCategories(),
    ]);
    setProducts(data.map(p => ({ ...p, editing: false, discount_percent: p.discount_price ? Math.round((1 - (p.discount_price / p.price)) * 100) : 0 })));
    setCategories(cats);
  };

  

  const filteredProducts = useMemo(() => {
    let list = products;
    if (filterText.trim()) list = list.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));
    if (filterCategory !== 'all') list = list.filter(p => p.category_id === filterCategory);
    if (filterStock === 'in_stock') list = list.filter(p => (p.stock || 0) > 0);
    if (filterStock === 'out_of_stock') list = list.filter(p => (p.stock || 0) <= 0);
    return list;
  }, [products, filterText, filterCategory, filterStock]);

  // Paginación cliente
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pageProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page]);
  useEffect(() => { setPage(prev => (prev > totalPages ? 1 : prev)); }, [totalPages]);

  const applyDiscount = (price: number, percent: number): number | null => {
    const pct = Math.max(0, Math.min(100, Math.round(percent)));
    if (pct <= 0) return null; // sin descuento
    const discounted = Math.round(price * (100 - pct) / 100);
    return discounted;
  };

  const handleSave = async (p: EditableProduct) => {
    try {
      const discount_price = applyDiscount(p.price, p.discount_percent || 0);
      await ProductModel.updateProduct(p.id, {
        name: p.name,
        description: p.description,
        price: p.price,
        discount_price,
        image_url: p.image_url,
        category_id: p.category_id,
        stock: p.stock,
        featured: p.featured,
        requires_prescription: Boolean(p.requires_prescription),
        requires_retention: Boolean(p.requires_retention),
      });
      await refresh();
      // Notificar a otras vistas que cambió el catálogo
      window.dispatchEvent(new CustomEvent('products_changed'));
      setNotif('Producto guardado'); setTimeout(() => setNotif(null), 2000);
    } catch (e) {
      console.error(e);
      alert('No se pudo guardar el producto.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      await ProductModel.deleteProduct(id);
      await refresh();
      window.dispatchEvent(new CustomEvent('products_changed'));
      setNotif('Producto eliminado'); setTimeout(() => setNotif(null), 2000);
    } catch (e) {
      console.error(e);
      alert('No se pudo eliminar el producto.');
    }
  };

  const handleCreate = async () => {
    try {
      const discount_price = applyDiscount(Number(newProd.price || 0), newDiscountPercent);
      const payload = { ...newProd, discount_price } as Partial<Product>;
      await ProductModel.createProduct(payload);
      setNewProd({ name: '', description: '', price: 0, discount_price: null, image_url: '', category_id: '', stock: 0, featured: false });
      setNewDiscountPercent(0);
      await refresh();
      window.dispatchEvent(new CustomEvent('products_changed'));
      setNotif('Producto creado'); setTimeout(() => setNotif(null), 2000);
    } catch (e) {
      console.error(e);
      alert('No se pudo crear el producto.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-brand-blue">Administrador de Productos</h1>
        <nav className="flex gap-2">
          <a className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" href="/admin/reservas">Reservas</a>
          <a className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" href="/admin/productos">Productos</a>
          <button className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={() => { localStorage.removeItem('admin_auth'); window.location.href = '/'; }}>Cerrar sesión</button>
        </nav>
      </div>

      {loading && (<div className="p-4 bg-gray-100 rounded">Cargando productos...</div>)}
      {error && (<div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>)}
      {notif && (<div className="p-2 bg-green-50 border border-green-200 text-green-700 rounded mb-4">{notif}</div>)}

      {/* Filtros */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Buscar por nombre" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
          <select className="border rounded px-3 py-2" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value as 'all' | string)}>
            <option value="all">Todas las categorías</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select className="border rounded px-3 py-2" value={filterStock} onChange={(e) => setFilterStock(e.target.value as 'all' | 'in_stock' | 'out_of_stock')}>
            <option value="all">Todo stock</option>
            <option value="in_stock">Con stock</option>
            <option value="out_of_stock">Sin stock</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">Mostrando {filteredProducts.length} de {products.length} productos</div>
        </div>
      </div>

      {/* Crear producto */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Crear producto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input className="border rounded px-3 py-2 w-full" value={newProd.name as string} onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} />
            <p className="text-xs text-gray-500">Nombre comercial visible para el cliente.</p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input className="border rounded px-3 py-2 w-full" type="number" min={0} value={Number(newProd.price || 0)} onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })} />
            <p className="text-xs text-gray-500">Precio base antes de aplicar descuento.</p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select className="border rounded px-3 py-2 w-full" value={newProd.category_id as string} onChange={(e) => setNewProd({ ...newProd, category_id: e.target.value })}>
              <option value="">Selecciona categoría</option>
              {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            <p className="text-xs text-gray-500">Clasifica el producto para el catálogo.</p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input className="border rounded px-3 py-2 w-full" type="number" min={0} value={Number(newProd.stock || 0)} onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })} />
            <p className="text-xs text-gray-500">Unidades disponibles para venta.</p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Imagen URL</label>
            <input className="border rounded px-3 py-2 w-full" placeholder="https://..." value={newProd.image_url as string} onChange={(e) => setNewProd({ ...newProd, image_url: e.target.value })} />
            <p className="text-xs text-gray-500">Enlace a la imagen del producto (opcional).</p>
          </div>
          <div className="space-y-1 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea className="border rounded px-3 py-2 w-full" rows={3} value={newProd.description as string} onChange={(e) => setNewProd({ ...newProd, description: e.target.value })} />
            <p className="text-xs text-gray-500">Detalles, presentación y recomendaciones de uso (opcional).</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm text-gray-700">Descuento (%)</label>
          <input className="border rounded px-3 py-2 w-28" type="number" min={0} max={100} value={newDiscountPercent} onChange={(e) => setNewDiscountPercent(Number(e.target.value))} />
          <span className="text-sm text-gray-500">Porcentaje 0–100. Calcula el precio final y se guarda en <code>discount_price</code>.</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 mb-3">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4" checked={Boolean(newProd.requires_prescription)} onChange={(e) => setNewProd({ ...newProd, requires_prescription: e.target.checked })} />
            Requiere receta
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4" checked={Boolean(newProd.requires_retention)} onChange={(e) => setNewProd({ ...newProd, requires_retention: e.target.checked })} />
            Retención de receta
          </label>
          <span className="text-xs text-gray-500">Para medicamentos controlados: exige presentación o retención de receta.</span>
        </div>
        <button className="bg-brand-accent text-white px-4 py-2 rounded font-semibold" onClick={handleCreate}>Crear</button>
      </div>

      {/* Listado y edición */}
      {!loading && filteredProducts.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio final</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descuento (%)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Control receta</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase w-40">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pageProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input className="border rounded px-2 py-1 w-full" value={p.name} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                  </td>
                  <td className="px-4 py-2">
                    <input className="border rounded px-2 py-1 w-28" type="number" value={p.price} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, price: Number(e.target.value) } : x))} />
                  </td>
                  <td className="px-4 py-2">
                    {(() => {
                      const final = applyDiscount(p.price, p.discount_percent || 0);
                      const fmt = (n: number) => `$${Number(n || 0).toLocaleString('es-CL')}`;
                      return (
                        <div className="text-sm">
                          {final ? (
                            <>
                              <span className="font-semibold text-green-700">{fmt(final)}</span>
                              <span className="ml-2 line-through text-gray-400">{fmt(p.price)}</span>
                            </>
                          ) : (
                            <span className="text-gray-800">{fmt(p.price)}</span>
                          )}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-2">
                    <input className="border rounded px-2 py-1 w-24" type="number" min={0} max={100} value={p.discount_percent || 0} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, discount_percent: Number(e.target.value) } : x))} />
                  </td>
                  <td className="px-4 py-2">
                    <input className="border rounded px-2 py-1 w-20" type="number" value={p.stock} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, stock: Number(e.target.value) } : x))} />
                  </td>
                  <td className="px-4 py-2">
                    <select className="border rounded px-2 py-1 w-40" value={p.category_id} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, category_id: e.target.value } : x))}>
                      {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-1 text-sm">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" checked={Boolean(p.requires_prescription)} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, requires_prescription: e.target.checked } : x))} />
                        Requiere receta
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4" checked={Boolean(p.requires_retention)} onChange={(e) => setProducts(prev => prev.map((x) => x.id === p.id ? { ...x, requires_retention: e.target.checked } : x))} />
                        Retención de receta
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-2 w-40 text-right">
                    <div className="flex gap-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => handleSave(p)}>Guardar</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between p-3 border-t bg-gray-50">
            <div className="text-sm text-gray-600">Página {page} de {totalPages}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</button>
              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente</button>
            </div>
          </div>
        </div>
      )}
      {!loading && filteredProducts.length === 0 && (
        <div className="p-4 bg-gray-50 border rounded">No hay productos que coincidan con los filtros.</div>
      )}
    </main>
  );
};
