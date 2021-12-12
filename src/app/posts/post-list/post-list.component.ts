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
  highlight1Posts?: Post[];
  highlight2Posts?: Post[];
  posts?: Post[];

  constructor(private postService: PostService, public auth: AuthService) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getPosts().subscribe(posts => {
      this.highlight1Posts = posts.filter((post) => post.highlightLevel == 1)
      this.highlight2Posts = posts.filter((post) => post.highlightLevel == 2)
      this.posts = posts.filter((post) => !post.highlightLevel);
    });
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
