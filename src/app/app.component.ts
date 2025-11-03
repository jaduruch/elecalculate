import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  logoX: number = 0;
  logoY: number = 0;
  velocityX: number = 3;
  velocityY: number = 3;

  ngOnInit() {
    this.animate();
  }

  animate() {
    const logo = document.querySelector('.logo') as HTMLElement;
    if (!logo) return;

    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;

    this.logoX += this.velocityX;
    this.logoY += this.velocityY;

    if (this.logoX <= 0 || this.logoX >= maxX) {
      this.velocityX *= -1;
    }
    if (this.logoY <= 0 || this.logoY >= maxY) {
      this.velocityY *= -1;
    }

    this.logoX = Math.max(0, Math.min(this.logoX, maxX));
    this.logoY = Math.max(0, Math.min(this.logoY, maxY));

    logo.style.left = this.logoX + 'px';
    logo.style.top = this.logoY + 'px';

    requestAnimationFrame(() => this.animate());
  }
}