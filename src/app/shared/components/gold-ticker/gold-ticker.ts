import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-gold-ticker',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  template: `
    <div class="ticker-bar">
      <div class="ticker-label">
        <span class="ticker-dot" [class.loading]="productService.ratesLoading()"></span>
        LIVE RATES
        @if (productService.goldRates()[0]; as firstRate) {
          <span class="ticker-time">{{ firstRate.lastUpdated | date:'shortTime' }}</span>
        }
      </div>
      <div class="ticker-track">
        <div class="ticker-content">
          @for (rate of productService.goldRates(); track rate.purity) {
            <span class="ticker-item">
              <span class="ticker-metal">{{ rate.metal }} {{ rate.purity }}</span>
              <span class="ticker-rate">₹{{ rate.rate | number:'1.0-0' }}/{{ rate.unit }}</span>
              <span class="ticker-change" [class.positive]="rate.change > 0" [class.negative]="rate.change < 0">
                {{ rate.change > 0 ? '▲' : '▼' }} {{ rate.changePercent > 0 ? '+' : '' }}{{ rate.changePercent }}%
              </span>
            </span>
          }
          <!-- Duplicate for seamless scroll -->
          @for (rate of productService.goldRates(); track rate.purity) {
            <span class="ticker-item">
              <span class="ticker-metal">{{ rate.metal }} {{ rate.purity }}</span>
              <span class="ticker-rate">₹{{ rate.rate | number:'1.0-0' }}/{{ rate.unit }}</span>
              <span class="ticker-change" [class.positive]="rate.change > 0" [class.negative]="rate.change < 0">
                {{ rate.change > 0 ? '▲' : '▼' }} {{ rate.changePercent > 0 ? '+' : '' }}{{ rate.changePercent }}%
              </span>
            </span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticker-bar {
      display: flex;
      align-items: center;
      background: var(--neutral-900);
      border-top: 1px solid rgba(107,21,48,0.15);
      overflow: hidden;
      height: 38px;
    }

    .ticker-label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 var(--space-5);
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      color: var(--cream-300);
      white-space: nowrap;
      background: var(--bg-dark);
      height: 100%;
      border-right: 1px solid rgba(107,21,48,0.15);
      z-index: 1;
    }

    .ticker-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
      animation: pulse 2s infinite;

      &.loading {
        background: #facc15;
        animation: pulse 0.5s infinite;
      }
    }

    .ticker-time {
      font-size: 0.55rem;
      color: var(--neutral-500);
      letter-spacing: 0.05em;
    }

    .ticker-track {
      flex: 1;
      overflow: hidden;
    }

    .ticker-content {
      display: flex;
      gap: var(--space-7);
      animation: tickerScroll 30s linear infinite;
      white-space: nowrap;
      padding: 0 var(--space-4);
    }

    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      font-size: 0.75rem;
    }

    .ticker-metal {
      color: var(--neutral-400);
      font-weight: 500;
    }

    .ticker-rate {
      color: var(--text-on-dark);
      font-weight: 600;
    }

    .ticker-change {
      font-size: 0.6875rem;
      font-weight: 500;

      &.positive { color: #4ade80; }
      &.negative { color: #f87171; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `]
})
export class GoldTickerComponent {
  constructor(public productService: ProductService) {}
}
