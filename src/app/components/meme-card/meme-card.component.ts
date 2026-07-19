import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-meme-form',
  templateUrl: './meme-form.component.html',
  styleUrls: ['./meme-form.component.css']
})
export class MemeFormComponent implements OnInit {

  title: string = '';
  description: string = '';
  categoryId: number = 0;

  imageFile!: File;
  audioFile!: File;

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  onAudioSelected(event: any) {
    if (event.target.files.length > 0) {
      this.audioFile = event.target.files[0];
    }
  }

  save() {

    console.log("Title:", this.title);
    console.log("Description:", this.description);
    console.log("Category:", this.categoryId);
    console.log("Image:", this.imageFile);
    console.log("Audio:", this.audioFile);

    // API call will be added next
  }

}