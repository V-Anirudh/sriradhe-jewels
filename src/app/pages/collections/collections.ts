import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { Product, ProductCategory } from '../../core/models/product.model';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './collections.html',
  styleUrl: './collections.scss'
})
export class CollectionsComponent {
  selectedCategory = signal<string>('all');
  selectedMetal = signal<string>('all');
  selectedSort = signal<string>('featured');
  viewMode = signal<'grid' | 'large'>('grid');

  categories: { label: string; value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Necklaces', value: 'necklaces' },
    { label: 'Earrings', value: 'earrings' },
    { label: 'Bangles', value: 'bangles' },
    { label: 'Rings', value: 'rings' },
    { label: 'Bracelets', value: 'bracelets' },
    { label: 'Pendants', value: 'pendants' },
    { label: 'Mangalsutra', value: 'mangalsutra' },
    { label: 'Bridal Sets', value: 'bridal-sets' }
  ];

  metals = [
    { label: 'All Metals', value: 'all' },
    { label: 'Gold', value: 'gold' },
    { label: 'Diamond', value: 'diamond' },
    { label: 'Platinum', value: 'platinum' },
    { label: 'Rose Gold', value: 'rose-gold' }
  ];

  filteredProducts = computed(() => {
    let products = this.productService.products();

    if (this.selectedCategory() !== 'all') {
      products = products.filter(p => p.category === this.selectedCategory());
    }

    if (this.selectedMetal() !== 'all') {
      products = products.filter(p => p.metal === this.selectedMetal());
    }

    switch (this.selectedSort()) {
      case 'price-low': return [...products].sort((a, b) => a.price - b.price);
      case 'price-high': return [...products].sort((a, b) => b.price - a.price);
      case 'newest': return products.filter(p => p.isNew).concat(products.filter(p => !p.isNew));
      case 'rating': return [...products].sort((a, b) => b.rating - a.rating);
      default: return products;
    }
  });

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.selectedCategory.set(params['category']);
      if (params['collection']) {
        // Could filter by collection slug
      }
    });
  }

  setCategory(value: string): void {
    this.selectedCategory.set(value);
  }

  setMetal(value: string): void {
    this.selectedMetal.set(value);
  }

  setSort(value: string): void {
    this.selectedSort.set(value);
  }

  toggleView(): void {
    this.viewMode.update(v => v === 'grid' ? 'large' : 'grid');
  }
}
