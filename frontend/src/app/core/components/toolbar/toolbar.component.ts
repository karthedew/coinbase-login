import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { SidenavService } from "../../services/sidenav.service";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../auth/services/auth.service';

// --- FORT AWESOME ---
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // --- LOCAL VARIABLES ---
  toggleActive: boolean = false;
  isLoggedIn: boolean;

  // Font Awesome
  faEllipsisV = faEllipsisV;

  // Event Emitters
  @Output() sidenavToggle = new EventEmitter<Event>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(loggedin => this.isLoggedIn = loggedin)
  }

  public onToggleSidenav(event: Event) {
    this.sidenavToggle.emit(event);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public logout() {

    this.authService.logout();
    location.reload();
  }


}
