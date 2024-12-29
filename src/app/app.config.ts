import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { RefreshTokenInterceptor } from './refresh-token.inteceptor';
import { CredentialsInterceptor } from './credentials.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CSRFInterceptor } from './CSRF-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([RefreshTokenInterceptor, CredentialsInterceptor, CSRFInterceptor])
    ),
    provideAnimationsAsync(),
  ],
};
