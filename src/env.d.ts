/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_VALUE_PROPOSITION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
