import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SidenavService } from './core/services/sidenav.service';


// --- WALLET IMPORTS ---
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

// --- Web3 Imports ---
import Web3 from "web3";
import Web3Modal from "web3modal";

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'GitPay';

  toggleActive: boolean = false;
  toggleToolbar: boolean = false;

  public clickedEvent: Event;

  @ViewChild(SidenavComponent) public sidenavComponent: SidenavComponent

  constructor(
    private sideNavService: SidenavService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sideNavService.isDashboard.subscribe(toggletoolbar => {
      this.toggleToolbar = toggletoolbar;
    })
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSideNav(this.sidenavComponent.sideNav);
  }

  clickMenu() {
    this.toggleActive = !this.toggleActive;
    this.sideNavService.toggle();
  }

  childEventClicked($event: Event) {
    this.toggleActive = !this.toggleActive;
    this.sideNavService.toggle();
  }

}
