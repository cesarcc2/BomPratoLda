import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private animationCtrl: AnimationController) { 
  }

  ngOnInit() {}

  public openCategory(event){
    
    let card:HTMLElement = event.path.find(x => x.nodeName === 'ION-CARD-CONTENT');
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

}
