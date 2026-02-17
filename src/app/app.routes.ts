import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Sree Radheya Jewellers — Exquisite Indian Jewellery'
  },
  {
    path: 'collections',
    loadComponent: () => import('./pages/collections/collections').then(m => m.CollectionsComponent),
    title: 'Collections — Sree Radheya Jewellers'
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetailComponent),
    title: 'Product — Sree Radheya Jewellers'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    title: 'Our Story — Sree Radheya Jewellers'
  },
  {
    path: 'custom-jewellery',
    loadComponent: () => import('./pages/custom-jewellery/custom-jewellery').then(m => m.CustomJewelleryComponent),
    title: 'Custom Jewellery — Sree Radheya Jewellers'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
    title: 'Contact Us — Sree Radheya Jewellers'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartComponent),
    title: 'Your Interests — Sree Radheya Jewellers'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent),
    title: 'Send Inquiry — Sree Radheya Jewellers'
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicyComponent),
    title: 'Privacy Policy — Sree Radheya Jewellers'
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./pages/terms-of-service/terms-of-service').then(m => m.TermsOfServiceComponent),
    title: 'Terms of Service — Sree Radheya Jewellers'
  },
  {
    path: 'shipping-policy',
    loadComponent: () => import('./pages/shipping-policy/shipping-policy').then(m => m.ShippingPolicyComponent),
    title: 'Shipping Policy — Sree Radheya Jewellers'
  },
  {
    path: 'refund-policy',
    loadComponent: () => import('./pages/refund-policy/refund-policy').then(m => m.RefundPolicyComponent),
    title: 'Refund Policy — Sree Radheya Jewellers'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
