import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  /**Inicializa a storage */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  
  /**Define um key-value na storafe */
  public set(key: string, value: any) {
    
    this._storage?.set(key, value);
  }

  /**Obtém o valor guardado na storage através da sua key */
  public get(key: string) {
    return this._storage?.get(key);
  }
}
