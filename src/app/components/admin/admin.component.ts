import { Component, OnInit } from '@angular/core';

import { Meme } from '../../models/meme';
import { Category } from '../../models/category';

import { MemeService } from '../../services/meme.service';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  memes: Meme[] = [];
  categories: Category[] = [];

  totalMemes = 0;
  totalLikes = 0;
  totalPlays = 0;
  totalCategories = 0;

  constructor(
    private memeService: MemeService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loadMemes();

    this.loadCategories();

  }

  loadMemes(): void {

    this.memeService.getAllMemes().subscribe({

      next: (data: Meme[]) => {

        this.memes = data;

        this.totalMemes = data.length;

        this.totalLikes = data.reduce(
          (sum, meme) => sum + meme.likes,
          0
        );

        this.totalPlays = data.reduce(
          (sum, meme) => sum + meme.playCount,
          0
        );

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  loadCategories(): void {

    this.categoryService.getCategories().subscribe({

      next: (data: Category[]) => {

        this.categories = data;

        this.totalCategories = data.length;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  deleteMeme(id: number): void {

    if (!confirm('Delete this meme?')) {

      return;

    }

    this.memeService.deleteMeme(id).subscribe({

      next: () => {

        this.toastr.success("Deleted Successfully");

        this.loadMemes();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

}