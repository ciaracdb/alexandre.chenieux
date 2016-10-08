import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {routing, appRoutingProviders} from './app.routing';

import {AceEditorComponent} from './components/ace.editor.component';

import {ShareDBAceEditorService} from './services/sharedb.ace-editor.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './view.components/home.component';
import {CvComponent} from './view.components/cv.component';
import {ExperimentsComponent} from './view.components/experiments.component';


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
        ExperimentsComponent,
        AceEditorComponent
    ],
    providers: [
        appRoutingProviders,
        ShareDBAceEditorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}