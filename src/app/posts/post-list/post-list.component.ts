import { Component, OnInit } from '@angular/core';
import { Subscription } from '@angular/fire/node_modules/rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postsSubscription?: Subscription;
  posts?: Post[];

  constructor(private postService: PostService, public auth: AuthService) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getPosts().subscribe(posts => { this.posts = posts });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  delete(id: any) {
    this.postService.delete(id);
  }
}
