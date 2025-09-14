import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient,withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
   provideHttpClient(),
   provideZonelessChangeDetection(),
   provideRouter(routes)
  ]
};
