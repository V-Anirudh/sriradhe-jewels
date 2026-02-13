import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, ProductCardComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent {
  product = signal<Product | undefined>(undefined);
  selectedImageIndex = signal(0);
  activeTab = signal<'details' | 'gemstones' | 'shipping'>('details');
  inquirySubmitted = signal(false);

  inquiryMode = signal<'video-call' | 'visit-store'>('visit-store');

  inquiryForm = signal({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  relatedProducts = computed(() => {
    const p = this.product();
    return p ? this.productService.getRelatedProducts(p) : [];
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {
    this.route.params.subscribe(params => {
      const product = this.productService.getProductBySlug(params['slug']);
      this.product.set(product);
      this.selectedImageIndex.set(0);
      this.inquirySubmitted.set(false);
      this.inquiryForm.set({ name: '', phone: '', email: '', message: '', preferredDate: '', preferredTime: '' });
      this.inquiryMode.set('visit-store');
    });
  }

  get isWishlisted(): boolean {
    const p = this.product();
    return p ? this.wishlistService.isInWishlist(p.id) : false;
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  toggleWishlist(): void {
    const p = this.product();
    if (p) this.wishlistService.toggle(p);
  }

  updateInquiryField(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.inquiryForm.update(form => ({ ...form, [field]: value }));
  }

  submitInquiry(event: Event): void {
    event.preventDefault();
    const form = this.inquiryForm();
    const p = this.product();
    if (!form.name || !form.phone || !p) return;

    console.log('[Shree Radheya Jewellers] Inquiry submitted:', {
      product: p.name,
      sku: p.sku,
      inquiryMode: this.inquiryMode(),
      ...form
    });

    this.inquirySubmitted.set(true);
    setTimeout(() => this.inquirySubmitted.set(false), 5000);
    this.inquiryForm.set({ name: '', phone: '', email: '', message: '', preferredDate: '', preferredTime: '' });
    this.inquiryMode.set('visit-store');
  }

  setTab(tab: 'details' | 'gemstones' | 'shipping'): void {
    this.activeTab.set(tab);
  }
}
