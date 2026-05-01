import { Component, inject, signal } from '@angular/core';
import { EmailService } from '../../core/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  private readonly emailService = inject(EmailService);

  formData = signal({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  isSubmitting = signal(false);
  submitted = signal(false);
  errorMessage = signal('');

  subjects = [
    'General Inquiry',
    'Product Information',
    'Custom Order',
    'After-Sales Service',
    'Feedback',
    'Other'
  ];

  storeInfo = {
    address: '2 Plot, 1-18-4, T Nagar Colony Road No. 1, A. S. Rao Nagar, Hyderabad, Secunderabad, Telangana 500062, India',
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

  async submitForm(): Promise<void> {
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      await this.emailService.sendContactEmail(this.formData());
      this.submitted.set(true);
      this.formData.set({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      this.errorMessage.set('Failed to send message. Please try again or email us directly.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
