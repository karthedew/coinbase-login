import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from "rxjs/operators";
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSegment } from '@angular/router';

// --- FORT AWESOME ---
import { faDesktop, faUser, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // --- LOCAL VARIABLES ---
  show: boolean = false;
  private isDashboardSource = new Subject<string>();
  isDashboard = this.isDashboardSource.asObservable();

  // Font Awesome
  faDesktop = faDesktop;
  faUser = faUser;
  faHome = faHome;
  faSearch = faSearch;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sidenavService: SidenavService
  ) { }

  ngOnInit(): void {

    // GETS THE CURRENT ROUTE AND RETURNS IT TO THE DASHBOARD ROUTE OBSERVABLE
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        // this.isDashboardSource.next(event.url);
        if (event.url === "/dashboard" || event.url === "/userprofile") {
          this.sidenavService.setIsDashboard(true);
          this.isDashboardSource.next('dashboardSet');
        } else {
          this.sidenavService.setIsDashboard(false);
          this.isDashboardSource.next(event.url);
        }
      }
    })
  }

}
