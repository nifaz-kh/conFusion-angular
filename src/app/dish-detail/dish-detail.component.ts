import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  commentForm: FormGroup;

  formErrors = {
    'author' : '',
    'rating' : '',
    'comment' : ''
  };

  validationMessages = {
    'author' : {
      'required' : 'Name is required',
      'minlength' : 'Name must be at least 2 characters long',
      'maxlength' : 'Name cannot be more that 25 characters long'
    }
  };


  constructor(
    private dishService: DishService,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
       .subscribe(ids => this.dishIds = ids);

    this.route.params
       .switchMap((params: Params) => this.dishService.getDish(+params['id']))
       .subscribe(dish => {
         this.dish = dish;
         this.setPrevNext(dish.id);
       });
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [ Validators.required, Validators.minLength(2) ] ],
      rating: 5,
      comment: ['', [ Validators.required ] ],
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onValueChanged(commentFormData?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

    if (this.commentForm.valid) {
      this.comment = this.commentForm.value;
    } else {
      this.comment = undefined;
    }
  }

  onSubmit() {
    this.comment['date'] = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
    });
  }
}
