import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'work-areas', loadComponent: () => import('./pages/work-areas/work-areas').then(m => m.WorkAreas) },
  { path: 'app', loadComponent: () => import('./pages/app/app').then(m => m.App) },
  { path: 'impact', loadComponent: () => import('./pages/impact/impact').then(m => m.Impact) },
  { path: 'blogs', loadComponent: () => import('./pages/blogs/blogs').then(m => m.Blogs) },
  { path: 'team', loadComponent: () => import('./pages/team/team').then(m => m.Team) },
  { path: 'volunteer', loadComponent: () => import('./pages/volunteer/volunteer').then(m => m.Volunteer) },
  { path: 'donate', loadComponent: () => import('./pages/donate/donate').then(m => m.Donate) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
  { path: '**', redirectTo: '' }
];
