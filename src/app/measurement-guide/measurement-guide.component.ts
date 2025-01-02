import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

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
      value:0,
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
      value:0,
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
      value:0,
    }
  ];

  constructor(private fb: FormBuilder) {
    this.measurementForm = this.fb.group({
      searchQuery: [''],
      ...this.createFormControls()
    });
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

  nextStep(): void {
    if (this.currentStep < this.measurementSteps.length - 1) {
      console.log("current step",this.currentStep);
      this.measurementSteps[this.currentStep].value = this.measurementForm.get(this.measurementSteps[0].controlName).value;
      console.log("valeur du champ ",this.measurementSteps[this.currentStep].value);
      console.log("valeur du form",this.measurementForm.value);
      this.currentStep++
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  saveMeasurements(): void {
    try {
      this.measurementSteps[this.currentStep].value = this.measurementForm.get(this.measurementSteps[0].controlName).value;
      console.log('Measurements saved:', this.measurementForm.value);
      console.log('Steps saved:', this.measurementSteps)
    }catch (e) {
      console.error('Error saving measurements:', e);
    }

  }

  //NOTE : LES DONNES A ENVOYER AU SERVEUR NE SONT PAS DANS LE FORM AU FINAL , MAIS SONT DANS LE TABLEAU DE MESUREMENTSTEPS
  get currentStepData(): MeasurementStep {
    return this.measurementSteps[this.currentStep];
  }
}
