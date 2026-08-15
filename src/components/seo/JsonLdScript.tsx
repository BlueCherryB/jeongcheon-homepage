import type { JsonLdObject } from "@/lib/structuredData";

type JsonLdScriptProps<T extends JsonLdObject> = {
  id?: string;
  data: T;
};

function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLdScript<T extends JsonLdObject>({
  id,
  data,
}: JsonLdScriptProps<T>) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
