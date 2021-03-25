import { Component, OnDestroy, OnInit } from '@angular/core';

// --- IMPORT FORMS ---
import { FormGroup, FormBuilder } from "@angular/forms";

// --- IMPORT SERVICES ---
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: string = "Karl Schmidt";

  searchForm: FormGroup;

  constructor(
    private sidenavService: SidenavService,
    private formGroup: FormBuilder
  ) {
    this.searchForm = this.formGroup.group({
      search: ''
    })
  }

  ngOnInit(): void {}

}
