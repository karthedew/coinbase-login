import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- HTTP INFO ---
import { HttpClientModule } from "@angular/common/http";

// --- IMPORT MODULES ---
import { MaterialModule } from "./modules/material.module";
import { ExportFormsModule } from "./modules/forms.module";
import { AuthModule } from "./modules/auth.module";

// --- COMPONENTS ---
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { HeaderComponent } from './core/components/header/header.component';

// --- APOLLO ANGULAR ---
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from '@apollo/client/core';

// --- MISC ---
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
// import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupPageComponent,
    LoginPageComponent,
    RedirectComponent,
    DashboardComponent,
    ToolbarComponent,
    SidenavComponent,
    HeaderComponent,
    UserProfileComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ExportFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/graphql',
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
