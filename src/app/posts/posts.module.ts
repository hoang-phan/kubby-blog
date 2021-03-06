import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';
import { SafeHtmlPipe } from '../safe-html.pipe';

const routes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'blog/:id/edit', component: PostDashboardComponent },
  { path: 'dashboard', component: PostDashboardComponent },
]

@NgModule({
  declarations: [
    PostDashboardComponent,
    PostDetailComponent,
    PostListComponent,
    SafeHtmlPipe
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }
