import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './view.components/home.component';
import {CvComponent} from './view.components/cv.component';
import {ExperimentsComponent} from './view.components/experiments.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'cv',
        component: CvComponent
    },
    {
        path: 'experiments',
        component: ExperimentsComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);