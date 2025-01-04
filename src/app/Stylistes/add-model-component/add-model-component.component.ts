import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

interface Material {
  name: string;
  description: string;
}

interface Image {
  url: string;
  alt: string;
  isCover?: boolean;
}

@Component({
  selector: 'app-add-model',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-model-component.component.html',
  styleUrls: ['./add-model-component.component.css']
})
export class AddModelComponentComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  modelForm: FormGroup;
  currentStep = 1;
  isDragging = false;
  selectedCategories: string[] = [];

  availableCategories = [
    'Robe de soirée', 'Costume', 'Tenue casual',
    'Tenue de mariage', 'Haute couture', 'Prêt-à-porter',
    'Accessoires', 'Vêtements sur mesure', 'Collection capsule'
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm() {
    this.modelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categories: [[], [Validators.required, Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      materials: this.fb.array([]),
      images: this.fb.array([]),
      approximatePrice: this.fb.group({
        min: [0, [Validators.required, Validators.min(0)]],
        max: [0, [Validators.required, Validators.min(0)]]
      }),
      estimatedTime: this.fb.group({
        min: [1, [Validators.required, Validators.min(1)]],
        max: [1, [Validators.required, Validators.min(1)]],
        unit: ['semaines']
      })
    });
  }

  // Category methods
  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1 && this.selectedCategories.length < 3) {
      this.selectedCategories.push(category);
    } else if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    }
    this.modelForm.patchValue({ categories: this.selectedCategories });
  }

  // Materials methods
  addMaterial() {
    const materialGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.materials.push(materialGroup);
  }

  removeMaterial(index: number) {
    this.materials.removeAt(index);
  }

  // Image handling methods
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    if (this.images.length + files.length > 5) {
      alert('Maximum 5 photos autorisées');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageGroup = this.fb.group({
          url: [e.target?.result, Validators.required],
          alt: [file.name],
          isCover: [this.images.length === 0] // First image is cover by default
        });
        this.images.push(imageGroup);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    const removedImage = this.images.at(index);
    this.images.removeAt(index);

    // If removed image was cover, set first remaining image as cover
    if (removedImage.get('isCover')?.value && this.images.length > 0) {
      this.images.at(0).patchValue({ isCover: true });
    }
  }

  setCoverImage(index: number) {
    this.images.controls.forEach((control, i) => {
      control.patchValue({ isCover: i === index });
    });
  }

  isCoverImage(index: number): boolean {
    return this.images.at(index).get('isCover')?.value === true;
  }

  // Navigation methods
  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.modelForm.get('name')?.valid &&
          this.selectedCategories.length > 0 &&
          this.modelForm.get('description')?.valid;
      case 2:
        return this.materials.length > 0 &&
          this.materials.controls.every(control => control.valid);
      case 3:
        return this.images.length > 0 &&
          this.images.length <= 5;
      case 4:
        return this.modelForm.get('approximatePrice')?.valid &&
          this.modelForm.get('estimatedTime')?.valid;
      default:
        return false;
    }
  }

  nextStep() {
    if (this.isCurrentStepValid() && this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.modelForm.valid && this.isCurrentStepValid()) {
      const formData = {
        ...this.modelForm.value,
        coverImage: this.images.controls.find(control => control.get('isCover')?.value)?.value
      };
      console.log('Données du modèle:', formData);
      // Implement submission logic here
    }
  }

  // Form array getters
  get materials() {
    return this.modelForm.get('materials') as FormArray;
  }

  get images() {
    return this.modelForm.get('images') as FormArray;
  }

  isSelectedCategory(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

}
