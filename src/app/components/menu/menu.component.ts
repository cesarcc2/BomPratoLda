import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController, NavController } from '@ionic/angular';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public categories : Category[] = [];
  
  constructor(private NavController: NavController,private animationCtrl: AnimationController,private CategoryService: CategoryService,private ItemService: ItemsService) { 
  }

 
  ngOnInit() {
    this.getCategories();
  }


  public openItemPage(item:Item){
    this.NavController.navigateForward('/item-details', { state: {"item":item} });
  }

  public getCategories(){
    this.CategoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  public categoryClick(event){
    let card:HTMLElement = event.path.find(x => x.nodeName === 'ION-CARD-CONTENT');
    let category = card.id;

    this.toggleCategory(card);
    this.getCategoryItems(category);
  }

  public getCategoryItems(category: string){
    let clickedCategoryIndex = this.categories.findIndex(arrCategory => arrCategory.type === category && arrCategory.items == null);
    if(clickedCategoryIndex !== -1){
      this.ItemService.getItems(category).subscribe(items =>{
        this.categories[clickedCategoryIndex].items = items;
        console.log(this.categories[clickedCategoryIndex]);
      });
    }
  }  

  public toggleCategory(card: HTMLElement){
    let contentToExpand:HTMLElement = <HTMLElement>card.children[1];
    if(contentToExpand.getAttribute("open") == "false"){

      let categoriesToClose = document.querySelectorAll('[open="true"]');

      categoriesToClose.forEach(element => {
        element.setAttribute("open","false");
        const closeCategory: Animation = this.animationCtrl.create()
      .addElement(element)
      .duration(200)
      .fromTo('height', '30rem', '0rem');
      closeCategory.play();
        
      });

      contentToExpand.setAttribute("open","true");

      const openCategory: Animation = this.animationCtrl.create()
      .addElement(contentToExpand)
      .duration(200)
      .fromTo('height', '0rem', '30rem');
      openCategory.play();
      
    }else{
      contentToExpand.setAttribute("open","false");
      
      const closeCategory: Animation = this.animationCtrl.create()
      .addElement(contentToExpand)
      .duration(200)
      .fromTo('height', '30rem', '0rem');
      closeCategory.play();
    }
  }

  trackByCategory(index,item:Category){
    return item.type;
  }

}
