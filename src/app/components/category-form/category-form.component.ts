import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

category: Category = {
  id: 0,
  name: '',
  description: '',
  icon: ''
};

  isEdit = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['id']) {

        this.isEdit = true;

        this.categoryService.getCategoryById(+params['id']).subscribe({

          next: (data: Category) => {

            this.category = data;

          },

          error: (err: any) => {

            console.log(err);

          }

        });

      }

    });

  }

  saveCategory(): void {

    if (this.category.name.trim() == '') {

      this.toastr.warning('Enter Category Name');

      return;

    }

    if (this.category.icon.trim() == '') {

      this.toastr.warning('Enter Category Icon');

      return;

    }

    if (this.isEdit) {

      this.categoryService.updateCategory(
        this.category.id,
        this.category
      ).subscribe({

        next: () => {

          this.toastr.success('Category Updated Successfully');

          this.router.navigate(['/categories']);

        },

        error: (err: any) => {

          console.log(err);

        }

      });

    }
    else {

      this.categoryService.createCategory(this.category).subscribe({

        next: () => {

          this.toastr.success('Category Added Successfully');

          this.router.navigate(['/categories']);

        },

        error: (err: any) => {

          console.log(err);

        }

      });

    }

  }

}