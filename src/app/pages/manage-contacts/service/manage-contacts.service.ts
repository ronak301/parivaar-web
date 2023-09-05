import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageContactsService {
  collection: string = "contacts";

  constructor(public db: AngularFirestore) { }

  async getAllData() {
    return this.db.collection(this.collection, ref => ref.orderBy("timestamp", "desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).toPromise()
  }
}
