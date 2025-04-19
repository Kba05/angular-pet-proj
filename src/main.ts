import { provideAnimations } from "@angular/platform-browser/animations";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), 
    provideProtractorTestingSupport(), 
    provideRouter(routeConfig), 
    NG_EVENT_PLUGINS]
}).catch((err) =>
  console.error(err),
);
