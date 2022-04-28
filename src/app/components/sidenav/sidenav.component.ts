import { Component, OnInit } from '@angular/core';
import { faBarsStaggered, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  iconHome = faHome;
  iconBars = faBarsStaggered;

  constructor() { }

  ngOnInit(): void {
  }

}
