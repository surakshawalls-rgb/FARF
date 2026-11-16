import { afterNextRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DEMO_CONTENT_STORAGE_KEY, DemoRecord, isDemoRecord } from '../../shared/demo-content';

interface ProgrammeSection {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

interface Programme {
  slug: string;
  name: string;
  focus: string;
  tagline: string;
  description: string;
  icon: string;
  theme: string;
  sections: ProgrammeSection[];
}

@Component({
  selector: 'app-programmes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './programmes.html',
  styleUrl: './programmes.scss',
})
export class Programmes implements OnInit {
  readonly programmes: Programme[] = [
    {
      slug: 'gramin-seva',
      name: 'Gramin Seva',
      focus: 'Rural Services',
      tagline: 'Connecting Villages with Opportunities and Services.',
      description:
        'A community service portal for information about welfare schemes, digital services, financial inclusion, agriculture, health awareness and public support.',
      icon: '⌂',
      theme: 'gramin',
      sections: [
        {
          icon: '▤',
          title: 'Government schemes',
          description:
            'Explore scheme information by topic. Always confirm eligibility and current application details with the official source.',
          items: [
            'Central and Uttar Pradesh welfare schemes',
            'Agriculture and farmer support',
            'Pension, women and child welfare',
            'Education and social assistance',
          ],
        },
        {
          icon: '↗',
          title: 'Digital services',
          description:
            'Guidance to help people navigate commonly needed digital services and documentation.',
          items: [
            'Income, caste and domicile certificate assistance',
            'Electricity payment and digital payments',
            'Railway booking assistance',
            'Other rural digital services',
          ],
        },
        {
          icon: '₹',
          title: 'Banking & financial inclusion',
          description:
            'Accessible information that supports informed decisions and confidence using financial services.',
          items: [
            'Banking and insurance awareness',
            'Financial literacy and digital banking',
            'Information about government financial assistance',
          ],
        },
        {
          icon: '☼',
          title: 'Agriculture, health & community',
          description:
            'Practical information for rural development, public welfare and community awareness.',
          items: [
            'Agriculture awareness and farmer welfare',
            'Health and social security awareness',
            'Community programmes and rural development',
          ],
        },
        {
          icon: '◎',
          title: 'Public grievance support',
          description:
            'Demonstration guidance for understanding public grievance channels and civic participation.',
          items: [
            'Jansunwai information',
            'RTI awareness',
            'Grievance guidance and sample follow-up',
          ],
        },
        {
          icon: '＋',
          title: 'My requests',
          description:
            'A demonstration of how service requests could be submitted and tracked in a later connected release.',
          items: [
            'Submit a service request (demo)',
            'View sample request status',
            'Review illustrative comments and updates',
          ],
        },
      ],
    },
    {
      slug: 'sakhi-udyam',
      name: 'Sakhi Udyam',
      focus: "Women's Livelihood",
      tagline: 'Empowering Women Through Skills and Livelihoods.',
      description:
        'A learning and opportunity portal focused on vocational skills, entrepreneurship, self-help groups and financial independence for rural women.',
      icon: '✿',
      theme: 'sakhi',
      sections: [
        {
          icon: '✂',
          title: 'Skill development',
          description:
            'Explore sample learning pathways that can be adapted with local trainers and community partners.',
          items: [
            'Tailoring and handicrafts',
            'Digital literacy and computer training',
            'Beauty, wellness and food processing',
            'Vocational learning and entrepreneurship',
          ],
        },
        {
          icon: '⌂',
          title: 'Livelihood opportunities',
          description:
            'Ideas and guidance for exploring income generation and employment opportunities.',
          items: [
            'Self-employment and home-based business ideas',
            'Local employment opportunities',
            'Income generation activities',
          ],
        },
        {
          icon: '◉',
          title: 'Self-help groups',
          description:
            'Information that supports group learning, collective enterprise and participation.',
          items: [
            'SHG information and group activities',
            'Training programmes',
            'Collective entrepreneurship',
          ],
        },
        {
          icon: '↗',
          title: 'Starting an enterprise',
          description:
            'Foundational resources for planning a small business and growing it sustainably.',
          items: [
            'Business planning and development',
            'Financial literacy',
            'Marketing guidance',
          ],
        },
        {
          icon: '▤',
          title: 'Schemes & market linkages',
          description:
            'Learn about women-focused livelihood support and ways to reach buyers and local markets.',
          items: [
            'Women-focused and livelihood schemes',
            'Entrepreneurship support and financial assistance',
            'Product marketing, buyer connections and digital selling',
          ],
        },
        {
          icon: '★',
          title: 'Stories & my progress',
          description:
            'Sample journeys and progress milestones for a future programme tracking experience.',
          items: [
            'Illustrative women entrepreneur stories',
            'Training participation and skills acquired',
            'Opportunities explored and enterprise progress (demo)',
          ],
        },
      ],
    },
    {
      slug: 'udaan',
      name: 'Udaan',
      focus: 'Life & Cognitive Skills',
      tagline: 'Learn • Think • Grow.',
      description:
        'A child-friendly learning portal supporting creativity, communication, problem-solving, digital awareness and essential life skills.',
      icon: '↗',
      theme: 'udaan',
      sections: [
        {
          icon: '▤',
          title: 'Learning activities',
          description:
            'Age-appropriate activities designed to make learning active, social and enjoyable.',
          items: [
            'Reading and educational exercises',
            'Interactive learning and general knowledge',
          ],
        },
        {
          icon: '◇',
          title: 'Think & solve',
          description:
            'Activities that encourage curiosity, reasoning and thoughtful decision-making.',
          items: [
            'Logical reasoning and pattern recognition',
            'Brain exercises and analytical thinking',
            'Puzzles and real-life problem scenarios',
          ],
        },
        {
          icon: '✎',
          title: 'Creative learning',
          description:
            'Space for children to express ideas, imagination and confidence.',
          items: [
            'Drawing and creative challenges',
            'Storytelling and imagination exercises',
          ],
        },
        {
          icon: '◌',
          title: 'Communication & life skills',
          description:
            'Practice listening, expression and positive participation with peers.',
          items: [
            'Speaking, listening and group discussion',
            'Leadership, teamwork and self-awareness',
            'Emotional intelligence and interpersonal skills',
          ],
        },
        {
          icon: '₹',
          title: 'Digital & financial literacy',
          description:
            'Foundational awareness for safe, informed participation in a digital world.',
          items: [
            'Money, savings and basic budgeting',
            'Computer and digital learning awareness',
            'Internet safety and responsible technology use',
          ],
        },
        {
          icon: '✓',
          title: 'Learning progress',
          description:
            'Illustrative school tools for teachers and programme teams. All records shown in this foundation are sample data.',
          items: [
            'Baseline, periodic and endline assessments',
            'Class and learning activity participation',
            'Demonstration milestones and certificates',
          ],
        },
      ],
    },
  ];

  activeProgramme: Programme | undefined;
  publishedContent: DemoRecord[] = [];
  contentError = '';
  private readonly isBrowser: boolean;
  private contentLoaded = false;

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    afterNextRender(() => {
      if (this.isBrowser) this.loadPublishedContent();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('program');
      this.activeProgramme = this.programmes.find((programme) => programme.slug === slug);
      if (this.contentLoaded) this.loadPublishedContent();
    });
  }

  private loadPublishedContent(): void {
    this.contentLoaded = true;
    this.contentError = '';
    try {
      const saved = localStorage.getItem(DEMO_CONTENT_STORAGE_KEY);
      if (!saved) return;
      const records: unknown = JSON.parse(saved);
      if (!Array.isArray(records) || !records.every(isDemoRecord)) {
        throw new Error('Stored demo content has an invalid format.');
      }
      this.publishedContent = records
        .filter((record) => record.status === 'Published' && record.programme === this.activeProgramme?.name)
        .sort((left, right) => left.displayOrder - right.displayOrder);
    } catch (error) {
      this.contentError = 'Published demo content could not be loaded from this browser.';
      console.error('FARF CONNECT published demo content could not be loaded.', error);
    }
  }

}
