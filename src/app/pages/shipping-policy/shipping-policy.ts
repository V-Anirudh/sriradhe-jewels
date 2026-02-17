import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shipping-policy.html',
  styleUrl: './shipping-policy.scss'
})
export class ShippingPolicyComponent {
  lastUpdated = 'February 1, 2026';
}
