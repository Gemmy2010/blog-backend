import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: any[] = [];
  formCategory!: string;
  formStatus: string = 'Add';
  catId!: string;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formStatus == 'Add') {
      this.categoriesService.saveData(categoryData);

      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoriesService.updateData(this.catId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }

  onEdit(cat: any, id: any) {
    this.formCategory = cat;
    this.formStatus = 'Edit';
    this.catId = id;
  }

  onDelete(id: any) {
    this.categoriesService.deleteData(id);
  }
}
