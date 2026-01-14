import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Grid, List } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('categoria') || ''
  );
  const [selectedBadge, setSelectedBadge] = useState<string>(
    searchParams.get('badge') || ''
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('categoria', selectedCategory);
    if (selectedBadge) params.set('badge', selectedBadge);
    if (searchQuery) params.set('search', searchQuery);
    setSearchParams(params);
  }, [selectedCategory, selectedBadge, searchQuery, setSearchParams]);

  // Get unique values for filters
  const colors = useMemo(() => [...new Set(products.map(p => p.color))], []);
  const materials = useMemo(() => [...new Set(products.map(p => p.material))], []);
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Badge
    if (selectedBadge) {
      result = result.filter(p => p.badge === selectedBadge);
    }

    // Price range
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter(p => selectedColors.includes(p.color));
    }

    // Materials
    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured - badges first
        result.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return 0;
        });
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedBadge,
    priceRange,
    selectedColors,
    selectedMaterials,
    sortBy
  ]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBadge('');
    setPriceRange([0, maxPrice]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedBadge ||
    selectedColors.length > 0 ||
    selectedMaterials.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    searchQuery;

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#f5f1ed] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a] mb-4">
            {selectedCategory
              ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
              : 'Todos los Productos'}
          </h1>
          <p className="text-[#6b6b6b]">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-[#e8e4e0] rounded hover:border-[#1a1a1a] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filtros</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[#c9a961] rounded-full" />
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#c9a961] hover:text-[#b8954f] font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode */}
            <div className="hidden sm:flex items-center border border-[#e8e4e0] rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' ? 'bg-[#1a1a1a] text-white' : 'text-[#6b6b6b]'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' ? 'bg-[#1a1a1a] text-white' : 'text-[#6b6b6b]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none px-4 py-2 pr-10 border border-[#e8e4e0] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a961] bg-white"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              isFilterOpen ? 'block' : 'hidden'
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white p-6 rounded-lg border border-[#e8e4e0] space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-medium text-[#1a1a1a] mb-3">Buscar</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full px-3 py-2 border border-[#e8e4e0] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium text-[#1a1a1a] mb-3">Categoría</h3>
                <div className="space-y-2">
                  {['bolsas', 'billeteras', 'accesorios'].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() =>
                          setSelectedCategory(selectedCategory === cat ? '' : cat)
                        }
                        className="text-[#c9a961] focus:ring-[#c9a961]"
                      />
                      <span className="text-sm text-[#6b6b6b] capitalize">
                        {cat}
                      </span>
                      <span className="text-xs text-[#999] ml-auto">
                        ({products.filter((p) => p.category === cat).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-[#1a1a1a] mb-3">Precio</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-[#c9a961]"
                  />
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6b6b6b]">$0</span>
                    <span className="text-[#6b6b6b]">-</span>
                    <span className="font-medium text-[#1a1a1a]">
                      ${priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-medium text-[#1a1a1a] mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        selectedColors.includes(color)
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'border-[#e8e4e0] text-[#6b6b6b] hover:border-[#1a1a1a]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-medium text-[#1a1a1a] mb-3">Material</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label
                      key={material}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => toggleMaterial(material)}
                        className="rounded text-[#c9a961] focus:ring-[#c9a961]"
                      />
                      <span className="text-sm text-[#6b6b6b]">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div>
                <h3 className="font-medium text-[#1a1a1a] mb-3">Etiqueta</h3>
                <div className="space-y-2">
                  {['nuevo', 'bestseller'].map((badge) => (
                    <label
                      key={badge}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="badge"
                        checked={selectedBadge === badge}
                        onChange={() =>
                          setSelectedBadge(selectedBadge === badge ? '' : badge)
                        }
                        className="text-[#c9a961] focus:ring-[#c9a961]"
                      />
                      <span className="text-sm text-[#6b6b6b] capitalize">
                        {badge === 'nuevo' ? 'Nuevo' : 'Bestseller'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Close */}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden w-full py-2 bg-[#1a1a1a] text-white font-medium rounded"
              >
                Aplicar Filtros
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#6b6b6b] mb-4">
                  No se encontraron productos con los filtros seleccionados.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[#c9a961] font-medium hover:text-[#b8954f]"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#e8e4e0]">
        <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">Métodos de pago</h2>
        <div className="bg-[#f5f1ed] rounded-lg p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-16 h-10 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">AMEX</span>
            </div>
            <div className="w-16 h-10 bg-white rounded flex items-center justify-center">
              <div className="flex">
                <div className="w-6 h-6 bg-red-500 rounded-full -mr-2"></div>
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            <div className="w-16 h-10 bg-white rounded flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">VISA</span>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-[#6b6b6b]">
            <li>• Tarjeta (contado y cuotas sin recargo)</li>
            <li>• Efectivo contra entrega</li>
            <li>• Depósito o transferencia bancaria (5% de descuento)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
