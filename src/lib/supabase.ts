/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback seguro para desarrollo sin variables de entorno
function createMockClient(): any {
  const now = new Date().toISOString();
  const mockData: Record<string, any[]> = {
    categories: [
      { id: 'cat-1', name: 'Medicamentos', slug: 'medicamentos', icon: 'Pill', created_at: now },
      { id: 'cat-2', name: 'Medicamentos Controlados', slug: 'medicamentos-controlados', icon: 'ShieldAlert', created_at: now },
      { id: 'cat-3', name: 'Cuidado Personal y Dermocosmética', slug: 'cuidado-personal-dermocosmetica', icon: 'Sparkles', created_at: now },
      { id: 'cat-4', name: 'Primeros Auxilios', slug: 'primeros-auxilios', icon: 'FirstAidKit', created_at: now },
      { id: 'cat-5', name: 'Salud Respiratoria', slug: 'salud-respiratoria', icon: 'Stethoscope', created_at: now },
      { id: 'cat-6', name: 'Bebés y Maternidad', slug: 'bebes-maternidad', icon: 'Baby', created_at: now },
      { id: 'cat-7', name: 'Adulto Mayor', slug: 'adulto-mayor', icon: 'Wheelchair', created_at: now },
      { id: 'cat-8', name: 'Higiene y Bienestar', slug: 'higiene-bienestar', icon: 'ShowerHead', created_at: now },
      { id: 'cat-9', name: 'Productos Naturales y Fitoterapia', slug: 'naturales-fitoterapia', icon: 'Leaf', created_at: now },
      { id: 'cat-10', name: 'Salud Sexual', slug: 'salud-sexual', icon: 'Heart', created_at: now },
      { id: 'cat-11', name: 'Productos Veterinarios', slug: 'productos-veterinarios', icon: 'Dog', created_at: now },
    ],
    products: [
      { id: 'prod-1', name: 'Paracetamol 500 mg', description: 'Analgésico y antipirético. Presentación: tabletas.', price: 3500, discount_price: null, image_url: 'https://images.unsplash.com/photo-1584094926059-8090c7d9f8ea?auto=format&fit=crop&w=800&q=60', category_id: 'cat-1', stock: 25, featured: true, requires_prescription: false, created_at: now },
      { id: 'prod-2', name: 'Ibuprofeno 400 mg', description: 'Antiinflamatorio y analgésico. Presentación: tabletas.', price: 4200, discount_price: 3800, image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60', category_id: 'cat-1', stock: 12, featured: true, requires_prescription: false, created_at: now },
      { id: 'prod-3', name: 'Antigripal cápsulas', description: 'Para síntomas de resfrío. Presentación: cápsulas.', price: 6900, discount_price: null, image_url: 'https://images.unsplash.com/photo-1584362917165-1ec1e9f4f7c3?auto=format&fit=crop&w=800&q=60', category_id: 'cat-1', stock: 8, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-4', name: 'Loratadina 10 mg', description: 'Antialérgico de uso diario. Presentación: tabletas.', price: 5500, discount_price: null, image_url: 'https://images.unsplash.com/photo-1590182364524-5b2d3d0f5ee4?auto=format&fit=crop&w=800&q=60', category_id: 'cat-1', stock: 30, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-5', name: 'Protector solar SPF50', description: 'Dermocosmética. Alta protección UV.', price: 12900, discount_price: 10900, image_url: 'https://images.unsplash.com/photo-1584036561566-baf23b7fe1bc?auto=format&fit=crop&w=800&q=60', category_id: 'cat-3', stock: 15, featured: true, requires_prescription: false, created_at: now },
      { id: 'prod-6', name: 'Gel para acné', description: 'Tratamiento tópico para acné leve.', price: 9500, discount_price: null, image_url: 'https://images.unsplash.com/photo-1611930022073-b7e9f1a2423d?auto=format&fit=crop&w=800&q=60', category_id: 'cat-3', stock: 10, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-7', name: 'Kit primeros auxilios', description: 'Gasas, vendas, curitas y desinfectante.', price: 19900, discount_price: 17900, image_url: 'https://images.unsplash.com/photo-1584225074713-20f0f5d32474?auto=format&fit=crop&w=800&q=60', category_id: 'cat-4', stock: 6, featured: true, requires_prescription: false, created_at: now },
      { id: 'prod-8', name: 'Termómetro digital', description: 'Lectura rápida con pantalla.', price: 7900, discount_price: null, image_url: 'https://images.unsplash.com/photo-1585421514288-1e3623e0c2e3?auto=format&fit=crop&w=800&q=60', category_id: 'cat-4', stock: 0, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-9', name: 'Inhalador salbutamol', description: 'Para broncoespasmo. Uso con receta.', price: 14900, discount_price: null, image_url: 'https://images.unsplash.com/photo-1603398938378-74dcddb5c7b6?auto=format&fit=crop&w=800&q=60', category_id: 'cat-5', stock: 9, featured: false, requires_prescription: true, created_at: now },
      { id: 'prod-10', name: 'Pañales talla M', description: 'Absorción superior para bebés.', price: 16500, discount_price: 15000, image_url: 'https://images.unsplash.com/photo-1600353068383-2a343b5bfb02?auto=format&fit=crop&w=800&q=60', category_id: 'cat-6', stock: 20, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-11', name: 'Ensure vainilla 400g', description: 'Suplemento nutricional para adulto mayor.', price: 22000, discount_price: null, image_url: 'https://images.unsplash.com/photo-1584270354949-1f22ad030f84?auto=format&fit=crop&w=800&q=60', category_id: 'cat-7', stock: 7, featured: true, requires_prescription: false, created_at: now },
      { id: 'prod-12', name: 'Pasta dental fluor', description: 'Higiene bucal diaria.', price: 3200, discount_price: null, image_url: 'https://images.unsplash.com/photo-1604656143985-c8e0a8ad7e5f?auto=format&fit=crop&w=800&q=60', category_id: 'cat-8', stock: 40, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-13', name: 'Propóleo gotas', description: 'Producto natural para garganta.', price: 8900, discount_price: null, image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60', category_id: 'cat-9', stock: 11, featured: false, requires_prescription: false, created_at: now },
      { id: 'prod-14', name: 'Preservativos x3', description: 'Salud sexual y protección.', price: 5000, discount_price: 4500, image_url: 'https://images.unsplash.com/photo-1606146482778-5f8b4b6f0bf0?auto=format&fit=crop&w=800&q=60', category_id: 'cat-10', stock: 18, featured: false, requires_prescription: false, created_at: now },
    ],
    cart_items: [],
  };

  const createBuilder = (table: string) => {
    const state: any = { table, filters: [] as any[], limit: null as number | null, select: '*' };

    const applyFilters = (rows: any[]) => {
      let data = rows.slice();
      state.filters.forEach((f: any) => {
        if (f.type === 'eq') {
          data = data.filter((row: any) => row[f.column] === f.value);
        }
        if (f.type === 'ilike') {
          const q = String(f.value).replace(/%/g, '').toLowerCase();
          data = data.filter((row: any) => String(row[f.column] ?? '').toLowerCase().includes(q));
        }
      });
      if (state.limit !== null) {
        data = data.slice(0, state.limit);
      }
      return data;
    };

    const joinRelations = (rows: any[]) => {
      // Soporte básico para select '*, products(*)' en cart_items
      if (table === 'cart_items' && typeof state.select === 'string' && state.select.includes('products(*)')) {
        return rows.map((row: any) => ({
          ...row,
          products: (mockData['products'] || []).find((p: any) => p.id === row.product_id) || undefined,
        }));
      }
      return rows;
    };

    const api: any = {
      select: (fields?: string) => { state.select = fields ?? '*'; return api; },
      order: () => api,
      eq: (column: string, value: any) => { state.filters.push({ type: 'eq', column, value }); return api; },
      ilike: (column: string, value: any) => { state.filters.push({ type: 'ilike', column, value }); return api; },
      limit: (n: number) => { state.limit = n; return api; },
      then: (resolve: (value: any) => void) => {
        const base = mockData[table] || [];
        const filtered = applyFilters(base);
        const withJoins = joinRelations(filtered);
        resolve({ data: withJoins, error: null });
      },
      maybeSingle: async () => {
        const base = mockData[table] || [];
        const filtered = applyFilters(base);
        const one = filtered.length > 0 ? filtered[0] : null;
        return { data: one, error: null };
      },
      update: async (values: Record<string, any>) => {
        const base = mockData[table] || [];
        // Aplica filtros y actualiza los registros coincidentes
        const filtered = applyFilters(base);
        const ids = new Set(filtered.map((r: any) => r.id));
        mockData[table] = base.map((row: any) => ids.has(row.id) ? { ...row, ...values } : row);
        return { data: null, error: null };
      },
      delete: async () => {
        const base = mockData[table] || [];
        const filtered = applyFilters(base);
        const ids = new Set(filtered.map((r: any) => r.id));
        mockData[table] = base.filter((row: any) => !ids.has(row.id));
        return { data: null, error: null };
      },
      insert: async (values: any) => {
        const arr = Array.isArray(values) ? values : [values];
        const rowsToInsert = arr.map((v: any) => ({
          id: v.id ?? `${table}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          created_at: v.created_at ?? now,
          ...v,
        }));
        mockData[table] = [...(mockData[table] || []), ...rowsToInsert];
        return { data: rowsToInsert, error: null };
      },
    };
    return api;
  };

  return {
    from: (table: string) => createBuilder(table),
  };
}

export const supabase: any = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  image_url: string;
  category_id: string;
  stock: number;
  featured: boolean;
  requires_prescription?: boolean;
  // Para medicamentos controlados que requieren retención de receta
  requires_retention?: boolean;
  created_at: string;
};

export type CartItem = {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  products?: Product;
};
