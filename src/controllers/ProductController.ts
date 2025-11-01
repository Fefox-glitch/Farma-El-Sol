import { useState, useEffect } from 'react';
import { ProductModel, CategoryModel } from '../models/ProductModel';
import { Product, Category } from '../lib/supabase';

export const useProductController = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else if (selectedCategory) {
      loadProductsByCategory(selectedCategory);
    } else {
      loadProducts();
    }
  }, [selectedCategory, searchQuery]);

  const loadCategories = async () => {
    try {
      const data = await CategoryModel.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductModel.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductModel.getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProductsByCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      const data = await ProductModel.getProductsByCategory(categoryId);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await ProductModel.searchProducts(query);
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    loadFeaturedProducts,
  };
};
