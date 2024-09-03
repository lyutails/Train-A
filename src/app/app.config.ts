import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { StorageModule } from './core/storage/storage.module';
import { storageKeyPrefix } from './core/storage/tokens/storage-key-prefix';
import { authorizationInterceptor } from './repositories/authorization/interceptors/authorization-interceptor';
import { loadingInterceptor } from './common/interceptors/loading.interceptor';
import { mapInterceptor } from './features/admin/features/map/interceptor/map-interceptor';
import { authErrorInterceptor } from './common/interceptors/access-interceptor/error-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideEffects(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideAnimationsAsync(),
    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(
      withInterceptors([authorizationInterceptor, mapInterceptor, loadingInterceptor, authErrorInterceptor]),
    ),
    importProvidersFrom(StorageModule.forRoot({ config: { prefix: storageKeyPrefix } })),
  ],
};
