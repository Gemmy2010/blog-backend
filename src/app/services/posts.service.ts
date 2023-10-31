import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  selectedImage!: string;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(_selectedImage: any, postData: any, formStatus: any, id: any) {
    const filePath = `postImg/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, _selectedImage).then(() => {
      console.log('post loaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          console.log(postData);

          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('data inserted successfully');
        this.router.navigate(['/posts']);
      });
  }

  loadData(): Observable<any[]> {
    return this.afs
      .collection('posts')
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
  loadOneData(id: string) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }
  updateData(id: any, postData: string) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data updated successfully');
        this.router.navigate(['/posts']);
      });
  }
  deleteImage(postImgPath: any, id: any) {
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      });
  }
  deleteData(id: any) {
    this.afs
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        this.toastr.warning('Data  Deleted ...!');
      });
  }

  markFeatured(id: any, featuredData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(featuredData)
      .then(() => {
        this.toastr.info('Featured status updated ...!');
      });
  }
}
