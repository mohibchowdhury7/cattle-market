import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { ROUTES } from '@angular/router';
import {AppShellComponent} from '@core/components';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    {
        provide: ROUTES,
        multi: true,
        useValue: [{
          path: 'shell',
          component: AppShellComponent
        }]
      }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
