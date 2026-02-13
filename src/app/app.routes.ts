import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Shree Radheya Jewellers — Exquisite Indian Jewellery'
  },
  {
    path: 'collections',
    loadComponent: () => import('./pages/collections/collections').then(m => m.CollectionsComponent),
    title: 'Collections — Shree Radheya Jewellers'
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetailComponent),
    title: 'Product — Shree Radheya Jewellers'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    title: 'Our Story — Shree Radheya Jewellers'
  },
  {
    path: 'custom-jewellery',
    loadComponent: () => import('./pages/custom-jewellery/custom-jewellery').then(m => m.CustomJewelleryComponent),
    title: 'Custom Jewellery — Shree Radheya Jewellers'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
    title: 'Contact Us — Shree Radheya Jewellers'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartComponent),
    title: 'Your Interests — Shree Radheya Jewellers'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent),
    title: 'Send Inquiry — Shree Radheya Jewellers'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
