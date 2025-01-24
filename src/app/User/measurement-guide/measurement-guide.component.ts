import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { MensurationService } from '../../services/mensuration/mensuration.service';
interface MeasurementStep {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tips: string[];
  controlName: string;
  unit: string;
  minValue?: number;
  maxValue?: number;
  value:number;
}

@Component({
  selector: 'app-measurement-guide',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './measurement-guide.component.html',
  styleUrls: ['./measurement-guide.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MeasurementGuideComponent implements OnInit {
  currentStep = 0;
  searchQuery = new FormControl('');
  measurementForm: FormGroup;

  measurementSteps: MeasurementStep[] = [
    {
      id: 'chest',
      title: 'Tour de Poitrine',
      description: 'Mesurez horizontalement autour de la partie la plus forte de la poitrine.',
      imageUrl: 'measure.jpg',
      tips: [
        'Gardez le mètre ruban parallèle au sol',
        'Ne serrez pas trop le mètre ruban',
        'Respirez normalement pendant la mesure'
      ],
      controlName: 'chestCircumference',
      unit: 'cm',
      minValue: 60,
      maxValue: 160,
      value: 0,
    },
    {
      id: 'waist',
      title: 'Tour de Taille',
      description: 'Mesurez la circonférence naturelle de votre taille.',
      imageUrl: 'measure.jpg',
      tips: [
        'Mesurez au niveau le plus étroit de la taille',
        'Évitez de rentrer le ventre',
        'Le mètre doit être bien horizontal'
      ],
      controlName: 'waistCircumference',
      unit: 'cm',
      minValue: 50,
      maxValue: 150,
      value: 0,
    },
    {
      id: 'hip',
      title: 'Tour de Hanches',
      description: 'Mesurez autour de la partie la plus forte des hanches.',
      imageUrl: 'measure.jpg',
      tips: [
        'Mesurez à l\'endroit le plus large des hanches',
        'Gardez les pieds joints',
        'Assurez-vous que le mètre est bien horizontal'
      ],
      controlName: 'hipCircumference',
      unit: 'cm',
      minValue: 70,
      maxValue: 170,
      value: 0,
    },
    {
      id: 'totalHeight',
      title: 'Hauteur Totale',
      description: 'Mesurez votre taille depuis le sommet de la tête jusqu’à la plante des pieds.',
      imageUrl: 'measure.jpg',
      tips: [
        'Tenez-vous droit contre un mur',
        'Assurez-vous que vos talons touchent le mur',
        'Utilisez un livre pour marquer la hauteur'
      ],
      controlName: 'totalHeight',
      unit: 'cm',
      minValue: 100,
      maxValue: 220,
      value: 0,
    },
    {
      id: 'armLength',
      title: 'Longueur des Bras',
      description: 'Mesurez depuis l’épaule jusqu’au poignet.',
      imageUrl: 'measure.jpg',
      tips: [
        'Tenez votre bras tendu à un angle de 90 degrés',
        'Mesurez depuis l’extrémité de l’épaule jusqu’au poignet'
      ],
      controlName: 'armLength',
      unit: 'cm',
      minValue: 40,
      maxValue: 80,
      value: 0,
    },
    {
      id: 'neckCircumference',
      title: 'Tour de Cou',
      description: 'Mesurez autour de la base du cou.',
      imageUrl: 'measure.jpg',
      tips: [
        'Ne serrez pas trop le mètre ruban',
        'Mesurez à l’endroit le plus large'
      ],
      controlName: 'neckCircumference',
      unit: 'cm',
      minValue: 30,
      maxValue: 50,
      value: 0,
    },
    {
      id: 'backWidth',
      title: 'Largeur du Dos',
      description: 'Mesurez d’une épaule à l’autre, à l’arrière.',
      imageUrl: 'measure.jpg',
      tips: [
        'Mesurez sur la partie la plus large du dos',
        'Assurez-vous que le mètre ruban est bien tendu'
      ],
      controlName: 'backWidth',
      unit: 'cm',
      minValue: 30,
      maxValue: 60,
      value: 0,
    },
    {
      id: 'legLength',
      title: 'Longueur de la Jambe',
      description: 'Mesurez depuis le haut de la cuisse jusqu’à la cheville.',
      imageUrl: 'measure.jpg',
      tips: [
        'Mesurez avec la jambe légèrement fléchie',
        'Assurez-vous que le mètre ruban est bien tendu'
      ],
      controlName: 'legLength',
      unit: 'cm',
      minValue: 60,
      maxValue: 120,
      value: 0,
    },
    {
      id: 'thighCircumference',
      title: 'Tour de Cuisse',
      description: 'Mesurez autour de la partie la plus large de la cuisse.',
      imageUrl: 'measure.jpg',
      tips: [
        'Tenez-vous droit',
        'Assurez-vous que le mètre ruban est bien horizontal'
      ],
      controlName: 'thighCircumference',
      unit: 'cm',
      minValue: 40,
      maxValue: 100,
      value: 0,
    },
    {
      id: 'ankleCircumference',
      title: 'Tour de Cheville',
      description: 'Mesurez autour de la cheville, au niveau de l’os.',
      imageUrl: 'measure.jpg',
      tips: [
        'Assurez-vous que le mètre est bien ajusté',
        'Ne serrez pas trop'
      ],
      controlName: 'ankleCircumference',
      unit: 'cm',
      minValue: 15,
      maxValue: 35,
      value: 0,
    },
    {
      id: 'wristCircumference',
      title: 'Tour de Poignet',
      description: 'Mesurez autour du poignet, juste en dessous de la main.',
      imageUrl: 'measure.jpg',
      tips: [
        'Mesurez sur l’os du poignet',
        'Gardez le mètre ruban bien ajusté'
      ],
      controlName: 'wristCircumference',
      unit: 'cm',
      minValue: 10,
      maxValue: 25,
      value: 0,
    },
    {
      id: 'chestWidth',
      title: 'Largeur de Poitrine',
      description: 'Mesurez d’un côté à l’autre de la poitrine, au niveau des pectoraux.',
      imageUrl: 'measure.jpg',
      tips: [
        'Tenez-vous droit',
        'Assurez-vous que le mètre est bien horizontal'
      ],
      controlName: 'chestWidth',
      unit: 'cm',
      minValue: 20,
      maxValue: 60,
      value: 0,
    },
    {
      id: 'clavicleLength',
      title: 'Longueur de Clavicule',
      description: 'Mesurez d’une épaule à l’autre en suivant la clavicule.',
      imageUrl: 'measure.jpg',
      tips: [
        'Suivez la courbe naturelle de la clavicule',
        'Gardez le mètre ruban bien tendu'
      ],
      controlName: 'clavicleLength',
      unit: 'cm',
      minValue: 15,
      maxValue: 40,
      value: 0,
    }
  ];
  

  constructor(private fb: FormBuilder, private apiService: MensurationService) {
    this.measurementForm = this.fb.group({
      searchQuery: [''],
      ...this.createFormControls()
    });
  }
  private getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id;
  }

  ngOnInit(): void {
    this.searchQuery.valueChanges.subscribe(query => {
      if (query) {
        this.filterMeasurements(query);
      }
    });
  }

  private createFormControls() {
    const controls: any = {};
    this.measurementSteps.forEach(step => {
      controls[step.controlName] = ['', [
        Validators.required,
        Validators.min(step.minValue || 0),
        Validators.max(step.maxValue || 999)
      ]];
    });
    return controls;
  }

  filterMeasurements(query: string): void {
    const index = this.measurementSteps.findIndex(step =>
      step.title.toLowerCase().includes(query.toLowerCase())
    );
    if (index !== -1) {
      this.currentStep = index;
    }
  }
  measurements: any = {};
  nextStep(): void {
    if (this.currentStep < this.measurementSteps.length ) {
      console.log("current step",this.currentStep);
      this.measurementSteps[this.currentStep].value = this.measurementForm.get(this.measurementSteps[0].controlName).value;
      console.log("valeur du champ ",this.measurementSteps[this.currentStep].value);
      console.log("valeur du form",this.measurementForm.value);

      const controlName = this.measurementSteps[this.currentStep].controlName;
      const value = this.measurementForm.get(controlName)?.value;
      this.measurements[controlName] = this.measurementSteps[this.currentStep].value ;

      this.currentStep++

    }
    console.log(this.measurements);
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  saveMeasurements(): void {
    try {
      const userId = this.getUserId();
      const formattedData = {
        tour_poitrine: this.measurementForm.get('chestCircumference')?.value || null,  // Directement depuis le formulaire
        tour_taille: this.measurements['waistCircumference'] || null,  // Depuis `this.measurements`
        tour_hanches: this.measurements['hipCircumference'] || null,  // Depuis `this.measurements`
        hauteur_totale: this.measurements['totalHeight'] || null,  // Depuis `this.measurements`
        longueur_bras: this.measurements['armLength'] || null,  // Depuis `this.measurements`
        tour_cou: this.measurements['neckCircumference'] || null,  // Depuis `this.measurements`
        largeur_dos: this.measurements['backWidth'] || null,  // Depuis `this.measurements`
        longueur_jambe: this.measurements['legLength'] || null,  // Depuis `this.measurements`
        tour_cuisse: this.measurements['thighCircumference'] || null,  // Depuis `this.measurements`
        tour_cheville: this.measurements['ankleCircumference'] || null,  // Depuis `this.measurements`
        tour_poignet: this.measurements['wristCircumference'] || null,  // Depuis `this.measurements`
        largeur_poitrine: this.measurements['chestWidth'] || null,  // Depuis `this.measurements`
        longueur_clavicule: this.measurements['clavicleLength'] || 35,  // Depuis `this.measurements`
        mesures_photo: null,  // Si vous avez une photo à ajouter, vous pouvez l'ajouter ici
        user_id: userId 
      };
  
      console.log('Données formatées pour l\'envoi :', formattedData);
  
      // Appel du service pour envoyer les données au serveur Laravel
      this.apiService.saveMeasurements(formattedData).subscribe(
        response => {
          console.log('Données enregistrées avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement des données', error);
        }
      );
      
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des mesures :', e);
    }
  }
  

  //NOTE : LES DONNES A ENVOYER AU SERVEUR NE SONT PAS DANS LE FORM AU FINAL , MAIS SONT DANS LE TABLEAU DE MESUREMENTSTEPS
  get currentStepData(): MeasurementStep {
    return this.measurementSteps[this.currentStep];
  }
}
