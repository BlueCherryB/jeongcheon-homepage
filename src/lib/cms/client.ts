import { createClient } from "@sanity/client";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/lib/cms/env";

export const publishedSanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
});
