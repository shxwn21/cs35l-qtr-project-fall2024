function getCookie(name: string): string | null {
  const dc = document.cookie;
  const prefix = name + "=";
  let begin = dc.indexOf("; " + prefix);
  let end = 0;
  if (begin === -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
  }

  end = document.cookie.indexOf(";", begin);
  if (end === -1) {
    end = dc.length;
  }

  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
} 

export default getCookie;