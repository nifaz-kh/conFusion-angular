import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  maybeFeaturedLeader: Leader;
  promotion: Promotion;
  dishErrMess: string;

  constructor(
    private dishService: DishService,
    private leaderService: LeaderService,
    private promotionService: PromotionService,
    @Inject('BaseURL') private BaseURL) {
    }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.maybeFeaturedLeader = leader);
  }
}
