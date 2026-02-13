import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  items = computed(() => this.cartService.items());
  isEmpty = computed(() => this.items().length === 0);

  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
