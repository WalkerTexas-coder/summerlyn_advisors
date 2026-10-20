/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_STRIPE_LINK_SPRINT?: string;
  readonly VITE_STRIPE_LINK_PILOT?: string;
  readonly VITE_STRIPE_LINK_PRIORITIZE?: string;
  readonly VITE_STRIPE_LINK_RUSH?: string;
  readonly VITE_INTAKE_FORM_ENDPOINT?: string;
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }
