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
    { year: '2025', title: 'The Spark', description: 'The idea for Sree Radheya Jewellers took shape — a vision to make pure, beautifully crafted Indian jewellery accessible and transparent for the modern customer.' },
    { year: '2025', title: 'Planning & Preparation', description: 'Spent months curating designs, partnering with skilled artisans, and building the foundation for a jewellery brand rooted in trust and quality.' },
    { year: '2026', title: 'Grand Launch', description: 'Sree Radheya Jewellers officially launched in Hyderabad with our debut collection of BIS hallmarked, handcrafted gold and diamond jewellery.' },
    { year: '2026', title: 'Growing Together', description: 'Building a community of happy customers who value purity, transparency, and modern Indian design — one beautiful piece at a time.' }
  ];

  values = [
    { icon: '◈', title: 'Purity Guaranteed', description: 'Every piece is BIS hallmarked and certified, ensuring the highest standards of gold and diamond purity.' },
    { icon: '✦', title: 'Master Craftsmanship', description: 'Our artisans carry forward centuries-old techniques, hand-finishing every piece with meticulous care and devotion.' },
    { icon: '❖', title: 'Honest & Transparent', description: 'No hidden charges, no inflated pricing. We believe in complete transparency — from sourcing to billing — earning your trust from day one.' }
  ];

  stats = [
    { number: '100%', label: 'BIS Hallmarked' },
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Skilled Artisans' },
    { number: '1000+', label: 'Unique Designs' }
  ];

  setTimelineIndex(index: number): void {
    this.activeTimelineIndex.set(index);
  }
}
