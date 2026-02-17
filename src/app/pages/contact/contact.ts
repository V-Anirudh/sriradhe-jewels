import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  formData = signal({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  isSubmitting = signal(false);
  submitted = signal(false);

  subjects = [
    'General Inquiry',
    'Product Information',
    'Custom Order',
    'After-Sales Service',
    'Feedback',
    'Other'
  ];

  storeInfo = {
    address: '1-18-4/2 Plot No 6, Dr. AS Rao Nagar',
    city: 'Hyderabad',
    phone: '+91 9010800400',
    mobile: '+91 9010800400',
    email: 'Connect@sreeradheyajewellers.com',
    hours: [
      { days: 'Monday – Saturday', time: '10:00 AM – 8:00 PM' },
      { days: 'Sunday', time: '11:00 AM – 6:00 PM' },
      { days: 'Public Holidays', time: 'Closed' }
    ]
  };

  updateField(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  submitForm(): void {
    this.isSubmitting.set(true);
    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);
      this.formData.set({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  }
}
