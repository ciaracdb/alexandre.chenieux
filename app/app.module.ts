import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {routing, appRoutingProviders} from './app.routing';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home';
import {CvComponent} from './components/cv';
import {ExperimentsComponent} from './components/experiments';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CvComponent,
        ExperimentsComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}