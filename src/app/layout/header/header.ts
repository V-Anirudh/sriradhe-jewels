import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { GoldTickerComponent } from '../../shared/components/gold-ticker/gold-ticker';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, GoldTickerComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  activeDropdown = signal<string | null>(null);

  constructor(
    public cart: CartService,
    public wishlist: WishlistService
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleSearch(): void {
    this.isSearchOpen.update(v => !v);
  }

  setDropdown(name: string | null): void {
    this.activeDropdown.set(name);
  }

  categories = [
    { name: 'Necklaces', slug: 'necklaces', icon: '✦' },
    { name: 'Earrings', slug: 'earrings', icon: '✦' },
    { name: 'Bangles', slug: 'bangles', icon: '✦' },
    { name: 'Rings', slug: 'rings', icon: '✦' },
    { name: 'Bracelets', slug: 'bracelets', icon: '✦' },
    { name: 'Pendants', slug: 'pendants', icon: '✦' },
    { name: 'Mangalsutra', slug: 'mangalsutra', icon: '✦' },
    { name: 'Bridal Sets', slug: 'bridal-sets', icon: '✦' }
  ];

  collections = [
    { name: 'Bridal Grandeur', slug: 'bridal-grandeur' },
    { name: 'Temple Heritage', slug: 'temple-heritage' },
    { name: 'Modern Luxe', slug: 'modern-luxe' },
    { name: 'Diamond Eternity', slug: 'diamond-eternity' }
  ];
}
