import {platformBrowser}    from '@angular/platform-browser';
import {AppModuleNgFactory} from '../compiled/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);