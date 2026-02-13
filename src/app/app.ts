import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { CartSidebarComponent } from './shared/components/cart-sidebar/cart-sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartSidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
