import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor() {
    emailjs.init(environment.emailJs.publicKey);
  }

  sendContactEmail(formData: ContactFormData): Promise<void> {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
    };

    return emailjs
      .send(environment.emailJs.serviceId, environment.emailJs.templateId, templateParams)
      .then(() => void 0);
  }
}
