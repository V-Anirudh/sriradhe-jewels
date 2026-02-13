import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() showQuickAdd = true;

  constructor(
    private cart: CartService,
    private wishlist: WishlistService
  ) {}

  get isWishlisted(): boolean {
    return this.wishlist.isInWishlist(this.product.id);
  }

  toggleWishlist(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.wishlist.toggle(this.product);
  }

  addToInquiry(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.cart.addItem(this.product);
  }
}
