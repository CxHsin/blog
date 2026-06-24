export const defaultLang = 'zh' as const

export type Lang = typeof defaultLang

export const ui = {
  zh: {
    'nav.blog': 'Blog',
    'nav.notes': 'Notes',
    'nav.curated': 'Curated',
    'nav.projects': 'Projects',
    'nav.links': 'Links',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.search': 'Search',
    'nav.toggleMenu': 'Menu',
    'nav.toggleDarkMode': 'Toggle theme',
    'notice.translating': 'This site currently keeps the Chinese interface only.',
    'home.title': 'Home'
  }
} as const

export function getLangFromUrl(_url: URL | string): Lang {
  return defaultLang
}

export function useTranslations(_lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[defaultLang][key]
  }
}

export function localizedPath(path: string, _lang: Lang = defaultLang): string {
  return path
}
