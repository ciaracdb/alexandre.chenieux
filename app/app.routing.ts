import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home';
import {CvComponent} from './components/cv';
import {ExperimentsComponent} from './components/experiments';

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