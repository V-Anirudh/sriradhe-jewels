import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-custom-jewellery',
  standalone: true,
  imports: [],
  templateUrl: './custom-jewellery.html',
  styleUrl: './custom-jewellery.scss'
})
export class CustomJewelleryComponent {
  formData = signal({
    name: '',
    email: '',
    phone: '',
    jewelleryType: '',
    metalPreference: '',
    budgetRange: '',
    description: ''
  });

  isSubmitting = signal(false);
  submitted = signal(false);

  steps = [
    { number: '01', icon: '✦', title: 'Inspiration', description: 'Share your vision, sketches, or reference images. Our designers will understand your dream piece.' },
    { number: '02', icon: '◈', title: 'Design', description: 'Our master designers create detailed CAD renders and hand-drawn sketches for your approval.' },
    { number: '03', icon: '❖', title: 'Craft', description: 'Expert artisans bring the design to life using traditional techniques and the finest materials.' },
    { number: '04', icon: '✧', title: 'Delivery', description: 'Your bespoke masterpiece is hallmarked, certified, and delivered in premium packaging.' }
  ];

  jewelleryTypes = [
    'Necklace', 'Earrings', 'Ring', 'Bangles', 'Bracelet',
    'Pendant', 'Mangalsutra', 'Bridal Set', 'Anklet', 'Other'
  ];

  metalPreferences = [
    '22K Yellow Gold', '18K Gold', 'Rose Gold', 'Platinum',
    'White Gold', 'Gold with Diamonds', 'Gold with Gemstones'
  ];

  budgetRanges = [
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000 – ₹10,00,000',
    '₹10,00,000+'
  ];

  inspirationGallery = [
    { image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop', label: 'Bridal Necklace' },
    { image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=500&fit=crop', label: 'Kundan Set' },
    { image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', label: 'Diamond Ring' },
    { image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', label: 'Gold Bangles' },
    { image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', label: 'Polki Earrings' },
    { image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=500&fit=crop', label: 'Temple Jewellery' }
  ];

  updateField(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  submitForm(): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);
      this.formData.set({
        name: '', email: '', phone: '', jewelleryType: '',
        metalPreference: '', budgetRange: '', description: ''
      });
    }, 1500);
  }
}
