import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  public item:Item;

  constructor(private router: Router) {
    if (router.getCurrentNavigation().extras.state) {
      const item = this.router.getCurrentNavigation().extras.state["item"];
    this.item = item;
    this.item.total = this.item.unitPrice;
    }
  }

  ngOnInit() {
  }

  public addIngredientQuantity(item:Item,ingredient:Ingredient){
    item.editableIngredients[item.editableIngredients.indexOf(ingredient)].quantity++;
    item.total = item.total + ingredient.unitPrice;
  }

  public removeIngredientQuantity(item:Item,ingredient:Ingredient){
    if(item.editableIngredients[item.editableIngredients.indexOf(ingredient)].quantity > 0){
      item.editableIngredients[item.editableIngredients.indexOf(ingredient)].quantity--;
      item.total = item.total - ingredient.unitPrice;
    }
    
  }

  public navigateToAccountPage(){

  }
}
