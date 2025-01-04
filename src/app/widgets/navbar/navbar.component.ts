import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  faSearch,
  faUser,
  faShoppingBag,
  faBars,
  faHeart,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import {CategoryService} from '../../services/category.service';

interface Category {
  name: string;
  href: string;
  image?: string;
  description?: string;
}

interface MenuItem {
  name: string;
  href: string;
  categories?: Category[];
  featured?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faUser = faUser;
  faShoppingBag = faShoppingBag;
  faBars = faBars;
  faHeart = faHeart;
  faBell = faBell;

  isFixed: boolean = false;
  isSearchActive: boolean = false;
  isMobileMenuOpen: boolean = false;
  lastScrollPosition: number = 0;
  hideNav: boolean = false;

  menuItems: MenuItem[] = [
    {
      name: 'Collections',
      href: '#',
      categories: [
        { name: 'Nouvelle Collection', href: '#', image: '/assets/new-collection.jpg', description: 'Découvrez nos dernières créations' },
        { name: 'Bestsellers', href: '#', image: '/assets/bestsellers.jpg', description: 'Nos pièces les plus populaires' },
        { name: 'Collection Limitée', href: '#', image: '/assets/limited.jpg', description: 'Éditions exclusives' },
        { name: 'Classiques', href: '#', image: '/assets/classics.jpg', description: 'Intemporels' }
      ],
      featured: {
        title: 'Collection Automne 2024',
        description: 'Découvrez notre nouvelle collection exclusive',
        image: '/assets/featured-collection.jpg',
        link: '#'
      }
    },
    {
      name: 'Catégories',
      href: '#',
      categories: [
      // les catégories seront chargées dynamiquement
      ]
    },
    {
      name: 'Stylistes',
      href: '/stylistes',

    },
    { name: 'Mensurations', href: '/mensurations' }
  ];
  categories: Category[] = [];

  constructor(private el: ElementRef, private categoryService: CategoryService) {}

  ngOnInit() {
    this.initAnimations();
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        this.menuItems.find((item) => item.name === 'Catégories')!.categories = this.categories;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }



  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset;

    // Always fix navbar after certain scroll position
    this.isFixed = currentScroll > 50;

    // Hide/show navbar based on scroll direction
    if (currentScroll > this.lastScrollPosition && currentScroll > 500) {
      this.hideNav = true;
    } else {
      this.hideNav = false;
    }

    this.lastScrollPosition = currentScroll;

    // Animate background opacity based on scroll
    if (this.isFixed) {
      const opacity = Math.min(currentScroll / 200, 0.98);
      gsap.to('.navbar_fox', {
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        backdropFilter: `blur(${opacity * 10}px)`,
        duration: 0.2
      });
    }
  }


  private initAnimations() {
    gsap.from('.navbar_fox', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.navbar__logo_fox', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'back.out(1.7)'
    });

    gsap.from('.navbar__item_fox', {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.5
    });
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
    if (this.isSearchActive) {
      gsap.from('.navbar__search-input_fox', {
        width: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });

      setTimeout(() => {
        const searchInput = this.el.nativeElement.querySelector('.navbar__search-input_fox') as HTMLElement;
        searchInput?.focus();
      }, 100);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      gsap.from('.navbar__mobile-menu_fox', {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }
}
