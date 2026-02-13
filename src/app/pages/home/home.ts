import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private slideInterval: ReturnType<typeof setInterval> | undefined;

  heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&h=900&fit=crop',
      label: '✦ The Bridal Collection',
      title: 'Where Heritage\nMeets Elegance',
      subtitle: 'Discover handcrafted masterpieces that honour centuries of Indian artistry, reimagined for the modern bride who deserves nothing less than extraordinary.',
      cta: 'Explore Bridal',
      link: '/collections',
      queryParams: { collection: 'bridal-grandeur' }
    },
    {
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&h=900&fit=crop',
      label: '✦ Temple Jewellery',
      title: 'Timeless\nDevotion',
      subtitle: 'Sacred motifs carved in gold — temple jewellery that connects you to India\'s spiritual heritage with divine grace.',
      cta: 'Discover Heritage',
      link: '/collections',
      queryParams: { collection: 'temple-heritage' }
    },
    {
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=900&fit=crop',
      label: '✦ Diamond Collection',
      title: 'Brilliance\nRedefined',
      subtitle: 'Exquisite diamonds set with precision — for moments that deserve to shine eternally in a blaze of light.',
      cta: 'Shop Diamonds',
      link: '/collections',
      queryParams: { collection: 'diamond-eternity' }
    }
  ];

  categories = [
    { name: 'Necklaces', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', count: 45 },
    { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=500&fit=crop', count: 62 },
    { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=500&fit=crop', count: 38 },
    { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop', count: 54 },
    { name: 'Bridal Sets', slug: 'bridal-sets', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=500&fit=crop', count: 24 },
    { name: 'Pendants', slug: 'pendants', image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=400&h=500&fit=crop', count: 41 }
  ];

  // ── Category Tab Filter ────────────────────────────────────
  selectedCategory = signal('all');

  categoryTabs = [
    { label: 'All', slug: 'all' },
    { label: 'Necklaces', slug: 'necklaces' },
    { label: 'Earrings', slug: 'earrings' },
    { label: 'Bangles', slug: 'bangles' },
    { label: 'Rings', slug: 'rings' },
    { label: 'Bridal Sets', slug: 'bridal-sets' },
    { label: 'Pendants', slug: 'pendants' }
  ];

  filteredCategoryProducts = computed(() => {
    const cat = this.selectedCategory();
    const all = this.productService.products();
    if (cat === 'all') return all.slice(0, 8);
    return all.filter(p => p.category === cat).slice(0, 8);
  });

  selectCategory(slug: string): void {
    this.selectedCategory.set(slug);
  }

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopSlideshow(): void {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  nextSlide(): void {
    this.currentSlide.update(s => (s + 1) % this.heroSlides.length);
  }

  prevSlide(): void {
    this.currentSlide.update(s => (s - 1 + this.heroSlides.length) % this.heroSlides.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopSlideshow();
    this.startSlideshow();
  }
}
