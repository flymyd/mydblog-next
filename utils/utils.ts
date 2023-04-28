export function truncateString(str: string, maxLength = 20) {
  const regExp = /<em>(.*?)<\/em>/g;
  let match = regExp.exec(str);
  let emString = '';
  if (match) {
    emString = match[1];
    if (emString.length > maxLength) {
      emString = emString.slice(0, maxLength) + '...';
    }
    emString = '<em>' + emString + '</em>';
  }

  let truncatedLength = maxLength - emString.length;
  let truncatedString = str.slice(0, truncatedLength);

  if (truncatedLength < str.length) {
    truncatedString += '...';
  }

  // 转义无效字符
  truncatedString = truncatedString.replace(/</g, '&lt;');
  truncatedString = truncatedString.replace(/>/g, '&gt;');

  return truncatedString + emString;
}
