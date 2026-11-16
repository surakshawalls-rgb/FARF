import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DEMO_CONTENT_STORAGE_KEY,
  DEMO_RECORD_KINDS,
  DemoRecord,
  isDemoRecord,
  RecordKind,
} from '../../shared/demo-content';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private readonly storageKey = DEMO_CONTENT_STORAGE_KEY;
  private readonly isBrowser: boolean;

  readonly kinds: RecordKind[] = [...DEMO_RECORD_KINDS];

  readonly navigation = [
    'Overview',
    'Beneficiaries',
    'Gramin Seva',
    'Sakhi Udyam',
    'Udaan',
    'Schools & Teachers',
    'Programmes',
    'Content Management',
    'Applications & Requests',
    'Activities & Events',
    'Field Interventions',
    'Progress Monitoring',
    'Impact Analytics',
    'Gallery Management',
    'Reports',
    'Settings',
  ];

  records: DemoRecord[] = this.seedRecords();
  selectedSection = 'Overview';
  searchTerm = '';
  selectedKind = 'All';
  editingId: number | null = null;
  errorMessage = '';
  successMessage = '';
  draft: Omit<DemoRecord, 'id' | 'updated'> = this.emptyDraft();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    afterNextRender(() => {
      if (this.isBrowser) this.loadRecords();
    });
  }

  get filteredRecords(): DemoRecord[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.records.filter((record) => {
      const matchesKind = this.selectedKind === 'All' || record.kind === this.selectedKind;
      const matchesSection =
        this.selectedSection === 'Overview' ||
        this.selectedSection === 'Content Management' ||
        this.selectedSection === 'Reports' ||
        this.sectionMatches(record, this.selectedSection);
      const matchesSearch =
        !query ||
        [record.title, record.kind, record.programme, record.status, record.category]
          .some((value) => value.toLowerCase().includes(query));
      return matchesKind && matchesSection && matchesSearch;
    });
  }

  get summaryCards(): { label: string; value: number; note: string }[] {
    return [
      { label: 'Demo records', value: this.records.length, note: 'Illustrative only' },
      { label: 'Gramin Seva', value: this.countFor('Gramin Seva'), note: 'Sample portal records' },
      { label: 'Sakhi Udyam', value: this.countFor('Sakhi Udyam'), note: 'Sample portal records' },
      { label: 'Udaan', value: this.countFor('Udaan'), note: 'Sample portal records' },
      { label: 'Schools', value: this.records.filter((record) => record.kind === 'School').length, note: 'Demo records only' },
      { label: 'Activities', value: this.records.filter((record) => record.kind === 'Event' || record.kind === 'Learning activity').length, note: 'Sample content' },
    ];
  }

  selectSection(section: string): void {
    this.selectedSection = section;
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveRecord(): void {
    this.errorMessage = '';
    this.successMessage = '';
    const title = this.draft.title.trim();
    if (!title) {
      this.errorMessage = 'Enter a title before saving the demo record.';
      return;
    }

    const updatedRecord: DemoRecord = {
      ...this.draft,
      title,
      id: this.editingId ?? Date.now(),
      updated: new Date().toISOString().slice(0, 10),
    };

    if (this.editingId === null) {
      this.records = [updatedRecord, ...this.records];
    } else {
      this.records = this.records.map((record) =>
        record.id === this.editingId ? updatedRecord : record,
      );
    }

    this.persistRecords();
    if (!this.errorMessage) {
      this.successMessage = this.editingId === null ? 'Demo record added.' : 'Demo record updated.';
      this.cancelEdit();
    }
  }

  editRecord(record: DemoRecord): void {
    this.editingId = record.id;
    this.draft = {
      title: record.title,
      kind: record.kind,
      programme: record.programme,
      category: record.category,
      description: record.description,
      featuredImage: record.featuredImage,
      publicationDate: record.publicationDate,
      displayOrder: record.displayOrder,
      benefits: record.benefits,
      eligibility: record.eligibility,
      requiredDocuments: record.requiredDocuments,
      applicationProcess: record.applicationProcess,
      officialLink: record.officialLink,
      sourceReference: record.sourceReference,
      lastUpdated: record.lastUpdated,
      status: record.status,
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteRecord(record: DemoRecord): void {
    this.records = this.records.filter((item) => item.id !== record.id);
    this.persistRecords();
    if (!this.errorMessage) {
      this.successMessage = 'Demo record deleted.';
      if (this.editingId === record.id) this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.draft = this.emptyDraft();
  }

  exportCsv(): void {
    if (!this.isBrowser) return;
    const headers = ['Title', 'Type', 'Programme', 'Category', 'Description', 'Featured image', 'Publication date', 'Display order', 'Benefits', 'Eligibility', 'Required documents', 'Application process', 'Official link', 'Source reference', 'Last updated', 'Status', 'Updated'];
    const rows = this.filteredRecords.map((record) => [
      record.title,
      record.kind,
      record.programme,
      record.category,
      record.description,
      record.featuredImage,
      record.publicationDate,
      String(record.displayOrder),
      record.benefits,
      record.eligibility,
      record.requiredDocuments,
      record.applicationProcess,
      record.officialLink,
      record.sourceReference,
      record.lastUpdated,
      record.status,
      record.updated,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'farf-connect-demo-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  private countFor(programme: string): number {
    return this.records.filter((record) => record.programme === programme).length;
  }

  private sectionMatches(record: DemoRecord, section: string): boolean {
    if (section === 'Beneficiaries') return record.kind === 'Beneficiary';
    if (section === 'Gramin Seva' || section === 'Sakhi Udyam' || section === 'Udaan') {
      return record.programme === section;
    }
    if (section === 'Schools & Teachers') return record.kind === 'School';
    if (section === 'Applications & Requests') return record.kind === 'Beneficiary';
    if (section === 'Activities & Events' || section === 'Field Interventions') {
      return record.kind === 'Event' || record.kind === 'Learning activity';
    }
    if (section === 'Progress Monitoring' || section === 'Impact Analytics') {
      return record.kind === 'Beneficiary' || record.kind === 'Learning activity';
    }
    if (section === 'Gallery Management') return record.kind === 'Event';
    if (section === 'Programmes') return record.programme !== 'Organisation';
    return true;
  }

  private loadRecords(): void {
    if (!this.isBrowser) {
      this.records = this.seedRecords();
      return;
    }

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!Array.isArray(parsed) || !parsed.every(isDemoRecord)) {
          throw new Error('Stored demo records have an invalid format.');
        }
        this.records = parsed;
        return;
      }
      this.persistRecords();
    } catch (error) {
      this.errorMessage = 'Saved demo data could not be read. Check browser storage to restore the sample records.';
      console.error('FARF CONNECT demo data could not be read.', error);
    }
  }

  private persistRecords(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.records));
    } catch (error) {
      this.errorMessage = 'Could not save this demo record in this browser. Check available local storage.';
      console.error('FARF CONNECT demo data could not be saved.', error);
    }
  }

  private seedRecords(): DemoRecord[] {
    return [
      { id: 1, title: 'Sample scheme information guide', kind: 'Scheme', programme: 'Gramin Seva', category: 'Government schemes', description: 'Illustrative only. Add verified scheme benefits, eligibility, required documents, process, official source and current update date before publishing.', featuredImage: '', publicationDate: '', displayOrder: 1, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Draft', updated: 'Demo' },
      { id: 2, title: 'Sample digital services orientation', kind: 'Training course', programme: 'Sakhi Udyam', category: 'Digital literacy', description: 'Demonstration course entry. Not a current offer or confirmed training schedule.', featuredImage: '', publicationDate: '2026-01-01', displayOrder: 2, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Published', updated: 'Demo' },
      { id: 3, title: 'Sample creative thinking activity', kind: 'Learning activity', programme: 'Udaan', category: 'Creative learning', description: 'Illustrative learning activity entry. This is sample content, not an actual class assignment.', featuredImage: '', publicationDate: '2026-01-01', displayOrder: 1, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Published', updated: 'Demo' },
      { id: 4, title: 'Sample school record (no student data)', kind: 'School', programme: 'Udaan', category: 'School management', description: 'Sample school record without student or teacher personal information.', featuredImage: '', publicationDate: '', displayOrder: 1, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Draft', updated: 'Demo' },
      { id: 5, title: 'Historical community workshop record', kind: 'Event', programme: 'Gramin Seva', category: 'Community awareness', description: 'Historical record. Confirm dates and current status before publication.', featuredImage: '', publicationDate: '2024-09-24', displayOrder: 3, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Historical', updated: 'Demo' },
      { id: 6, title: 'Sample community profile (no personal data)', kind: 'Beneficiary', programme: 'Gramin Seva', category: 'Community', description: 'Demo-only aggregate placeholder. No personal or beneficiary data.', featuredImage: '', publicationDate: '', displayOrder: 1, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Demo only', updated: 'Demo' },
      { id: 7, title: 'Rural India research publication', kind: 'Publication', programme: 'Organisation', category: 'Research', description: 'See FARF published work for existing publications and source details.', featuredImage: '', publicationDate: '', displayOrder: 1, benefits: '', eligibility: '', requiredDocuments: '', applicationProcess: '', officialLink: '', sourceReference: '', lastUpdated: '', status: 'Published', updated: 'Demo' },
    ];
  }

  private emptyDraft(): Omit<DemoRecord, 'id' | 'updated'> {
    return {
      title: '',
      kind: 'Scheme',
      programme: 'Gramin Seva',
      category: '',
      description: '',
      featuredImage: '',
      publicationDate: '',
      displayOrder: 1,
      benefits: '',
      eligibility: '',
      requiredDocuments: '',
      applicationProcess: '',
      officialLink: '',
      sourceReference: '',
      lastUpdated: '',
      status: 'Draft',
    };
  }
}
