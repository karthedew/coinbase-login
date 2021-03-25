import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/services/sidenav.service';

import { Apollo, gql } from "apollo-angular";
import { Subscription } from 'rxjs';

// We use the gql tag to parse our query string into a query document
const GET_PROJECT = gql`
query {
  gitlabProject {
    projectName
  }
}
`;

// const GET_USER_PROJECTS = gql`
// query {

// }
// `

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: string = "Karl Schmidt";

  private querySubscription: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_PROJECT
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data)
      });
  }



}
