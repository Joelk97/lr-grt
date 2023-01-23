export default function refToLink(ref) {
  let link =
    "https://cdn.sanity.io/images/imbz32xt/production/" +
    ref.substring(6, ref.length);
  return link;
}
