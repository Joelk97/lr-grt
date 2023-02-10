import { definePreview } from "next-sanity/preview";
import { projectId, dataset } from "./sanityCli";

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged im`);
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});
