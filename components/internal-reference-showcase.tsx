import { notFound } from "next/navigation";

import { VpifyShowcase } from "@/components/vpify-showcase";

export function InternalReferenceShowcase() {
  const isEnabled =
    process.env.NEXT_PUBLIC_SHOWCASE_ENABLED === "true" ||
    process.env.NODE_ENV !== "production";

  if (!isEnabled) {
    notFound();
  }

  return <VpifyShowcase />;
}
