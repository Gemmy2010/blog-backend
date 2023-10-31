import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authenticationGuard } from './services/authentication.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authenticationGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authenticationGuard],
  },

  {
    path: 'posts',
    component: AllPostsComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'posts/new',
    component: NewPostComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'subscribers',
    component: SubscribersComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
