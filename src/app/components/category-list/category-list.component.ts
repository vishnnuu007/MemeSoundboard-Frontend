import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
    
  ) { }

  ngOnInit(): void {

    this.loadCategories();

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

  editCategory(id: number): void {

    this.router.navigate(['/categories/edit', id]);

  }

  viewMemes(id: number): void {

    this.router.navigate(['/'], { queryParams: { categoryId: id } });

  }

  deleteCategory(id: number): void {

    if (!confirm('Delete this category?')) {

      return;

    }

    this.categoryService.deleteCategory(id).subscribe({

      next: () => {

        this.toastr.success("Category Deleted Successfully");

        this.loadCategories();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

}