

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  menuOpen = false;
  submenuOpen: { [key: string]: boolean } = {};

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.submenuOpen = {};
    }
  }

  toggleSubmenu(key: string, event: Event) {
    event.preventDefault();
    this.submenuOpen[key] = !this.submenuOpen[key];
  }

  closeMenu() {
    this.menuOpen = false;
    this.submenuOpen = {};
  }
}
