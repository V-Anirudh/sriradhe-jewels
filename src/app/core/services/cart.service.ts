import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly _items = signal<CartItem[]>([]);
  private readonly _isOpen = signal(false);

  readonly items = this._items.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  readonly tax = computed(() => this.subtotal() * 0.03); // 3% GST example

  readonly total = computed(() => this.subtotal() + this.tax());

  toggleCart(): void {
    this._isOpen.update(v => !v);
  }

  openCart(): void {
    this._isOpen.set(true);
  }

  closeCart(): void {
    this._isOpen.set(false);
  }

  addItem(product: Product, quantity = 1, size?: string): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...items, { product, quantity, selectedSize: size }];
    });
    this.openCart();
  }

  removeItem(productId: string): void {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this._items.update(items =>
      items.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  clearCart(): void {
    this._items.set([]);
  }
}
