import { Component, OnInit } from '@angular/core';
import { finalize } from '@angular/fire/node_modules/rxjs/operators';
import { Observable } from '@angular/fire/node_modules/rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  id: string = '';
  title?: string;
  image?: string = '';
  content?: string;
  buttonText: String = 'Submit';
  uploadPercent: number = 0;
  downloadURL?: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
  ) {
    this.id = this.route.snapshot.params['id'] || '';
  }

  ngOnInit(): void {
    if (this.id) {
      this.postService.getPostData(this.id).subscribe(data => {
        this.title = data?.title;
        this.content = data?.content;
        this.image = data?.image;
      });
    }
  }

  submitPost() {
    const data = {
      author: this.auth.currentUser.displayName || this.auth.currentUser.email,
      authorId: this.auth.currentUser.uid,
      title: this.title,
      content: this.content,
      image: this.image,
      published: new Date()
    }
    if (this.id) {
      this.postService.update(this.id, data);
    } else {
      this.postService.create(data);
    }
    this.router.navigate(['/']);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Can only upload image file');
    }

    const task = this.storage.upload(path, file);
    const ref = this.storage.ref(path);
    task.percentageChanges().subscribe(percent => this.uploadPercent = percent || 0);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.image = url);
        console.log(this.downloadURL);
      })
    ).subscribe();
  }
}
