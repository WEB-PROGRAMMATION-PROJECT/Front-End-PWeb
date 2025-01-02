import { register } from 'swiper/element/bundle';
register(); // Ajoutez ceci au début du fichier

import { ScrollTrigger } from 'gsap/ScrollTrigger';



import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUser, faShoppingBag, faBars } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'swiper';

// Remplacez par
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger);

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition(':enter', [
        animate('0.6s ease-out')
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class HomeHeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('navbarContent') navbarContent!: ElementRef;

  faSearch = faSearch;
  faUser = faUser;
  faShoppingBag = faShoppingBag;
  faBars = faBars;

  isMenuOpen = false;
  isScrolled = false;
  currentSlideIndex = 0;
  swiperConfig = {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return `<span class="${className}"><span class="bullet-progress"></span></span>`;
      }
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  };

  heroSlides = [
    {
      image: 'slide1.jpg',
      title: 'La Mode Redéfinie',
      subtitle: 'Collection Exclusive 2024',
      description: 'Des créations uniques qui racontent votre histoire'
    },
    {
      image: 'slide3.jpg',
      title: 'L\'Art du Sur-Mesure',
      subtitle: 'Expertise Artisanale',
      description: 'Chaque détail compte, chaque pièce est unique'
    },
    {
      image: 'slide2.jpg',
      title: 'Élégance Intemporelle',
      subtitle: 'Nouvelle Collection',
      description: 'L\'alliance parfaite entre tradition et modernité'
    }
  ];

  private swiper: any;

  constructor() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  ngOnInit() {
    this.initializeAnimations();
  }

  ngAfterViewInit() {
    this.initializeSwiper();
    this.initializeScrollAnimations();

  }

  private initializeSwiper() {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className}"><span class="bullet-progress"></span></span>`;
        }
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      on: {
        slideChange: () => {
          this.currentSlideIndex = this.swiper.realIndex;
          this.animateSlideContent();
        }
      }
    });
  }

  private initializeAnimations() {
    gsap.from('.nav-content', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }

  private initializeScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    timeline.to('.hero-section', {
      y: '50%',
      opacity: 0.5
    });
  }

  private animateSlideContent() {
    gsap.from('.slide-content-inner', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      gsap.from('#mobile-menu', {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }
}
