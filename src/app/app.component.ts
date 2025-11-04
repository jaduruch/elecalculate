import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BouncingLogo {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  element: HTMLElement | null;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  logos: BouncingLogo[] = [
    {
      x: 0,
      y: 0,
      velocityX: 3,
      velocityY: 3,
      element: null
    },
    {
      x: window.innerWidth - 120,
      y: window.innerHeight - 120,
      velocityX: -2.5,
      velocityY: -2.5,
      element: null
    }
  ];

  ngOnInit() {
    this.logos[0].element = document.querySelector(
      '.logo-elecalculate'
    ) as HTMLElement;
    this.logos[1].element = document.querySelector(
      '.logo-angular'
    ) as HTMLElement;
    this.animate();
  }

  animate() {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;

    this.logos.forEach((logo) => {
      if (!logo.element) return;

      logo.x += logo.velocityX;
      logo.y += logo.velocityY;

      if (logo.x <= 0 || logo.x >= maxX) {
        logo.velocityX *= -1;
      }
      if (logo.y <= 0 || logo.y >= maxY) {
        logo.velocityY *= -1;
      }

      logo.x = Math.max(0, Math.min(logo.x, maxX));
      logo.y = Math.max(0, Math.min(logo.y, maxY));

      logo.element.style.left = logo.x + 'px';
      logo.element.style.top = logo.y + 'px';
    });

    requestAnimationFrame(() => this.animate());
  }
}