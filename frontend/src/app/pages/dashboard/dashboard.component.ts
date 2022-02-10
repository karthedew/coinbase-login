import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { Subscription } from 'rxjs';

// --- IMPORT FORMS ---
import { FormGroup, FormBuilder } from "@angular/forms";

// --- IMPORT SERVICES ---
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { WalletConnectService } from '../../core/services/wallet-connect/wallet-connect.service';



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

  currentUser:    string  = "Karl Schmidt";
  loading:        boolean;
  loggedIn:       boolean = false;
  currentAddress: string;
  currentRoute:   string;
  chainId:        string;

  walletInfoRoute:    string = 'blue';
  contractRouteStyle: string = "link-active";
  chainlinkStyle:     string = 'link';
  ethstablecoinStyle: string = 'link';
  walletinfoStyle:    string = 'link';

  searchForm: FormGroup;

  private querySubscription: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private walletConnectService: WalletConnectService,
    private formGroup: FormBuilder,
    private apollo: Apollo
  ) {
    this.searchForm = this.formGroup.group({
      search: ''
    })

    // --- Check MetaMask Login ---
    this.walletConnectService.checkMetaMaskConnection();      // Check if user is already connected with MetaMask
    this.walletConnectService.isConnected$.subscribe(         // Subscribe to get the loggedIn boolean
      (res:any) => this.loggedIn = res)
    this.walletConnectService.walletAccounts$.subscribe(      // Subscribe to get the wallet address
      (res:string[]) => this.currentAddress = res[0])
    this.walletConnectService.chainId$.subscribe(             // Subscribe to get the chainId
      (res:string) => this.chainId = res)
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

  public connectWallet(): void {
    this.walletConnectService.connectAccount();
    this.walletConnectService.checkMetaMaskConnection();
  }

}
