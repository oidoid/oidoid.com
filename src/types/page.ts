/** All data associated with a Markdown file. */
export type Page = {
  readonly meta: Meta
  /** **Unsanitized** HTML. */
  readonly html: string
  readonly type: PageType
  /** Relative canonical URL. */
  readonly url: string
}

export type PageType =
  | 'Homepage'
  | 'Index'
  | 'Log'
  | 'Note'
  | 'Profile'

/** Metadata at the top of a markdown file. */
export type Meta = {
  readonly dateModified: string
  readonly datePublished: string
  readonly keywords: string[]
  readonly headline: string
  readonly hideTitle: boolean
  readonly image?: string | undefined
  readonly title: string
}
