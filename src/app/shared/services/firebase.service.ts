import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  configCollection: string = "config";
  configId: string = "ilKdvYeEcYxZSw9sRW2K";

  constructor(
    public db: AngularFirestore
  ) { }

  getConfigData() {
    return this.db.collection(this.configCollection).doc(this.configId).get().pipe(
      map((a: any) => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  updateConfigData(data: any) {
    return this.db.collection(this.configCollection).doc(this.configId).update(data)
  }

}
