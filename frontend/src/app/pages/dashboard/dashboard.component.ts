import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { Subscription } from 'rxjs';

// --- IMPORT FORMS ---
import { FormGroup, FormBuilder } from "@angular/forms";

// --- IMPORT SERVICES ---
import { SidenavService } from 'src/app/core/services/sidenav.service';



const query = gql`
query GetRepos {
  githubUserSearch(username:"karthedew") {
    languages {
      amount,
      language
    }
  }
}
`


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser: string = "Karl Schmidt";

  loading: boolean;

  searchForm: FormGroup;

  private querySubscription: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private formGroup: FormBuilder,
    private apollo: Apollo
  ) {
    this.searchForm = this.formGroup.group({
      search: ''
    })
  }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery({
      query: query
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
