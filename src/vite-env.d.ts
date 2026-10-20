/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_STRIPE_LINK_DAILY2?: string;
  readonly VITE_STRIPE_LINK_DAILY5?: string;
  readonly VITE_STRIPE_LINK_DAILY10?: string;
  readonly VITE_STRIPE_LINK_DAILY20?: string;
  readonly VITE_INTAKE_FORM_ENDPOINT?: string;
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }
