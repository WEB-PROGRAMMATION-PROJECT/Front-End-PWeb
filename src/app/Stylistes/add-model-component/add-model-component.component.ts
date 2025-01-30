import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { DesignerService } from '../../services/Designers/designer.service';
interface Material {
  name: string;
  description: string;
}

interface Image {
  file: File;
  url: string;
  alt: string;
  isCover?: boolean;
}
// Interface Category
interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  href: string;
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
  files: File[] = [];

  modelForm: FormGroup;
  currentStep = 1;
  isDragging = false;
  selectedCategories: number[] = [];
  materiaux: any[] = [];
  availableCategories: Category[] = [];

  constructor(private fb: FormBuilder,private categoryService: DesignerService) {
    this.initializeForm();
    
  }
  user: any;
  private getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id;
  }

  ngOnInit(): void {
    // Abonnement pour obtenir les catégories
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.availableCategories = categories;  // Recevoir un tableau d'objets Category
      },
      error => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
    this.categoryService.getMateriaux().subscribe(
      (data) => {
        this.materiaux = data;  // Stocker les matériaux dans le tableau
      },
      (error) => {
        console.error('Erreur lors du chargement des matériaux:', error);
      }
    );
  }
  trackCategory(index: number, category: Category): number {
    return category.id;  // Utilisez l'ID comme identifiant unique
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
  toggleCategory(category: Category) {
    const index = this.selectedCategories.indexOf(category.id);  // Utilisez `category.name` comme identifiant unique
    if (index === -1 && this.selectedCategories.length < 3) {
      this.selectedCategories.push(category.id);  // Ajoutez le nom de la catégorie à `selectedCategories`
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
      console.log('Ajout du fichier:', file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageGroup = this.fb.group({
          file: [file, Validators.required], // Conserver l'objet File ici
          url: [e.target?.result, Validators.required], // URL pour affichage
          alt: [file.name],
          isCover: [this.images.length === 0] // Première image est par défaut la couverture
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
        return true;
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
      const formData = new FormData();
      const stylistId = this.getUserId();
      const selectedMaterials = Array.from(this.selectedMateriaux);
  
      // Get image data from the FormArray 'images' (Assuming it's a FormArray of FormGroups)
      const images: Image[] = this.images.value;
      console.log(images);
  
      // Extract files from FormArray
      const files: File[] = images.map((image: any, index: number) => {
        // Use 'at(index)' to get the correct FormGroup
        const imageGroup = this.images.at(index);
        const fileControl = imageGroup.get('file'); // Get the 'file' control
        return fileControl ? fileControl.value : null;
      }).filter((file: File | null) => file !== null); // Filter out any null values
 console.log(files[0]);
 console.log(files[1]);
 
      // Ajouter les champs simples
      formData.append('name', this.modelForm.value.name);
      formData.append('description', this.modelForm.value.description);
      formData.append('styliste_id', String(stylistId)); // À définir dynamiquement
      formData.append('categorie_id', this.modelForm.value.categories[0]);
      formData.append('prix_min', this.modelForm.value.approximatePrice.min.toString());
      formData.append('prix_max', this.modelForm.value.approximatePrice.max.toString());
      formData.append('temps_min', this.modelForm.value.estimatedTime.min.toString());
      formData.append('temps_max', this.modelForm.value.estimatedTime.max.toString());
      formData.append('unite_temps', this.modelForm.value.estimatedTime.unit);
      formData.append('materiaux_ids[]', JSON.stringify(selectedMaterials));

      files.forEach((file, index) => {
        formData.append(`image${index}`, file, file.name);
        console.log(file)
      });
      formData.forEach((value, index) => {
        console.log('valeur '+index);
        console.log(value)
      })
      // Ajouter les fichiers et leur metadata (alt et isCover)
      // Sérialiser les métadonnées des images en JSON et les ajouter à FormData
    
      // Debug output for FormData content
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      // Envoyer la requête
      this.categoryService.addModel(formData).subscribe(
        response => {
          console.log('Modèle ajouté avec succès:', response);
          alert('Votre modèle a été créé avec succès !');
        },
        error => {
          console.error('Erreur lors de l’ajout du modèle:', error);
          alert('Une erreur est survenue. Veuillez vérifier les données.');
        }
      );
    } else {
      console.warn('Le formulaire ou l’étape actuelle n’est pas valide.');
    }
  }
  
  
  
  selectedMateriaux: Set<any> = new Set();  // Utilisation d'un Set pour gérer les éléments sélectionnés

  // Vérifie si un matériau est sélectionné
  isSelected(material: any): boolean {
    return this.selectedMateriaux.has(material.id);
  }

  // Bascule la sélection d'un matériau
  toggleSelection(material: any): void {
    if (this.isSelected(material)) {
      this.selectedMateriaux.delete(material.id);  // Si sélectionné, le désélectionner
    } else {
      this.selectedMateriaux.add(material.id);  // Sinon, ajouter à la sélection
    }

    // Déclencher une mise à jour de la validation
  this.modelForm.updateValueAndValidity();
  }

  validateImages(images: FormArray): boolean {
    if (images.length === 0) {
      alert('Aucune image sélectionnée.');
      return false;
    }
  
    if (images.length > 5) {
      alert('Vous ne pouvez télécharger que 5 images au maximum.');
      return false;
    }
  
    for (let i = 0; i < images.length; i++) {
      const imageGroup = images.at(i);
      const file: File = imageGroup.get('file')?.value;
  
      if (!file) {
        alert('Fichier manquant.');
        return false;
      }
  
      console.log(`Validation du fichier ${i + 1}: type=${file.type}, taille=${file.size}`);
  
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Seules les images JPEG, PNG et JPG sont autorisées.');
        return false;
      }
  
      if (file.size > 2 * 1024 * 1024) {
        alert('Chaque fichier doit être inférieur à 2 Mo.');
        return false;
      }
    }
  
    return true;
  }
  

  // Form array getters
  get materials() {
    return this.modelForm.get('materials') as FormArray;
  }

  get images() {
    return this.modelForm.get('images') as FormArray;
  }

  isSelectedCategory(category: Category): boolean {
    return this.selectedCategories.includes(category.id);  // Vérifiez si le nom de la catégorie est dans `selectedCategories`
  }

}
