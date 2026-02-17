import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './refund-policy.html',
  styleUrl: './refund-policy.scss'
})
export class RefundPolicyComponent {
  lastUpdated = 'February 1, 2026';
}
