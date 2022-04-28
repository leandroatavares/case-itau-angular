import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  iconFaLeft = faArrowLeft;
  iconFaRight = faArrowRight;

  ngOnInit(): void {
  }


}
