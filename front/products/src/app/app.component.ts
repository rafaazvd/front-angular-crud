import { Component, OnInit, ElementRef, OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public user: any = {};

    constructor() {
    }

    // ngOnInit() {
    //     const body = document.getElementsByTagName('content')[0];
    //     body.classList.add('content');
    // }
  title = 'products';

}
