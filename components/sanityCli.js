import { createClient } from "next-sanity";

const client = createClient({
  projectId: "imbz32xt",
  dataset: "production",
  apiVersion: "2022-10-26",
  useCdn: false,
  token:
    "skJDOTCVPRu9NVmemPpspdJmOUoCAfERYfv5DD5eizF66RonLfMRmS511iNDbY1Erq6sfc0FgTxu1UGoOa9fYvUKPIhVWsyAoG8YzgmV91DbWjz9csnHmhgL8bvZqVT5X0L4wxy1E1wqtsC8ijInVYzrGzvgmn0TJLVwSO08aeTz2nhTcoa7",
});

export default client;
