import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  template: `
    @if (cart.isOpen()) {
      <div class="cart-overlay" (click)="cart.closeCart()"></div>
    }
    <aside class="cart-sidebar" [class.open]="cart.isOpen()">
      <div class="cart-header">
        <h3>Your Interests</h3>
        <span class="cart-count">{{ cart.itemCount() }} {{ cart.itemCount() === 1 ? 'piece' : 'pieces' }}</span>
        <button class="cart-close" (click)="cart.closeCart()" aria-label="Close panel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="cart-body">
        @if (cart.items().length === 0) {
          <div class="cart-empty">
            <div class="cart-empty-icon">◈</div>
            <h4>No items yet</h4>
            <p>Browse our exquisite collections and express interest in pieces you love.</p>
            <a routerLink="/collections" class="btn-primary" (click)="cart.closeCart()">Explore Collections</a>
          </div>
        } @else {
          <div class="cart-items">
            @for (item of cart.items(); track item.product.id) {
              <div class="cart-item">
                <img [src]="item.product.thumbnail" [alt]="item.product.name" class="cart-item-img">
                <div class="cart-item-info">
                  <h4 class="cart-item-name">{{ item.product.name }}</h4>
                  <p class="cart-item-meta">{{ item.product.purity }} {{ item.product.metal | titlecase }} · {{ item.product.weight }}</p>
                  <span class="cart-item-price-label">Price on Request</span>
                </div>
                <button class="cart-item-remove" (click)="cart.removeItem(item.product.id)" aria-label="Remove item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            }
          </div>
        }
      </div>

      @if (cart.items().length > 0) {
        <div class="cart-footer">
          <p class="cart-footer-note">Submit your inquiry and our team will contact you with pricing and availability details.</p>
          <a routerLink="/checkout" class="btn-primary btn-lg cart-checkout-btn" (click)="cart.closeCart()">
            Send Inquiry
          </a>
          <a routerLink="/cart" class="cart-view-link" (click)="cart.closeCart()">View All Interested Pieces</a>
        </div>
      }
    </aside>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      inset: 0;
      z-index: 1800;
      background: rgba(0, 0, 0, 0.5);
      animation: fadeIn var(--duration-fast) var(--ease-out-expo);
    }

    .cart-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 420px;
      max-width: 90vw;
      height: 100vh;
      z-index: 1900;
      background: var(--bg-card);
      box-shadow: var(--shadow-xl);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform var(--duration-normal) var(--ease-out-expo);

      &.open { transform: translateX(0); }
    }

    .cart-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-5) var(--space-6);
      border-bottom: 1px solid var(--border-light);

      h3 {
        font-family: var(--font-heading);
        font-size: 1.375rem;
        font-weight: 600;
      }

      .cart-count {
        font-size: 0.8125rem;
        color: var(--text-muted);
      }

      .cart-close {
        margin-left: auto;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-full);
        color: var(--text-secondary);
        &:hover { background: var(--bg-secondary); }
      }
    }

    .cart-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-4) var(--space-6);
    }

    .cart-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
      gap: var(--space-3);

      .cart-empty-icon {
        font-size: 3rem;
        color: var(--maroon-500);
        opacity: 0.3;
      }

      h4 {
        font-family: var(--font-heading);
        font-size: 1.25rem;
      }

      p {
        font-size: 0.875rem;
        color: var(--text-muted);
        max-width: 240px;
      }
    }

    .cart-item {
      display: flex;
      gap: var(--space-4);
      padding: var(--space-4) 0;
      border-bottom: 1px solid var(--border-light);
      position: relative;

      .cart-item-img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: var(--radius-sm);
        background: var(--bg-secondary);
      }

      .cart-item-info { flex: 1; }

      .cart-item-name {
        font-family: var(--font-heading);
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 2px;
        line-height: 1.3;
      }

      .cart-item-meta {
        font-size: 0.75rem;
        color: var(--text-muted);
        margin-bottom: var(--space-2);
      }

      .cart-item-price-label {
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--maroon-600);
      }

      .cart-item-remove {
        position: absolute;
        top: var(--space-4);
        right: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-full);
        color: var(--text-muted);
        &:hover { background: var(--bg-secondary); color: var(--ruby-500); }
      }
    }

    .cart-footer {
      border-top: 1px solid var(--border-light);
      padding: var(--space-5) var(--space-6);
    }

    .cart-footer-note {
      font-size: 0.8125rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: var(--space-4);
    }

    .cart-checkout-btn {
      display: flex;
      width: 100%;
      text-align: center;
    }

    .cart-view-link {
      display: block;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--text-secondary);
      margin-top: var(--space-3);
      text-decoration: underline;
      text-underline-offset: 3px;
      &:hover { color: var(--text-primary); }
    }
  `]
})
export class CartSidebarComponent {
  constructor(public cart: CartService) {}
}
