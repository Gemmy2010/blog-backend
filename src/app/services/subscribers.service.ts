import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  loadData(): Observable<any[]> {
    return this.afs
      .collection('subscribers')
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  deleteData(id: any) {
    this.afs
      .doc(`subscribers/${id}`)
      .delete()
      .then((docRef) => {
        this.toastr.success('Data deleted Successfully');
      });
  }
}
