import { Fragment, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ButtonLink,
  ControlButton,
  DividerLine,
  FeatureWorkCard,
  FormField,
  FormSelect,
  FormTextarea,
  MainColumn,
  PageShell,
  SidebarShell,
  SidebarText,
  SidebarTitle,
  StudioLogo,
  SubmitButton,
  WorkCard,
} from './components/ui';

type Locale = 'en' | 'ja';
type ThemePreference = 'light' | 'dark' | 'system';
type ThemeMode = 'light' | 'dark';

interface Project {
  id: string;
  title: Record<Locale, string>;
  meta: Record<Locale, string>;
  summary: Record<Locale, string>;
  year: string;
  image: string;
  alt: Record<Locale, string>;
}

const localeStorageKey = 'melius-official-web-lp-fixed-studio-locale';
const themeStorageKey = 'melius-official-web-lp-fixed-studio-theme';
const projectDetailAnimationMs = 320;

const projects: Project[] = [
  {
    id: 'project-baseline',
    title: {
      en: 'Baseline Systems',
      ja: 'Baseline Systems',
    },
    meta: {
      en: 'Brand system / Web',
      ja: 'ブランド / Web',
    },
    summary: {
      en: 'A launch system for a technical studio, pairing a sharper product story with a calm editorial website.',
      ja: '技術系スタジオのためのローンチシステム。プロダクトの物語と静かな編集的Webサイトを組み合わせています。',
    },
    year: '2026',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=84',
    alt: {
      en: 'A calm studio workspace with desks, chairs, and warm light',
      ja: '落ち着いたスタジオワークスペース',
    },
  },
  {
    id: 'project-orbit',
    title: {
      en: 'Orbit Product',
      ja: 'Orbit Product',
    },
    meta: {
      en: 'Product UI',
      ja: 'プロダクトUI',
    },
    summary: {
      en: 'A focused interface study for teams that need faster onboarding, cleaner navigation, and clearer status.',
      ja: 'より速いオンボーディング、整理された導線、明快な状態表示を必要とするチーム向けのUI検討。',
    },
    year: '2025',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=84',
    alt: {
      en: 'Geometric architecture and light used as a product design study',
      ja: 'プロダクトデザイン事例用の幾何学的な建築写真',
    },
  },
  {
    id: 'project-luma',
    title: {
      en: 'Luma Identity',
      ja: 'Luma Identity',
    },
    meta: {
      en: 'Identity / Launch',
      ja: 'ID / ローンチ',
    },
    summary: {
      en: 'A compact identity refresh built around a small set of confident launch assets and reusable visual rules.',
      ja: '少数の強いローンチ素材と再利用しやすいビジュアルルールで組んだ、コンパクトなID刷新。',
    },
    year: '2025',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=84',
    alt: {
      en: 'A neutral creative studio table with chairs and natural light',
      ja: '自然光が入る中立的なスタジオテーブル',
    },
  },
  {
    id: 'project-northline',
    title: {
      en: 'Northline Web',
      ja: 'Northline Web',
    },
    meta: {
      en: 'Web direction',
      ja: 'Webディレクション',
    },
    summary: {
      en: 'A web direction sprint for a service team that needed stronger hierarchy and a clearer consultation path.',
      ja: '階層設計と相談導線を強めるための、サービスチーム向けWebディレクションスプリント。',
    },
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=84',
    alt: {
      en: 'A bright office table prepared for a web design review',
      ja: 'Webデザインレビュー用の明るいオフィステーブル',
    },
  },
  {
    id: 'project-field',
    title: {
      en: 'Field App',
      ja: 'Field App',
    },
    meta: {
      en: 'Mobile concept',
      ja: 'モバイル構想',
    },
    summary: {
      en: 'A mobile concept for field teams, balancing fast capture, shared context, and a lightweight review loop.',
      ja: '現場チーム向けのモバイル構想。素早い記録、共有文脈、軽いレビュー導線を両立しています。',
    },
    year: '2024',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=84',
    alt: {
      en: 'A quiet outdoor retreat used as an app case study image',
      ja: 'アプリ事例画像として使う静かな屋外空間',
    },
  },
];

const copy = {
  en: {
    brand: 'Harbor Studio',
    mark: 'HS',
    headline: 'Bold web and product design for builders ready to move.',
    body: 'Harbor Studio helps founders and teams shape sharper products, smarter sites, and digital experiences built to lead.',
    start: 'Start a project',
    about: 'About',
    aboutTitle: 'Focused design for digital products with a clear commercial role.',
    aboutBodyA:
      'We partner with ambitious teams from early concept through launch, turning scattered ideas into calm structure, useful interfaces, and confident public websites.',
    aboutBodyB:
      'This template keeps the original fixed-sidebar rhythm while replacing brand, imagery, and copy with editable sample content.',
    close: 'Close',
    trusted: 'Trusted by product-led teams.',
    workKicker: 'Selected Work',
    workNote: '01 / 05',
    projectPanel: {
      eyebrow: 'Case study preview',
      close: 'Back to work',
      contact: 'Discuss this project',
      scope: 'Scope',
      outcome: 'Outcome',
      outcomeCopy: 'Sample detail view only. In a generated app, this can become a full case-study route or CMS-backed project page.',
    },
    testimonial: [
      {
        quote:
          'The work brought clarity to our product story and gave the team a site that finally matched the quality of the platform.',
        author: 'Mina K',
        role: 'Founder',
      },
      {
        quote:
          'They moved quickly without flattening the details. Every screen felt intentional, usable, and easy for our team to extend.',
        author: 'Theo R',
        role: 'Product Lead',
      },
      {
        quote:
          'The process made a complex launch feel simple. We walked away with a stronger story and a cleaner interface system.',
        author: 'Ari S',
        role: 'Design Director',
      },
    ],
    controls: {
      lang: 'JA',
      themeLight: 'Dark',
      themeDark: 'Light',
      switchToJa: 'Switch to Japanese',
      switchToEn: 'Switch to English',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    contact: {
      title: 'Contact Form',
      lead: 'Tell us what you want to sharpen next.',
      name: 'Name',
      namePlaceholder: 'Jane Smith',
      email: 'Email',
      emailPlaceholder: 'jane@company.com',
      service: 'Service',
      servicePlaceholder: 'Select...',
      services: ['Web Design', 'Product UI', 'Visual Identity', 'Design System', 'Other'],
      message: 'What help do you need?',
      messagePlaceholder: 'Describe your project...',
      budget: 'What is your budget?',
      budgetPlaceholder: 'Select...',
      budgets: ['$5k-$10k', '$10k-$20k', '$20k-$50k', '$50k+'],
      response: '12 hours typical response',
      submit: 'Submit',
      sent: 'Request received',
      sentNote: 'Thanks. The next step would be wired to email, CRM, or storage in the generated app.',
    },
  },
  ja: {
    brand: 'Harbor Studio',
    mark: 'HS',
    headline: '前に進むチームのための、力強いWebとプロダクトデザイン。',
    body: 'Harbor Studioは、創業者やチームのために、より鋭いプロダクト、伝わるサイト、先へ進むためのデジタル体験を設計します。',
    start: 'プロジェクトを相談',
    about: '概要',
    aboutTitle: '事業の役割が明確なデジタルプロダクトのための集中したデザイン。',
    aboutBodyA:
      '初期構想から公開まで伴走し、散らばったアイデアを、静かな構造、使いやすい画面、自信を持って出せるWebサイトへ整えます。',
    aboutBodyB:
      'このテンプレートは参照元の固定サイドバー構成を保ちつつ、ブランド、画像、文言を編集しやすいサンプル内容に置き換えています。',
    close: '閉じる',
    trusted: 'プロダクト主導のチームに選ばれています。',
    workKicker: 'Selected Work',
    workNote: '01 / 05',
    projectPanel: {
      eyebrow: 'Case study preview',
      close: '一覧に戻る',
      contact: 'この事例で相談',
      scope: '範囲',
      outcome: '結果',
      outcomeCopy: 'これはサンプルの詳細表示です。生成後のアプリでは、事例ページやCMS連携のプロジェクト画面にできます。',
    },
    testimonial: [
      {
        quote: 'プロダクトの物語が明確になり、プラットフォームの品質に見合うサイトへ整いました。',
        author: 'Mina K',
        role: 'Founder',
      },
      {
        quote: '速い進行でも細部が薄まらず、どの画面も意図があり、使いやすく、拡張しやすい状態でした。',
        author: 'Theo R',
        role: 'Product Lead',
      },
      {
        quote: '複雑なローンチがシンプルに進み、より強いストーリーと整理されたUIシステムが残りました。',
        author: 'Ari S',
        role: 'Design Director',
      },
    ],
    controls: {
      lang: 'EN',
      themeLight: 'Dark',
      themeDark: 'Light',
      switchToJa: '日本語に切り替え',
      switchToEn: '英語に切り替え',
      switchToDark: 'ダークモードに切り替え',
      switchToLight: 'ライトモードに切り替え',
    },
    contact: {
      title: 'Contact Form',
      lead: '次に磨きたいことを教えてください。',
      name: 'お名前',
      namePlaceholder: 'Jane Smith',
      email: 'メール',
      emailPlaceholder: 'jane@company.com',
      service: '相談内容',
      servicePlaceholder: '選択...',
      services: ['Webデザイン', 'プロダクトUI', 'ビジュアルID', 'デザインシステム', 'その他'],
      message: 'どんな支援が必要ですか？',
      messagePlaceholder: 'プロジェクトの概要を書いてください...',
      budget: 'ご予算',
      budgetPlaceholder: '選択...',
      budgets: ['75万-150万円', '150万-300万円', '300万-750万円', '750万円以上'],
      response: '通常12時間以内に返信',
      submit: '送信',
      sent: '送信済み',
      sentNote: 'ありがとうございます。生成後のアプリではメール、CRM、保存処理へ接続できます。',
    },
  },
};

const companies = [
  { label: 'NORTH', name: 'North Pier' },
  { label: 'LAYER', name: 'Layerworks' },
  { label: '45', name: 'Studio 45' },
  { label: 'SIGNAL', name: 'Signal Yard' },
  { label: 'LEDGER', name: 'Clear Ledger' },
  { label: 'KITE', name: 'Kiteframe' },
];

function getPreviewParam(keys: string[]) {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);

  for (const key of keys) {
    const value = params.get(key);

    if (value) {
      return value;
    }
  }

  return null;
}

function readInitialLocale(): Locale {
  const requested = getPreviewParam(['locale', 'lang', 'language', 'melius_locale']);

  if (requested === 'ja' || requested === 'en') {
    return requested;
  }

  try {
    const stored = window.localStorage.getItem(localeStorageKey);
    return stored === 'ja' || stored === 'en' ? stored : 'en';
  } catch {
    return 'en';
  }
}

function readInitialThemePreference(): ThemePreference {
  const requested = getPreviewParam(['theme', 'themeMode', 'colorScheme', 'melius_theme']);

  if (requested === 'light' || requested === 'dark' || requested === 'system') {
    return requested;
  }

  try {
    const stored = window.localStorage.getItem(themeStorageKey);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'light';
  } catch {
    return 'light';
  }
}

function resolveTheme(preference: ThemePreference): ThemeMode {
  if (preference === 'system') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}

function Ticker() {
  const items = [...companies, ...companies];

  return (
    <div
      data-melius-ui-id="trusted-logo-ticker"
      data-melius-ui-role="list"
      className="relative mt-2 h-8 w-full overflow-hidden"
    >
      <div className="ticker-track absolute left-0 top-0 flex h-full">
        {items.map((company, index) => (
          <div
            key={`${company.name}-${index}`}
            className="flex h-8 items-center justify-center whitespace-nowrap px-6 text-[13px] font-bold leading-none text-[#9a9a9a] dark:text-[#858585]"
          >
            <span>{company.label}</span>
            <span className="ml-2 text-[10px] font-normal uppercase text-[#a7a7a7] dark:text-[#777777]">
              {company.name}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f3f3f1] to-transparent dark:from-[#19191d]" />
      <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f3f3f1] to-transparent dark:from-[#19191d]" />
    </div>
  );
}

function AboutPanel({
  locale,
  open,
  onClose,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const t = copy[locale];

  if (!open) {
    return null;
  }

  return (
    <div
      data-melius-ui-id="about-modal"
      className="fixed inset-0 z-50 grid place-items-end bg-black/[0.28] px-3 py-3 md:place-items-center md:px-6 md:py-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        className="animate-fade-up w-full max-w-[520px] rounded-[8px] bg-white p-8 text-[#0f0f12] shadow-2xl shadow-black/[0.20] dark:bg-[#f4f4ef] dark:text-[#0f0f12] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#0f0f12] text-[15px] font-black text-white">
          {t.mark}
        </div>
        <h2
          id="about-title"
          data-melius-ui-id="about-modal-title"
          className="mt-6 text-[29px] font-medium leading-[36px] md:text-[32px] md:leading-[40px]"
        >
          {t.aboutTitle}
        </h2>
        <div
          data-melius-ui-id="about-modal-copy"
          className="mt-6 grid gap-4 text-[16px] leading-[24px] text-[#1d1d20]"
        >
          <p>{t.aboutBodyA}</p>
          <p>{t.aboutBodyB}</p>
        </div>
        <button
          data-melius-ui-id="about-modal-close"
          data-melius-ui-role="button"
          type="button"
          onClick={onClose}
          className="mt-8 h-10 rounded-full bg-[#0f0f12] px-5 text-[13px] font-semibold uppercase leading-none text-white transition hover:bg-[#26262b]"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}

function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale].contact;
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contact"
      data-melius-ui-id="contact-section"
      className="mx-auto max-w-[800px] border-t border-black/[0.06] pt-16 dark:border-white/[0.08]"
    >
      <div className="mb-8">
        <h2 data-melius-ui-id="contact-title" className="text-[24px] font-semibold leading-[30px]">
          {t.title}
        </h2>
        <p data-melius-ui-id="contact-lead" className="mt-2 text-[14px] leading-[20px] text-[#595959] dark:text-[#b7b7b2]">
          {sent ? t.sentNote : t.lead}
        </p>
      </div>

      <form data-melius-ui-id="contact-form" onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField uiId="contact-name-input" label={t.name} type="text" placeholder={t.namePlaceholder} />
          <FormField uiId="contact-email-input" label={t.email} type="email" placeholder={t.emailPlaceholder} />
        </div>
        <FormSelect
          uiId="contact-service-select"
          label={t.service}
          placeholder={t.servicePlaceholder}
          options={t.services}
        />
        <FormTextarea uiId="contact-message-input" label={t.message} placeholder={t.messagePlaceholder} />
        <FormSelect
          uiId="contact-budget-select"
          label={t.budget}
          placeholder={t.budgetPlaceholder}
          options={t.budgets}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-5">
          <div
            data-melius-ui-id="contact-response-note"
            data-state={sent ? 'sent' : 'idle'}
            className="flex items-center gap-2.5 text-[14px] leading-none text-[#595959] transition data-[state=sent]:text-[#0f0f12] dark:text-[#b7b7b2] dark:data-[state=sent]:text-[#f5f5f2]"
          >
            <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full border border-current text-[10px]">
              {sent ? 'OK' : '12'}
            </span>
            <span>{sent ? t.sent : t.response}</span>
          </div>
          <SubmitButton type="submit" disabled={sent}>
            {sent ? t.sent : t.submit}
          </SubmitButton>
        </div>
      </form>
    </section>
  );
}

function ProjectDetail({
  locale,
  project,
  isClosing,
  onClose,
}: {
  locale: Locale;
  project: Project | null;
  isClosing: boolean;
  onClose: () => void;
}) {
  const t = copy[locale].projectPanel;

  if (!project) {
    return null;
  }

  return (
    <section
      id={`${project.id}-detail`}
      data-melius-ui-id="project-detail-panel"
      role="region"
      aria-labelledby="project-detail-title"
      data-state={isClosing ? 'closing' : 'open'}
      className="case-detail-shell data-[state=closing]:animate-case-detail-out data-[state=open]:animate-case-detail-in"
    >
      <div className="min-h-0 overflow-hidden">
        <div className="grid overflow-hidden border-y border-black/[0.10] bg-[#f2f2ef] text-[#0f0f12] dark:border-white/[0.12] dark:bg-[#17171b] dark:text-[#f5f5f2] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[240px] overflow-hidden bg-[#e7e7e2] dark:bg-[#222229]">
            <img
              data-melius-ui-id="project-detail-image"
              data-melius-ui-role="image"
              src={project.image}
              alt={project.alt[locale]}
              className="h-full min-h-[240px] w-full object-cover lg:min-h-[480px]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/[0.46] to-transparent px-5 pb-5 pt-16 text-white">
              <span className="text-[11px] font-bold uppercase leading-none">{project.meta[locale]}</span>
              <span className="text-[11px] font-bold uppercase leading-none">{project.year}</span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-10 p-5 sm:p-7 lg:p-9">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-black/[0.08] pb-5 dark:border-white/[0.10]">
                <p className="text-[11px] font-bold uppercase leading-none text-[#858585] dark:text-[#aaa9a3]">
                  {t.eyebrow}
                </p>
                <button
                  data-melius-ui-id="project-detail-close"
                  data-melius-ui-role="button"
                  type="button"
                  onClick={onClose}
                  className="h-9 rounded-full border border-black/[0.12] px-4 text-[11px] font-bold uppercase leading-none transition hover:bg-black/[0.04] active:scale-[0.96] dark:border-white/[0.16] dark:hover:bg-white/[0.08]"
                >
                  {t.close}
                </button>
              </div>
              <h2
                id="project-detail-title"
                data-melius-ui-id="project-detail-title"
                className="mt-8 max-w-[620px] text-[34px] font-semibold leading-[38px] md:text-[46px] md:leading-[50px]"
              >
                {project.title[locale]}
              </h2>
              <p
                data-melius-ui-id="project-detail-summary"
                className="mt-5 max-w-[620px] text-[16px] leading-[24px] text-[#595959] dark:text-[#c8c8c1]"
              >
                {project.summary[locale]}
              </p>
            </div>

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4 border-y border-black/[0.08] py-5 dark:border-white/[0.10]">
                <div>
                  <p className="text-[10px] font-bold uppercase leading-none text-[#858585] dark:text-[#aaa9a3]">
                    {t.scope}
                  </p>
                  <p className="mt-2 text-[14px] font-semibold leading-[19px]">{project.meta[locale]}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase leading-none text-[#858585] dark:text-[#aaa9a3]">
                    {t.outcome}
                  </p>
                  <p className="mt-2 text-[14px] font-semibold leading-[19px]">{project.year}</p>
                </div>
              </div>
              <p data-melius-ui-id="project-detail-outcome" className="max-w-[620px] text-[13px] leading-[19px] text-[#696969] dark:text-[#b8b8b2]">
                {t.outcomeCopy}
              </p>
              <a
                data-melius-ui-id="project-detail-contact"
                data-melius-ui-role="button"
                href="#contact"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#0f0f12] px-6 text-[14px] font-semibold leading-none text-white transition hover:bg-[#191775] active:scale-[0.98] dark:bg-[#f5f5f2] dark:text-[#0f0f12] dark:hover:bg-white md:w-[260px]"
              >
                {t.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(readInitialLocale);
  const [themePreference, setThemePreference] = useState<ThemePreference>(readInitialThemePreference);
  const [theme, setTheme] = useState<ThemeMode>(() => applyTheme(readInitialThemePreference()));
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDetailClosing, setProjectDetailClosing] = useState(false);
  const projectDetailTimerRef = useRef<number | null>(null);

  const t = copy[locale];
  const testimonial = t.testimonial[testimonialIndex];
  const featuredProject = projects[0];
  const supportingProjects = projects.slice(1);

  useEffect(() => {
    document.documentElement.lang = locale;

    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // localStorage can be unavailable in restricted preview contexts.
    }
  }, [locale]);

  useEffect(() => {
    setTheme(applyTheme(themePreference));

    try {
      window.localStorage.setItem(themeStorageKey, themePreference);
    } catch {
      // localStorage can be unavailable in restricted preview contexts.
    }
  }, [themePreference]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % t.testimonial.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [t.testimonial.length]);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAboutOpen(false);
        closeProjectDetail();
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [projectDetailClosing, selectedProject]);

  useEffect(() => {
    return () => {
      if (projectDetailTimerRef.current) {
        window.clearTimeout(projectDetailTimerRef.current);
      }
    };
  }, []);

  function toggleLocale() {
    setLocale((current) => (current === 'en' ? 'ja' : 'en'));
  }

  function toggleTheme() {
    setThemePreference(theme === 'dark' ? 'light' : 'dark');
  }

  function openProject(project: Project) {
    if (selectedProject?.id === project.id && !projectDetailClosing) {
      closeProjectDetail();
      return;
    }

    if (projectDetailTimerRef.current) {
      window.clearTimeout(projectDetailTimerRef.current);
      projectDetailTimerRef.current = null;
    }

    setProjectDetailClosing(false);
    setSelectedProject(project);

    window.setTimeout(() => {
      document.getElementById(`${project.id}-detail`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 80);
  }

  function closeProjectDetail() {
    if (!selectedProject || projectDetailClosing) {
      return;
    }

    setProjectDetailClosing(true);

    if (projectDetailTimerRef.current) {
      window.clearTimeout(projectDetailTimerRef.current);
    }

    projectDetailTimerRef.current = window.setTimeout(() => {
      setSelectedProject(null);
      setProjectDetailClosing(false);
      projectDetailTimerRef.current = null;
    }, projectDetailAnimationMs);
  }

  return (
    <PageShell data-melius-ui-id="page-shell">
      <SidebarShell data-melius-ui-id="fixed-sidebar">
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between gap-4">
            <StudioLogo uiId="sidebar-brand" href="#" mark={t.mark} label={t.brand} />
            <div className="flex items-center gap-2">
              <ControlButton
                uiId="language-toggle"
                type="button"
                aria-label={locale === 'en' ? t.controls.switchToJa : t.controls.switchToEn}
                onClick={toggleLocale}
              >
                {t.controls.lang}
              </ControlButton>
              <ControlButton
                uiId="theme-toggle"
                type="button"
                aria-label={theme === 'dark' ? t.controls.switchToLight : t.controls.switchToDark}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? t.controls.themeDark : t.controls.themeLight}
              </ControlButton>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <SidebarTitle data-melius-ui-id="hero-title">{t.headline}</SidebarTitle>
              <SidebarText data-melius-ui-id="hero-copy">{t.body}</SidebarText>
            </div>

            <div data-melius-ui-id="hero-actions" className="flex flex-col items-start gap-3 xl:flex-row">
              <ButtonLink uiId="primary-cta" href="#contact">
                {t.start}
              </ButtonLink>
              <button
                data-melius-ui-id="about-button"
                data-melius-ui-role="button"
                type="button"
                onClick={() => setAboutOpen(true)}
                className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#595959] px-6 text-[17px] font-medium leading-none text-white transition hover:bg-[#4a4a4a] active:scale-[0.98] sm:w-auto dark:bg-[#d8d8d0] dark:text-[#101010] dark:hover:bg-white"
              >
                {t.about}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-10 md:mt-auto md:pt-10">
          <div data-melius-ui-id="trusted-section" className="grid gap-2">
            <h2 className="text-[24px] font-normal leading-[29px] text-[#0f0f12] dark:text-[#f5f5f2]">
              {t.trusted}
            </h2>
            <Ticker />
          </div>

          <div data-melius-ui-id="testimonial-section" className="h-32 w-full max-w-[320px] overflow-hidden">
            <div className="grid gap-2">
              <p
                key={`${locale}-${testimonialIndex}-quote`}
                data-melius-ui-id="testimonial-quote"
                className="animate-fade-up text-[13px] italic leading-[17px] text-[#0f0f12] dark:text-[#f5f5f2]"
              >
                {testimonial.quote}
              </p>
              <p
                data-melius-ui-id="testimonial-author"
                className="text-[13px] leading-[17px] text-[#595959] dark:text-[#b7b7b2]"
              >
                {testimonial.author} / {testimonial.role}
              </p>
            </div>
            <div className="mt-4 flex gap-1">
              {t.testimonial.map((item, index) => (
                <button
                  key={item.author}
                  data-melius-ui-id={`testimonial-dot-${index + 1}`}
                  data-melius-ui-role="button"
                  data-active={index === testimonialIndex ? 'true' : 'false'}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setTestimonialIndex(index)}
                  className="h-1.5 w-1.5 rounded-full bg-[#d1d1d1] transition hover:bg-[#9a9a9a] data-[active=true]:w-3 data-[active=true]:bg-[#0f0f12] dark:bg-[#55555b] dark:hover:bg-[#8d8d92] dark:data-[active=true]:bg-[#f5f5f2]"
                />
              ))}
            </div>
          </div>
        </div>
      </SidebarShell>

      <DividerLine />

      <MainColumn data-melius-ui-id="work-column">
        <div className="mx-auto max-w-[1240px]">
          <div
            data-melius-ui-id="work-index-header"
            className="mb-5 flex items-end justify-between gap-4 border-b border-black/[0.08] pb-4 dark:border-white/[0.10]"
          >
            <p className="text-[12px] font-bold uppercase leading-none text-[#595959] dark:text-[#b7b7b2]">
              {t.workKicker}
            </p>
            <p className="text-[12px] font-bold uppercase leading-none text-[#858585] dark:text-[#90908b]">
              {t.workNote}
            </p>
          </div>

          <div data-melius-ui-id="project-gallery" className="grid gap-6">
            <FeatureWorkCard
              uiId={featuredProject.id}
              imageUiId={`${featuredProject.id}-image`}
              href={`#${featuredProject.id}`}
              aria-expanded={selectedProject?.id === featuredProject.id}
              aria-controls={`${featuredProject.id}-detail`}
              selected={selectedProject?.id === featuredProject.id}
              onClick={(event) => {
                event.preventDefault();
                openProject(featuredProject);
              }}
              image={featuredProject.image}
              alt={featuredProject.alt[locale]}
              title={featuredProject.title[locale]}
              meta={featuredProject.meta[locale]}
              year={featuredProject.year}
            />

            {selectedProject?.id === featuredProject.id && (
              <ProjectDetail locale={locale} project={selectedProject} isClosing={projectDetailClosing} onClose={closeProjectDetail} />
            )}

            <div data-melius-ui-id="supporting-project-grid" className="grid gap-6 sm:grid-cols-2">
              {supportingProjects.map((project) => (
                <Fragment key={project.id}>
                  <WorkCard
                    uiId={project.id}
                    imageUiId={`${project.id}-image`}
                    href={`#${project.id}`}
                    aria-expanded={selectedProject?.id === project.id}
                    aria-controls={`${project.id}-detail`}
                    selected={selectedProject?.id === project.id}
                    onClick={(event) => {
                      event.preventDefault();
                      openProject(project);
                    }}
                    image={project.image}
                    alt={project.alt[locale]}
                    title={project.title[locale]}
                    meta={project.meta[locale]}
                    year={project.year}
                  />
                  {selectedProject?.id === project.id && (
                    <div className="sm:col-span-2">
                      <ProjectDetail locale={locale} project={selectedProject} isClosing={projectDetailClosing} onClose={closeProjectDetail} />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-[960px] md:mt-24">
          <ContactForm locale={locale} />

          <div
            data-melius-ui-id="footer-wordmark"
            className="animate-soft-float flex w-full justify-center pb-12 pt-24"
          >
            <p className="select-none text-[68px] font-bold uppercase leading-none text-black/[0.10] dark:text-white/[0.10] sm:text-[98px] md:text-[120px]">
              HARBOR
            </p>
          </div>
        </div>
      </MainColumn>

      <AboutPanel locale={locale} open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </PageShell>
  );
}
