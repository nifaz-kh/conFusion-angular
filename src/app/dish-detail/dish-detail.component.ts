import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

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

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

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

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
