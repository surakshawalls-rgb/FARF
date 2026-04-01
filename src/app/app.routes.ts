
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'recognition', loadComponent: () => import('./pages/recognition/recognition').then(m => m.RecognitionComponent) },
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
  { path: 'articles-blogs', loadComponent: () => import('./pages/articles-blogs/articles-blogs').then(m => m.ArticlesBlogs) },
  { path: 'ongoing-events', loadComponent: () => import('./pages/ongoing-events/ongoing-events').then(m => m.OngoingEvents) },
  { path: 'completed', loadComponent: () => import('./pages/completed/completed').then(m => m.Completed) },
  { path: 'newsletter', loadComponent: () => import('./pages/newsletter/newsletter').then(m => m.NewsletterComponent) },
  { path: 'webinars', loadComponent: () => import('./pages/webinars/webinars').then(m => m.WebinarsComponent) },
  { path: 'documentaries', loadComponent: () => import('./pages/documentaries/documentaries').then(m => m.DocumentariesComponent) },
  { path: 'published-work', loadComponent: () => import('./pages/published-work/published-work').then(m => m.PublishedWorkComponent) },
  { path: 'vision', loadComponent: () => import('./pages/vision/vision').then(m => m.VisionComponent) },
  { path: '**', redirectTo: '' }
];
