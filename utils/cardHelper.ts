export function getArticlePoster(poster: string, title?: string) {
  if (poster === 'local') {
    return `/posters/${title}.png`
  } else return poster;
}
