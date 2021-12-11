export const highlightText = (originStr, query) => {
  if (originStr && query) {
    const indexStart = originStr.toLowerCase().indexOf(query.toLowerCase());

    if (indexStart === -1) return originStr;

    const beforeStr = originStr.substring(0, indexStart);
    const middle = originStr.substring(
      beforeStr.length,
      beforeStr.length + query.length
    );
    const afterStr = originStr.substring(beforeStr.length + query.length);

    return (
      beforeStr +
      '<mark style="background-color: yellow; padding: 0"">' +
      middle +
      "</mark>" +
      afterStr
    );
  }
};

export const parseJwt = (token) => {
  try {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0)?.toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};
