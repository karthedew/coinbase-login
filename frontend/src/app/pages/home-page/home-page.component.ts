import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
  }

  submitQuery() {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            userHello
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        console.log('Your value result: ', result)
      })
  }

}
