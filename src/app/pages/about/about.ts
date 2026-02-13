import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  activeTimelineIndex = signal(0);

  timeline = [
    { year: '1965', title: 'The Beginning', description: 'Shree Radheya Jewellers was founded in the heart of Hyderabad with a humble workshop and an unwavering passion for fine jewellery.' },
    { year: '1982', title: 'First Showroom', description: 'Opened our first flagship showroom in Hyderabad, bringing our exquisite designs directly to discerning customers who value tradition and craftsmanship.' },
    { year: '1998', title: 'National Recognition', description: 'Received the National Award for Excellence in Jewellery Design, cementing our reputation as one of India\'s finest jewellery houses.' },
    { year: '2010', title: 'Heritage Collection', description: 'Launched the Heritage Collection, reviving ancient Mughal and Rajasthani jewellery-making techniques passed down through generations.' },
    { year: '2020', title: 'Digital Presence', description: 'Expanded online to bring the Shree Radheya Jewellers experience to customers worldwide, blending tradition with modern convenience.' },
    { year: '2025', title: 'A New Era', description: 'Celebrating 60 years of trust, craftsmanship, and timeless beauty with over 50,000 happy customers across the globe.' }
  ];

  values = [
    { icon: '◈', title: 'Purity Guaranteed', description: 'Every piece is BIS hallmarked and certified, ensuring the highest standards of gold and diamond purity.' },
    { icon: '✦', title: 'Master Craftsmanship', description: 'Our artisans carry forward centuries-old techniques, hand-finishing every piece with meticulous care and devotion.' },
    { icon: '❖', title: 'Unshakable Trust', description: 'Three generations of transparent pricing, ethical sourcing, and lifetime exchange policies that our customers rely on.' }
  ];

  stats = [
    { number: '60+', label: 'Years of Heritage' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '200+', label: 'Master Artisans' },
    { number: '15K+', label: 'Unique Designs' }
  ];

  artisans = [
    { name: 'Ramesh Soni', specialty: 'Kundan & Polki', experience: '35 years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Suresh Verma', specialty: 'Meenakari Enamel', experience: '28 years', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
    { name: 'Lakshmi Devi', specialty: 'Temple Jewellery', experience: '22 years', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop' }
  ];

  setTimelineIndex(index: number): void {
    this.activeTimelineIndex.set(index);
  }
}
