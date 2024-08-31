import { Inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { windowGlobal } from '../tokens/window-global.token';
import { storageKeyPrefix } from '../tokens/storage-key-prefix';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  public constructor(@Inject(windowGlobal) window: Window, @Inject(storageKeyPrefix) prefix: string) {
    super(window.localStorage, prefix);
  }
}
