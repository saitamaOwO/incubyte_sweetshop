export function getCookies(raw) {
  const cookies = raw
    ? Object.fromEntries(
        raw.split(";").map((cookie) => {
          const [name, value] = cookie.trim().split("=")
          return [name, decodeURIComponent(value || "")]
        }),
      )
    : {}

  return cookies
}
