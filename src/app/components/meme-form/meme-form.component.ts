import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MemeService } from '../../services/meme.service';

import { ActivatedRoute } from '@angular/router';
import { Meme } from '../../models/meme';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-meme-form',
  templateUrl: './meme-form.component.html',
  styleUrls: ['./meme-form.component.css']
})
export class MemeFormComponent implements OnInit {

  title: string = '';
  description: string = '';
  categoryId: number = 0;

  imageFile: File | null = null;
  audioFile: File | null = null;

  currentImageUrl: string = '';
currentAudioUrl: string = '';

  categories: Category[] = [];

  isEdit = false;
memeId = 0;
imagePreview: string | ArrayBuffer | null = null;

audioPreview: string | ArrayBuffer | null = null;





constructor(

  private categoryService: CategoryService,

  private memeService: MemeService,

  private router: Router,

  private route: ActivatedRoute,

  private toastr: ToastrService

) { }

  ngOnInit(): void {

  this.loadCategories();

  this.route.params.subscribe(params => {

    if (params['id']) {

      this.isEdit = true;

      this.memeId = +params['id'];

      this.loadMeme();

    }

  });

}

  loadCategories(): void {

    this.categoryService.getCategories().subscribe({

      next: (data: Category[]) => {

        this.categories = data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }


loadMeme(): void {

  console.log("Meme ID:", this.memeId);

  this.memeService.getMemeById(this.memeId).subscribe({

    next: (data: Meme) => {

  this.title = data.title;
  this.description = data.description;
  this.categoryId = data.categoryId;
this.imagePreview = 'https://localhost:7208' + data.imageUrl;
this.audioPreview = 'https://localhost:7208' + data.audioUrl;
  this.currentImageUrl = data.imageUrl;
  this.currentAudioUrl = data.audioUrl;

},

    error: (err) => {

      console.log("ERROR:", err);

    }

  });

}


  onImageSelected(event: any): void {

  if (event.target.files && event.target.files.length > 0) {

    const file: File = event.target.files[0];

    this.imageFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);

  }

}

  onAudioSelected(event: any): void {

  if (event.target.files && event.target.files.length > 0) {

    const file: File = event.target.files[0];

    this.audioFile = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.audioPreview = reader.result;

    };

    reader.readAsDataURL(file);

  }

}

  saveMeme(): void {

    if (this.title.trim() == '') {

      this.toastr.warning('Please enter title');

      return;

    }

    if (this.categoryId == 0) {

      this.toastr.warning('Please select category');

      return;

    }

    // Only require files when adding a new meme
if (!this.isEdit) {

  if (!this.imageFile) {

    this.toastr.warning('Please select image');

    return;

  }

  if (!this.audioFile) {

    this.toastr.warning('Please select audio');

    return;

  }

}

    const formData = new FormData();

    formData.append('Title', this.title);
    formData.append('Description', this.description);
    formData.append('CategoryId', this.categoryId.toString());

    if (this.imageFile) {
  formData.append('ImageFile', this.imageFile);
}

if (this.audioFile) {
  formData.append('AudioFile', this.audioFile);
}

    if (this.isEdit) {

  this.memeService.updateMeme(this.memeId, formData).subscribe({

    next: () => {

      this.toastr.success('Meme Updated Successfully');

      this.router.navigate(['/admin']);

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}
else {

  this.memeService.createMeme(formData).subscribe({

    next: () => {

      this.toastr.success('Meme Added Successfully');

      this.router.navigate(['/admin']);

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}}
  
}