import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxStarsModule } from 'ngx-stars';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import des modules FullCalendar dans ton composant
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-styliste-profile',
  templateUrl: './styliste-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    FullCalendarModule,
    NgxStarsModule,
    FormsModule
  ],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('reviewAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  styleUrl:'styliste-profile.component.css',
})
export class StylisteProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  styliste = {
    nom: 'Marie Dubois',
    titre: 'Styliste Haute Couture',
    photoUrl: 'profileStyliste.jpg',
    coverUrl: 'coverStyliste.jpg',
    specialites: ['Robes de soirée', 'Haute couture', 'Tenues sur mesure'],
    stats: {
      creations: 124,
      clients: 1200,
      note: 4.8
    },
    reseauxSociaux: {
      instagram: 'mariedubois_couture',
      pinterest: 'mariedubois_style'
    },
    creations: {},
  };

  isOnline = true;
  isFollowing = false;
  activeTab = 'creations';
  selectedDate: Date | null = null;
  selectedTimeSlot: string | null = null;
  searchTerm = '';
  selectedCategory: string | null = null;

  tabs = [
    { id: 'creations', label: 'Créations' },
    { id: 'avis', label: 'Avis' },
    { id: 'calendar', label: 'Disponibilités' }
  ];

  categories = [
    'Toutes',
    'Robes de soirée',
    'Tenues traditionnelles',
    'Haute couture',
    'Prêt-à-porter'
  ];

  creations = [
    {
      id: 1,
      nom: 'Robe de Soirée Émeraude',
      prix: 1200,
      description: 'Élégante robe de soirée en soie avec broderies artisanales',
      images: ['dress3.webp','dress1.jpg'],
      categorie: 'Robes de soirée',
      materiaux: ['Soie', 'Dentelle', 'Perles'],
      delaiConfection: 15,
      disponible: true
    },
    // Ajoutez plus de créations ici
  ];

  avis = [
    {
      id: 1,
      clientNom: 'Sophie Martin',
      clientPhoto: 'profileStyliste.jpg',
      note: 5,
      commentaire: 'Une expérience exceptionnelle ! Marie a parfaitement compris ma vision.',
      date: new Date(),
      photos: ['profileStyliste.jpg'],
      creation : this.creations[0],
    },
    // Ajoutez plus d'avis ici
  ];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    events: [
      {
        title: 'Disponible',
        start: new Date(),
        backgroundColor: '#4CAF50'
      }
      // Ajoutez plus d'événements ici
    ],
    eventClick: this.handleDateClick.bind(this),
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  };

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    this.initializeAnimations();

    this.initializeScrollAnimations();
  }

  private initializeAnimations() {
    gsap.from(this.profileContainer.nativeElement.querySelector('.profile-cover'), {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'});

    gsap.from(this.profileContainer.nativeElement.querySelector('.profile-info'), {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });
  }

  private initializeScrollAnimations() {
    ScrollTrigger.batch('.creation-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
        });
      },
      start: 'top bottom-=100px'
    });
  }

  availableTimeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  get filteredCreations() {
    return this.creations.filter(creation => {
      const matchesSearch = creation.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        creation.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory ||
        this.selectedCategory === 'Toutes' ||
        creation.categorie === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  get statsArray() {
    return [
      { value: this.styliste.stats.creations, label: 'Créations' },
      { value: this.styliste.stats.clients, label: 'Clients' },
      { value: this.styliste.stats.note, label: 'Note moyenne' }
    ];
  }

  get ratingDistribution() {
    // Simuler la distribution des notes
    return [
      { stars: 5, percentage: 70 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 }
    ];
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.animateTabContent();
  }

  animateTabContent() {
    const content = this.profileContainer.nativeElement.querySelector('.tab-content');
    gsap.from(content, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.animateFilteredResults();
  }

  animateFilteredResults() {
    gsap.from('.creation-card', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  openCreationDetails(creation: any) {
    // Animation de zoom avant d'ouvrir le modal
    gsap.to(`.creation-card[data-id="${creation.id}"]`, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        // Réinitialiser l'échelle après l'animation
        gsap.set(`.creation-card[data-id="${creation.id}"]`, { scale: 1 });
        // Logique d'ouverture du modal ici
      }
    });
  }

  handleDateClick(info: any) {
    this.selectedDate = info.event.start;
    this.selectedTimeSlot = null;
    this.animateCalendarSelection();
  }

  animateCalendarSelection() {
    gsap.from('.booking-info', {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  selectTimeSlot(slot: string) {
    this.selectedTimeSlot = slot;
    // Animation de sélection
    gsap.to(`.time-slots button[data-time="${slot}"]`, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  }

  calculateRatingCircle() {
    const rating = this.styliste.stats.note;
    const maxRating = 5;
    const circumference = 2 * Math.PI * 54; // rayon du cercle = 54
    return circumference - (circumference * rating) / maxRating;
  }

  openContactModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      backdropClass: 'modal-backdrop-blur'
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  submitContact() {
    if (this.contactForm.valid) {
      // Animation de soumission
      gsap.to('.btn-send', {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Logique d'envoi ici
          this.closeModal();
          // Réinitialiser le formulaire
          this.contactForm.reset();
        }
      });
    }
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
    // Animation du bouton
    gsap.to('.btn-follow', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  }

  onCardHover(creationId: number) {
    gsap.to(`.creation-card[data-id="${creationId}"] .card-overlay`, {
      opacity: 1,
      duration: 0.3
    });
  }

  onCardLeave(creationId: number) {
    gsap.to(`.creation-card[data-id="${creationId}"] .card-overlay`, {
      opacity: 0,
      duration: 0.3
    });
  }

  openPhotoGallery(photos: string[]) {
    // Animation d'ouverture de la galerie
    gsap.to('.gallery-overlay', {
      opacity: 1,
      visibility: 'visible',
      duration: 0.3
    });
  }
}
