import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { MemeFormComponent } from './components/meme-form/meme-form.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RecentlyPlayedComponent } from './components/recently-played/recently-played.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/add', component: MemeFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/:id', component: MemeFormComponent, canActivate: [AuthGuard] },

  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },

  { path: 'recent', component: RecentlyPlayedComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
