import React from 'react';

type SortKey = 'relevance' | 'price_asc' | 'price_desc';
type PrescriptionFilter = 'all' | 'requires' | 'no_requires';

interface FiltersBarProps {
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  prescriptionFilter: PrescriptionFilter;
  onPrescriptionFilterChange: (val: PrescriptionFilter) => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  sortKey,
  onSortChange,
  prescriptionFilter,
  onPrescriptionFilterChange,
}) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-3 mb-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">Ordenar</label>
        <select
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="relevance">Relevancia</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">Receta</label>
        <select
          value={prescriptionFilter}
          onChange={(e) => onPrescriptionFilterChange(e.target.value as PrescriptionFilter)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="all">Todos</option>
          <option value="requires">Con receta</option>
          <option value="no_requires">Sin receta</option>
        </select>
      </div>
    </div>
  );
};