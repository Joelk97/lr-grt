export default function refToLink(ref) {
  let modRef = ref.substring(6, ref.length).split("-");
  let del = modRef.pop();
  modRef = modRef.join("-");
  let link =
    "https://cdn.sanity.io/images/imbz32xt/production/" + modRef + `.${del}`;
  return link;
}
