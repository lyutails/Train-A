import { ModuleWithProviders, NgModule } from '@angular/core';
import { StorageModuleConfig } from './models/storage-module-config';
import { windowGlobal } from './tokens/window-global.token';
import { storageKeyPrefix } from './tokens/local-storage-key.token';

@NgModule({})
export class StorageModule {
  public static forRoot({ config }: { config: StorageModuleConfig }): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        {
          provide: windowGlobal,
          useFactory: () => window,
        },
        {
          provide: storageKeyPrefix,
          useValue: config.prefix || '',
        },
      ],
    };
  }
}
