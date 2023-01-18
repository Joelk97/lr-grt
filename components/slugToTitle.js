export default function slugToTitle(slug) {
  let title = "";
  title = slug.split("-");
  let first = title[0];
  first = first.charAt(0).toUpperCase() + first.slice(1);
  title = title.slice(1);
  title = [first, ...title];
  title = title.join(" ");
  return title;
}
