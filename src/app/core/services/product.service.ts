import { Injectable, signal, computed, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Collection, GoldRate, Testimonial, BlogPost } from '../models/product.model';

/** 1 troy ounce = 31.1035 grams */
const TROY_OZ_TO_GRAM = 31.1035;

/** Refresh interval: 15 minutes in milliseconds */
const RATE_REFRESH_INTERVAL = 15 * 60 * 1000;

interface GoldPriceApiResponse {
  ts: number;
  tsj: number;
  date: string;
  items: {
    curr: string;
    xauPrice: number;   // Gold price per troy oz in INR
    xagPrice: number;   // Silver price per troy oz in INR
    chgXau: number;     // Gold change in INR
    chgXag: number;     // Silver change in INR
    pcXau: number;      // Gold % change
    pcXag: number;      // Silver % change
    xauClose: number;   // Gold previous close
    xagClose: number;   // Silver previous close
  }[];
}

@Injectable({ providedIn: 'root' })
export class ProductService implements OnDestroy {

  private readonly http = inject(HttpClient);
  private rateTimer: ReturnType<typeof setInterval> | null = null;

  private readonly _products = signal<Product[]>(MOCK_PRODUCTS);
  private readonly _collections = signal<Collection[]>(MOCK_COLLECTIONS);
  private readonly _goldRates = signal<GoldRate[]>(FALLBACK_RATES);
  private readonly _testimonials = signal<Testimonial[]>(MOCK_TESTIMONIALS);
  private readonly _blogPosts = signal<BlogPost[]>(MOCK_BLOG_POSTS);
  private readonly _ratesLoading = signal(false);
  private readonly _ratesError = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly collections = this._collections.asReadonly();
  readonly goldRates = this._goldRates.asReadonly();
  readonly testimonials = this._testimonials.asReadonly();
  readonly blogPosts = this._blogPosts.asReadonly();
  readonly ratesLoading = this._ratesLoading.asReadonly();
  readonly ratesError = this._ratesError.asReadonly();

  readonly featuredProducts = computed(() =>
    this._products().filter(p => p.isFeatured)
  );

  readonly newArrivals = computed(() =>
    this._products().filter(p => p.isNew)
  );

  readonly bestsellers = computed(() =>
    this._products().filter(p => p.isBestseller)
  );

  readonly featuredCollections = computed(() =>
    this._collections().filter(c => c.isFeatured)
  );

  constructor() {
    // Fetch live rates immediately, then every 15 minutes
    this.fetchLiveRates();
    this.rateTimer = setInterval(() => this.fetchLiveRates(), RATE_REFRESH_INTERVAL);
  }

  ngOnDestroy(): void {
    if (this.rateTimer) {
      clearInterval(this.rateTimer);
      this.rateTimer = null;
    }
  }

  /** Fetch live metal rates from goldprice.org and convert to Indian standard units */
  fetchLiveRates(): void {
    this._ratesLoading.set(true);
    this._ratesError.set(null);

    this.http.get<GoldPriceApiResponse>('https://data-asg.goldprice.org/dbXRates/INR')
      .subscribe({
        next: (response) => {
          if (response?.items?.length) {
            const data = response.items[0];
            const now = new Date();

            // ── Gold per gram (24K) from troy oz price ──
            const gold24KPerGram = data.xauPrice / TROY_OZ_TO_GRAM;
            const gold22KPerGram = gold24KPerGram * (22 / 24);
            const gold18KPerGram = gold24KPerGram * (18 / 24);

            const liveRates: GoldRate[] = [
              {
                metal: 'Gold',
                purity: '24K',
                rate: Math.round(gold24KPerGram * 10),   // per 10 grams
                change: Math.round((data.chgXau / TROY_OZ_TO_GRAM) * 10),
                changePercent: parseFloat(data.pcXau.toFixed(2)),
                unit: '10g',
                lastUpdated: now
              },
              {
                metal: 'Gold',
                purity: '22K',
                rate: Math.round(gold22KPerGram * 10),   // per 10 grams
                change: Math.round((data.chgXau / TROY_OZ_TO_GRAM) * (22 / 24) * 10),
                changePercent: parseFloat(data.pcXau.toFixed(2)),
                unit: '10g',
                lastUpdated: now
              },
              {
                metal: 'Gold',
                purity: '18K',
                rate: Math.round(gold18KPerGram * 10),   // per 10 grams
                change: Math.round((data.chgXau / TROY_OZ_TO_GRAM) * (18 / 24) * 10),
                changePercent: parseFloat(data.pcXau.toFixed(2)),
                unit: '10g',
                lastUpdated: now
              }
            ];

            this._goldRates.set(liveRates);
            this._ratesError.set(null);
            console.log('[Shree Radheya Jewellers] ✅ Live rates updated at', now.toLocaleTimeString());
          }
          this._ratesLoading.set(false);
        },
        error: (err) => {
          console.warn('[Shree Radheya Jewellers] ⚠️ Could not fetch live rates, using fallback.', err);
          this._ratesError.set('Using last known rates');
          this._ratesLoading.set(false);
          // Keep existing rates (fallback already set as initial value)
        }
      });
  }

  getProductBySlug(slug: string): Product | undefined {
    return this._products().find(p => p.slug === slug);
  }

  getProductsByCategory(category: string): Product[] {
    return this._products().filter(p => p.category === category);
  }

  getCollectionBySlug(slug: string): Collection | undefined {
    return this._collections().find(c => c.slug === slug);
  }

  getRelatedProducts(product: Product, limit = 4): Product[] {
    return this._products()
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }

  searchProducts(query: string): Product[] {
    const lower = query.toLowerCase();
    return this._products().filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.tags.some(t => t.toLowerCase().includes(lower)) ||
      p.category.toLowerCase().includes(lower)
    );
  }
}

// ─── MOCK DATA ──────────────────────────────────────────────

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'Celestial Kundan Necklace Set', slug: 'celestial-kundan-necklace',
    description: 'A breathtaking kundan necklace set featuring intricate craftsmanship with uncut diamonds set in 22K gold. Each piece tells a story of Indian artistry passed down through generations.',
    shortDescription: 'Exquisite kundan work in 22K gold with uncut diamonds',
    price: 285000, originalPrice: 320000, discount: 11,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    category: 'necklaces', subcategory: 'kundan', metal: 'gold', purity: '22K',
    weight: '45.5g', tags: ['kundan', 'bridal', 'wedding', 'traditional'],
    isFeatured: true, isNew: true, isBestseller: true,
    rating: 4.9, reviewCount: 127, sku: 'SRJ-NK-001',
    availability: 'in-stock', certifications: ['BIS Hallmark', 'IGI Certified'],
    gemstones: [{ name: 'Polki Diamond', carat: '3.2ct', cut: 'Uncut', clarity: 'VS1', color: 'D-F' }]
  },
  {
    id: '2', name: 'Royal Temple Jhumka Earrings', slug: 'royal-temple-jhumka',
    description: 'Inspired by ancient South Indian temple architecture, these stunning jhumka earrings are crafted in 22K gold with delicate filigree work and ruby accents.',
    shortDescription: 'Temple-inspired 22K gold jhumkas with ruby accents',
    price: 78000,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400',
    category: 'earrings', subcategory: 'jhumka', metal: 'gold', purity: '22K',
    weight: '18.3g', tags: ['temple', 'jhumka', 'traditional', 'south-indian'],
    isFeatured: true, isNew: false, isBestseller: true,
    rating: 4.8, reviewCount: 89, sku: 'SRJ-ER-001', availability: 'in-stock',
    certifications: ['BIS Hallmark']
  },
  {
    id: '3', name: 'Eternal Diamond Solitaire Ring', slug: 'eternal-diamond-solitaire',
    description: 'A timeless solitaire ring featuring a brilliant-cut 1.5 carat diamond set in platinum. Perfect for engagements and milestone celebrations.',
    shortDescription: '1.5ct brilliant diamond in platinum setting',
    price: 450000,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    category: 'rings', subcategory: 'solitaire', metal: 'platinum', purity: 'PT950',
    weight: '5.8g', tags: ['diamond', 'solitaire', 'engagement', 'platinum'],
    isFeatured: true, isNew: true, isBestseller: false,
    rating: 5.0, reviewCount: 43, sku: 'SRJ-RG-001', availability: 'made-to-order',
    certifications: ['GIA Certified', 'BIS Hallmark'],
    gemstones: [{ name: 'Diamond', carat: '1.5ct', cut: 'Brilliant Round', clarity: 'VVS1', color: 'D' }]
  },
  {
    id: '4', name: 'Meenakari Rajasthani Bangles', slug: 'meenakari-rajasthani-bangles',
    description: 'Hand-painted meenakari bangles in 22K gold featuring traditional Rajasthani motifs. A set of 4 bangles that celebrate the vibrant art of enamel work.',
    shortDescription: 'Hand-painted enamel bangles in 22K gold (set of 4)',
    price: 165000,
    images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400',
    category: 'bangles', subcategory: 'meenakari', metal: 'gold', purity: '22K',
    weight: '52g', tags: ['meenakari', 'rajasthani', 'bangles', 'traditional'],
    isFeatured: true, isNew: false, isBestseller: true,
    rating: 4.7, reviewCount: 156, sku: 'SRJ-BG-001', availability: 'in-stock',
    certifications: ['BIS Hallmark']
  },
  {
    id: '5', name: 'Navratna Heritage Pendant', slug: 'navratna-heritage-pendant',
    description: 'A magnificent navratna pendant featuring nine precious gemstones set in 18K gold. Each stone represents a celestial body, believed to bring fortune and harmony.',
    shortDescription: 'Nine precious gemstones in 18K gold setting',
    price: 195000,
    images: ['https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=400',
    category: 'pendants', subcategory: 'navratna', metal: 'gold', purity: '18K',
    weight: '12.5g', tags: ['navratna', 'gemstone', 'pendant', 'spiritual'],
    isFeatured: true, isNew: true, isBestseller: false,
    rating: 4.9, reviewCount: 67, sku: 'SRJ-PD-001', availability: 'made-to-order',
    certifications: ['BIS Hallmark', 'Gemstone Certificate']
  },
  {
    id: '6', name: 'Diamond Mangalsutra Modern', slug: 'diamond-mangalsutra-modern',
    description: 'A contemporary take on the traditional mangalsutra, featuring sleek diamond-studded pendant in 18K gold with black bead chain.',
    shortDescription: 'Modern diamond mangalsutra in 18K gold',
    price: 125000, originalPrice: 145000, discount: 14,
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400',
    category: 'mangalsutra', subcategory: 'modern', metal: 'gold', purity: '18K',
    weight: '8.2g', tags: ['mangalsutra', 'diamond', 'modern', 'daily-wear'],
    isFeatured: false, isNew: true, isBestseller: true,
    rating: 4.6, reviewCount: 234, sku: 'SRJ-MS-001', availability: 'in-stock',
    certifications: ['BIS Hallmark']
  },
  {
    id: '7', name: 'Polki Bridal Complete Set', slug: 'polki-bridal-complete-set',
    description: 'A magnificent bridal set featuring necklace, earrings, maang tikka, and bracelet. Crafted with polki diamonds in 22K gold with intricate jadau work.',
    shortDescription: 'Complete bridal set with polki diamonds in 22K gold',
    price: 850000,
    images: ['https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400',
    category: 'bridal-sets', subcategory: 'polki', metal: 'gold', purity: '22K',
    weight: '120g', tags: ['bridal', 'polki', 'wedding', 'complete-set'],
    isFeatured: true, isNew: false, isBestseller: true,
    rating: 5.0, reviewCount: 38, sku: 'SRJ-BS-001', availability: 'made-to-order',
    certifications: ['BIS Hallmark', 'IGI Certified']
  },
  {
    id: '8', name: 'Rose Gold Tennis Bracelet', slug: 'rose-gold-tennis-bracelet',
    description: 'An elegant tennis bracelet featuring a continuous line of round brilliant diamonds set in 18K rose gold. A modern classic for the contemporary woman.',
    shortDescription: 'Diamond tennis bracelet in 18K rose gold',
    price: 210000,
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
    category: 'bracelets', subcategory: 'tennis', metal: 'rose-gold', purity: '18K',
    weight: '15.8g', tags: ['tennis-bracelet', 'diamond', 'rose-gold', 'modern'],
    isFeatured: true, isNew: true, isBestseller: false,
    rating: 4.8, reviewCount: 92, sku: 'SRJ-BR-001', availability: 'in-stock',
    certifications: ['BIS Hallmark', 'GIA Certified'],
    gemstones: [{ name: 'Diamond', carat: '5.0ct total', cut: 'Brilliant Round', clarity: 'VS1', color: 'E-F' }]
  }
];

const MOCK_COLLECTIONS: Collection[] = [
  { id: '1', name: 'Bridal Grandeur', slug: 'bridal-grandeur', description: 'Exquisite bridal jewellery for your most sacred moments', image: 'https://images.unsplash.com/photo-1610173826014-d131b02d69ca?w=600&fit=crop', bannerImage: 'https://images.unsplash.com/photo-1610173826014-d131b02d69ca?w=1400&fit=crop', productCount: 45, isFeatured: true, theme: 'bridal' },
  { id: '2', name: 'Temple Heritage', slug: 'temple-heritage', description: 'Timeless temple jewellery inspired by ancient Indian architecture', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', bannerImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1400', productCount: 32, isFeatured: true, theme: 'traditional' },
  { id: '3', name: 'Modern Luxe', slug: 'modern-luxe', description: 'Contemporary designs for the modern woman who loves elegance', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600', bannerImage: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1400', productCount: 58, isFeatured: true, theme: 'modern' },
  { id: '4', name: 'Diamond Eternity', slug: 'diamond-eternity', description: 'Brilliance that lasts forever — our finest diamond pieces', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600', bannerImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400', productCount: 27, isFeatured: true, theme: 'diamond' },
  { id: '5', name: 'Festive Radiance', slug: 'festive-radiance', description: 'Celebrate every occasion with pieces that sparkle', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600', bannerImage: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1400', productCount: 40, isFeatured: false, theme: 'festive' },
  { id: '6', name: 'Everyday Elegance', slug: 'everyday-elegance', description: 'Lightweight, versatile pieces for daily sophistication', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600', bannerImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1400', productCount: 65, isFeatured: false, theme: 'daily' }
];

// Fallback rates (used if live API is unavailable) — Gold per 10g, Silver per 1kg
const FALLBACK_RATES: GoldRate[] = [
  { metal: 'Gold', purity: '24K', rate: 87150, change: 0, changePercent: 0, unit: '10g', lastUpdated: new Date() },
  { metal: 'Gold', purity: '22K', rate: 79888, change: 0, changePercent: 0, unit: '10g', lastUpdated: new Date() },
  { metal: 'Gold', purity: '18K', rate: 65363, change: 0, changePercent: 0, unit: '10g', lastUpdated: new Date() }
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Priya Sharma', location: 'Mumbai', avatar: '', rating: 5, text: 'My bridal set from Shree Radheya Jewellers was absolutely stunning. The craftsmanship is beyond anything I\'ve seen. Every detail was perfect for my special day.', product: 'Bridal Kundan Set', date: '2025-12' },
  { id: '2', name: 'Ananya Krishnamurthy', location: 'Chennai', avatar: '', rating: 5, text: 'The temple jewellery collection is authentic and beautifully crafted. I received so many compliments at my sister\'s wedding. Truly heirloom quality.', product: 'Temple Necklace Set', date: '2025-11' },
  { id: '3', name: 'Ritu Agarwal', location: 'Delhi', avatar: '', rating: 5, text: 'I ordered a custom engagement ring and the experience was magical. The team understood exactly what I wanted and delivered beyond my expectations.', product: 'Custom Solitaire Ring', date: '2026-01' },
  { id: '4', name: 'Meera Patel', location: 'Ahmedabad', avatar: '', rating: 4, text: 'Beautiful meenakari bangles with vibrant colors. The gold quality is exceptional and the enamel work is flawless. A treasure for my collection.', product: 'Meenakari Bangles', date: '2025-10' }
];

const MOCK_BLOG_POSTS: BlogPost[] = [
  { id: '1', title: 'The Art of Kundan: A Journey Through Time', slug: 'art-of-kundan', excerpt: 'Discover the 2500-year-old craft of Kundan jewellery making and why it remains India\'s most treasured art form.', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', category: 'Heritage', date: '2026-02-05', readTime: '6 min' },
  { id: '2', title: 'Choosing the Perfect Bridal Jewellery', slug: 'perfect-bridal-jewellery', excerpt: 'A comprehensive guide to selecting jewellery that complements your bridal look and becomes a lifelong treasure.', image: 'https://images.unsplash.com/photo-1654764746225-e63f5e90facd?w=600&fit=crop', category: 'Bridal Guide', date: '2026-01-20', readTime: '8 min' },
  { id: '3', title: 'Gold Investment: Beauty That Appreciates', slug: 'gold-investment', excerpt: 'Why Indian gold jewellery is both a stunning adornment and a smart financial investment for generations.', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600', category: 'Investment', date: '2026-01-10', readTime: '5 min' }
];
