import { Component, OnInit } from '@angular/core';
import { IonPullUpFooterState} from 'ionic-pullup';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  footerState: IonPullUpFooterState;

  constructor() {}

  ngOnInit() {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  toggleFooter() {
    this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  public navigateToAccountPage() {

  }
}
