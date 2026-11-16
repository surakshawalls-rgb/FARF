import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Initiative {
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  historical?: boolean;
}

@Component({
  selector: 'app-initiatives',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './initiatives.html',
  styleUrl: './initiatives.scss',
})
export class Initiatives implements OnInit {
  readonly initiatives: Initiative[] = [
    {
      slug: 'adarsh-gram',
      title: 'Adarsh Gram Yojana (FAGY)',
      category: 'Village development',
      description: 'A village-focused approach to understanding community priorities and supporting development at the grassroots.',
      icon: '⌂',
      historical: true,
    },
    {
      slug: 'kalrav',
      title: 'KALRAV',
      category: 'Community connection',
      description: 'Connecting urban India with rural India through community engagement and shared understanding.',
      icon: '◌',
      historical: true,
    },
    {
      slug: 'child-education',
      title: 'Poor Child Education Support',
      category: 'Education',
      description: 'Education support and awareness initiatives for children in rural and underserved communities.',
      icon: '▤',
      historical: true,
    },
    {
      slug: 'digital-services',
      title: 'Digital Services',
      category: 'Digital inclusion',
      description: 'Facilitating access to digital services and information that can help people navigate essential services.',
      icon: '↗',
    },
    {
      slug: 'rural-research',
      title: 'Rural Research',
      category: 'Research',
      description: 'Field research, rural surveys and documentation to understand community priorities and support evidence-informed development.',
      icon: '◎',
    },
    {
      slug: 'agriculture',
      title: 'Agriculture Awareness',
      category: 'Agriculture',
      description: 'Agricultural awareness and information relevant to rural development and farmer welfare.',
      icon: '☼',
    },
    {
      slug: 'community',
      title: 'Community Development & Awareness',
      category: 'Community action',
      description: 'Community engagement and awareness initiatives that connect people with information, services and opportunities.',
      icon: '＋',
      historical: true,
    },
  ];

  activeInitiative: Initiative | undefined;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('initiative');
      this.activeInitiative = this.initiatives.find((initiative) => initiative.slug === slug);
    });
  }
}
