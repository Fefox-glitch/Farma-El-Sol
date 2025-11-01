import { supabase, Product, Category } from '../lib/supabase';

export class ProductModel {
  static async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(6);

    if (error) throw error;
    return data || [];
  }

  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId);

    if (error) throw error;
    return data || [];
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`);

    if (error) throw error;
    return data || [];
  }

  static async createProduct(payload: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(payload);
    if (error) throw error;
    const inserted = Array.isArray(data) ? data[0] : data;
    return inserted as Product;
  }

  static async updateProduct(id: string, patch: Partial<Product>): Promise<void> {
    const { error } = await supabase
      .from('products')
      .eq('id', id)
      .update(patch);
    if (error) throw error;
  }

  static async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .eq('id', id)
      .delete();
    if (error) throw error;
  }
}

export class CategoryModel {
  static async getAllCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}
