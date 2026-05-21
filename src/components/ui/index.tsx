import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

interface ChildrenProps {
  children: ReactNode;
}

interface UiIdProps {
  uiId: string;
}

interface StudioLogoProps extends AnchorHTMLAttributes<HTMLAnchorElement>, UiIdProps {
  mark: string;
  label: string;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, UiIdProps {
  variant?: 'primary' | 'secondary';
}

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, UiIdProps {}

interface WorkCardProps extends AnchorHTMLAttributes<HTMLAnchorElement>, UiIdProps {
  imageUiId: string;
  image: string;
  alt: string;
  title: string;
  year: string;
  meta: string;
  selected?: boolean;
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement>, UiIdProps {
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, UiIdProps {
  label: string;
  options: string[];
  placeholder: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, UiIdProps {
  label: string;
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, UiIdProps {
  src: string;
  alt: string;
}

export function PageShell({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <main
      {...props}
      className="min-h-screen overflow-x-clip bg-[#fafafa] font-body text-[#0f0f12] dark:bg-[#0f0f12] dark:text-[#f5f5f2]"
    >
      {children}
    </main>
  );
}

export function SidebarShell({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <aside
      {...props}
      className="w-full bg-[#f3f3f1] px-6 py-7 text-[#0f0f12] dark:bg-[#19191d] dark:text-[#f5f5f2] md:fixed md:left-0 md:top-0 md:z-20 md:flex md:h-screen md:w-[38%] md:flex-col md:justify-between md:px-9 md:py-9 lg:w-[32%]"
    >
      {children}
    </aside>
  );
}

export function MainColumn({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <section
      {...props}
      className="min-h-screen bg-[#fafafa] px-5 py-5 dark:bg-[#111114] md:ml-[38%] md:w-[62%] md:px-7 md:py-7 lg:ml-[32%] lg:w-[68%]"
    >
      {children}
    </section>
  );
}

export function DividerLine() {
  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed left-[38%] top-0 bottom-0 z-30 w-px bg-[repeating-linear-gradient(180deg,#d0d0d0_0,#d0d0d0_8px,transparent_8px,transparent_16px)] dark:bg-[repeating-linear-gradient(180deg,#3a3a40_0,#3a3a40_8px,transparent_8px,transparent_16px)] lg:left-[32%]"
    />
  );
}

export function StudioLogo({ mark, label, uiId, ...props }: StudioLogoProps) {
  return (
    <a
      {...props}
      data-melius-ui-id={uiId}
      className="group inline-flex h-10 items-center gap-3 text-[#0f0f12] transition hover:opacity-70 dark:text-[#f5f5f2]"
    >
      <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#0f0f12] text-[14px] font-black uppercase leading-none text-white dark:bg-[#f5f5f2] dark:text-[#0f0f12]">
        {mark}
      </span>
      <span className="hidden text-[12px] font-bold uppercase leading-none md:block">{label}</span>
    </a>
  );
}

export function SidebarTitle({ children, ...props }: HTMLAttributes<HTMLHeadingElement> & ChildrenProps) {
  return (
    <h1
      {...props}
      className="max-w-[520px] text-[36px] font-semibold leading-[42px] text-[#0f0f12] dark:text-[#f5f5f2] sm:text-[38px] sm:leading-[44px]"
    >
      {children}
    </h1>
  );
}

export function SidebarText({ children, ...props }: HTMLAttributes<HTMLParagraphElement> & ChildrenProps) {
  return (
    <p
      {...props}
      className="max-w-[500px] text-[16px] font-normal leading-[22px] text-[#27272c] dark:text-[#d7d7d2]"
    >
      {children}
    </p>
  );
}

export function ButtonLink({ uiId, variant = 'primary', children, ...props }: ButtonLinkProps & ChildrenProps) {
  if (variant === 'secondary') {
    return (
      <a
        {...props}
        data-melius-ui-id={uiId}
        data-melius-ui-role="button"
        className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#595959] px-6 text-[17px] font-medium leading-none text-white transition hover:bg-[#4a4a4a] active:scale-[0.98] sm:w-auto dark:bg-[#d8d8d0] dark:text-[#101010] dark:hover:bg-white"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      {...props}
      data-melius-ui-id={uiId}
      data-melius-ui-role="button"
      className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#0f0f12] px-6 text-[17px] font-medium leading-none text-white shadow-[inset_0_4px_16px_1px_rgba(255,255,255,0.22),0_2px_12px_0_rgba(0,0,0,0.20)] transition hover:bg-[#191775] active:scale-[0.98] sm:w-auto dark:bg-[#f5f5f2] dark:text-[#0f0f12] dark:hover:bg-white"
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-[20px] leading-none transition group-hover:-rotate-45">
        {'->'}
      </span>
    </a>
  );
}

export function ControlButton({ uiId, children, ...props }: ControlButtonProps & ChildrenProps) {
  return (
    <button
      {...props}
      data-melius-ui-id={uiId}
      data-melius-ui-role="button"
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-black/[0.12] bg-white/[0.62] px-3 text-[11px] font-bold uppercase leading-none text-[#0f0f12] transition hover:bg-white hover:opacity-75 active:scale-[0.96] dark:border-white/[0.16] dark:bg-white/[0.06] dark:text-[#f5f5f2] dark:hover:bg-white/[0.10]"
    >
      {children}
    </button>
  );
}

export function FeatureWorkCard({ uiId, imageUiId, image, alt, title, year, meta, selected = false, ...props }: WorkCardProps) {
  return (
    <a
      {...props}
      data-melius-ui-id={uiId}
      data-melius-ui-role="card"
      data-selected={selected ? 'true' : 'false'}
      className="work-card group grid overflow-hidden rounded-[8px] border border-transparent bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995] data-[selected=true]:border-black/[0.18] data-[selected=true]:bg-[#f6f6f3] data-[selected=true]:shadow-none dark:bg-[#1a1a1f] dark:data-[selected=true]:border-white/[0.22] dark:data-[selected=true]:bg-[#202025] lg:grid-cols-[1.58fr_0.72fr]"
    >
      <div className="relative overflow-hidden">
        <img
          data-melius-ui-id={imageUiId}
          data-melius-ui-role="image"
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035] lg:min-h-[560px]"
        />
        <div className="absolute inset-0 bg-[#0f0f12]/[0.06] opacity-0 transition duration-500 group-hover:opacity-100 dark:bg-white/[0.06]" />
      </div>
      <div className="flex min-h-[190px] flex-col justify-between border-t border-black/[0.06] p-5 dark:border-white/[0.08] lg:border-l lg:border-t-0 lg:p-7">
        <div>
          <p className="text-[11px] font-bold uppercase leading-none text-[#858585] dark:text-[#9f9f9a]">{meta}</p>
          <h2 className="mt-4 text-[28px] font-semibold leading-[32px] text-[#0f0f12] dark:text-[#f5f5f2] md:text-[34px] md:leading-[38px]">
            {title}
          </h2>
        </div>
        <div className="mt-8 flex items-center justify-between text-[13px] font-semibold uppercase leading-none text-[#595959] dark:text-[#c8c8c1]">
          <span>{year}</span>
          <span aria-hidden="true" className="transition group-hover:-rotate-45">
            {'->'}
          </span>
        </div>
      </div>
    </a>
  );
}

export function WorkCard({ uiId, imageUiId, image, alt, title, year, meta, selected = false, ...props }: WorkCardProps) {
  return (
    <a
      {...props}
      data-melius-ui-id={uiId}
      data-melius-ui-role="card"
      data-selected={selected ? 'true' : 'false'}
      className="work-card group block overflow-hidden rounded-[8px] border border-transparent bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995] data-[selected=true]:border-black/[0.18] data-[selected=true]:bg-[#f6f6f3] data-[selected=true]:shadow-none dark:bg-[#1a1a1f] dark:data-[selected=true]:border-white/[0.22] dark:data-[selected=true]:bg-[#202025]"
    >
      <div className="relative overflow-hidden">
        <img
          data-melius-ui-id={imageUiId}
          data-melius-ui-role="image"
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-[#191775]/[0.18] opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex min-h-[92px] items-end justify-between gap-4 border-t border-black/[0.06] p-4 dark:border-white/[0.08]">
        <div>
          <p className="text-[10px] font-bold uppercase leading-none text-[#858585] dark:text-[#9f9f9a]">{meta}</p>
          <h2 className="mt-2 text-[18px] font-semibold leading-[23px] text-[#0f0f12] dark:text-[#f5f5f2] md:text-[20px] md:leading-[25px]">
            {title}
          </h2>
        </div>
        <span className="shrink-0 text-[13px] font-semibold leading-none text-[#595959] dark:text-[#c8c8c1]">{year}</span>
      </div>
    </a>
  );
}

export function ImageFrame({ uiId, src, alt, ...props }: ImageProps) {
  return (
    <img
      {...props}
      data-melius-ui-id={uiId}
      data-melius-ui-role="image"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="aspect-[4/3] w-full rounded-[8px] object-cover"
    />
  );
}

export function FormField({ label, uiId, ...props }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-[13px] font-normal leading-none text-[#0f0f12] dark:text-[#f5f5f2]">
      <span>{label}</span>
      <input
        {...props}
        data-melius-ui-id={uiId}
        className="h-10 w-full rounded-full border border-transparent bg-[#bbbbbb26] px-4 text-[14px] leading-none text-[#0f0f12] outline-none transition placeholder:text-[#777777] focus:border-black/[0.14] dark:bg-white/[0.08] dark:text-[#f5f5f2] dark:placeholder:text-[#a0a09b] dark:focus:border-white/[0.18]"
      />
    </label>
  );
}

export function FormSelect({ label, uiId, options, placeholder, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-2 text-[13px] font-normal leading-none text-[#0f0f12] dark:text-[#f5f5f2]">
      <span>{label}</span>
      <select
        {...props}
        data-melius-ui-id={uiId}
        className="h-10 w-full appearance-none rounded-full border border-transparent bg-[#bbbbbb26] px-4 text-[14px] leading-none text-[#595959] outline-none transition focus:border-black/[0.14] dark:bg-white/[0.08] dark:text-[#d7d7d2] dark:focus:border-white/[0.18]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormTextarea({ label, uiId, ...props }: TextareaProps) {
  return (
    <label className="flex flex-col gap-2 text-[13px] font-normal leading-none text-[#0f0f12] dark:text-[#f5f5f2]">
      <span>{label}</span>
      <textarea
        {...props}
        data-melius-ui-id={uiId}
        className="h-24 w-full resize-none rounded-[8px] border border-transparent bg-[#bbbbbb26] px-4 py-3 text-[14px] leading-[20px] text-[#0f0f12] outline-none transition placeholder:text-[#777777] focus:border-black/[0.14] dark:bg-white/[0.08] dark:text-[#f5f5f2] dark:placeholder:text-[#a0a09b] dark:focus:border-white/[0.18]"
      />
    </label>
  );
}

export function SubmitButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & ChildrenProps) {
  return (
    <button
      {...props}
      data-melius-ui-id="contact-submit-button"
      data-melius-ui-role="button"
      className="h-10 w-full rounded-full bg-[#0f0f12] px-6 text-[14px] font-semibold leading-none text-white transition hover:bg-[#1a1a21] active:scale-[0.98] disabled:cursor-default disabled:opacity-72 md:w-[240px] dark:bg-[#f5f5f2] dark:text-[#0f0f12] dark:hover:bg-white"
    >
      {children}
    </button>
  );
}
