import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private readonly _items = signal<Product[]>([]);
  readonly items = this._items.asReadonly();

  isInWishlist(productId: string): boolean {
    return this._items().some(p => p.id === productId);
  }

  toggle(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this._items.update(items => items.filter(p => p.id !== product.id));
    } else {
      this._items.update(items => [...items, product]);
    }
  }

  remove(productId: string): void {
    this._items.update(items => items.filter(p => p.id !== productId));
  }
}
