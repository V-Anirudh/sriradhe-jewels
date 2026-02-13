import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class CheckoutComponent {
  constructor(public cartService: CartService) {}

  inquirySubmitted = signal(false);
  inquiryRef = signal('');

  inquiryMode = signal<'video-call' | 'visit-store'>('visit-store');

  inquiryForm = signal({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  items = computed(() => this.cartService.items());

  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu & Kashmir', 'Ladakh'
  ];

  updateField(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
    this.inquiryForm.update(data => ({ ...data, [field]: value }));
  }

  submitInquiry(event: Event): void {
    event.preventDefault();
    const form = this.inquiryForm();
    if (!form.fullName || !form.phone) return;

    const ref = new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
    this.inquiryRef.set(ref);

    console.log('[Shree Radheya Jewellers] Inquiry submitted:', {
      ...form,
      inquiryMode: this.inquiryMode(),
      pieces: this.items().map(i => ({ name: i.product.name, sku: i.product.sku })),
      ref
    });

    this.inquirySubmitted.set(true);
    this.cartService.clearCart();
  }
}
