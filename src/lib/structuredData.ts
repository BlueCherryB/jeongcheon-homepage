import { attorneyProfile } from "@/data/attorney";
import { officeContact } from "@/data/contact";
import { practiceAreas } from "@/data/practice";
import { getSanityImageUrl } from "@/lib/cms/sanityImage";
import { getProductionSiteUrl } from "@/lib/site";
import type { CaseStudyDetail } from "@/types/content/caseStudy";

export type JsonLdPrimitive = string | number | boolean | null;

export type JsonLdValue = JsonLdPrimitive | JsonLdObject | JsonLdValue[];

export type JsonLdObject = {
  [key: string]: JsonLdValue | undefined;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleStructuredDataInput = {
  caseStudy: CaseStudyDetail;
  path: string;
  description: string;
  keywords: string[];
  articleBody?: string;
};

const schemaContext = "https://schema.org";
const siteName = "\ubc95\ub960\uc0ac\ubb34\uc18c \uc815\ucc9c";
const language = "ko-KR";

function getCanonicalSiteUrl(): string {
  return getProductionSiteUrl();
}

export function buildCanonicalUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getCanonicalSiteUrl()}${normalizedPath}`;
}

function buildImageUrl(path: string): string {
  return buildCanonicalUrl(path);
}

function buildOfficeAddress(): JsonLdObject {
  return {
    "@type": "PostalAddress",
    streetAddress: officeContact.address,
  };
}

function getOrganizationId(): string {
  return `${getCanonicalSiteUrl()}/#organization`;
}

function getLegalServiceId(): string {
  return `${getCanonicalSiteUrl()}/#legal-service`;
}

function getWebsiteId(): string {
  return `${getCanonicalSiteUrl()}/#website`;
}

function getAttorneyPersonId(): string {
  return `${buildCanonicalUrl("/attorney")}#person`;
}

function isValidDate(value: string | undefined): value is string {
  return Boolean(value && !Number.isNaN(Date.parse(value)));
}

export function buildGlobalStructuredData(): JsonLdObject {
  const siteUrl = `${getCanonicalSiteUrl()}/`;
  const organizationId = getOrganizationId();
  const legalServiceId = getLegalServiceId();

  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": getWebsiteId(),
        url: siteUrl,
        name: siteName,
        inLanguage: language,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: siteUrl,
        telephone: officeContact.phoneDisplay,
        email: officeContact.email,
        address: buildOfficeAddress(),
      },
      {
        "@type": "LegalService",
        "@id": legalServiceId,
        name: siteName,
        url: siteUrl,
        telephone: officeContact.phoneDisplay,
        email: officeContact.email,
        address: buildOfficeAddress(),
        serviceType: practiceAreas.map((area) => area.title),
        parentOrganization: {
          "@id": organizationId,
        },
      },
    ],
  };
}

export function buildBreadcrumbStructuredData(
  path: string,
  items: BreadcrumbItem[],
): JsonLdObject {
  return {
    "@context": schemaContext,
    "@type": "BreadcrumbList",
    "@id": `${buildCanonicalUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildAttorneyPageStructuredData(): JsonLdObject {
  const attorneyUrl = buildCanonicalUrl("/attorney");

  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "Person",
        "@id": getAttorneyPersonId(),
        name: attorneyProfile.name,
        jobTitle: attorneyProfile.role,
        image: buildImageUrl(attorneyProfile.imageSrc),
        description: attorneyProfile.seoDescription,
        url: attorneyUrl,
        mainEntityOfPage: {
          "@id": attorneyUrl,
        },
        worksFor: {
          "@id": getLegalServiceId(),
        },
        knowsAbout:
          attorneyProfile.specialties.length > 0
            ? attorneyProfile.specialties
            : undefined,
      },
      buildBreadcrumbStructuredData("/attorney", [
        { name: "\ud648", path: "/" },
        { name: "\ubcc0\ud638\uc0ac \uc18c\uac1c", path: "/attorney" },
      ]),
    ],
  };
}

export function buildCaseStudyArticleStructuredData({
  caseStudy,
  path,
  description,
  keywords,
  articleBody,
}: ArticleStructuredDataInput): JsonLdObject {
  const url = buildCanonicalUrl(path);
  const imageUrl = getSanityImageUrl(caseStudy.image, {
    width: 1200,
    quality: 85,
  });

  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: caseStudy.title,
        description,
        datePublished: isValidDate(caseStudy.publishedAt)
          ? caseStudy.publishedAt
          : undefined,
        articleSection: caseStudy.categoryLabel,
        keywords: keywords.length > 0 ? keywords : undefined,
        articleBody: articleBody || undefined,
        image: imageUrl ? [imageUrl] : undefined,
        mainEntityOfPage: {
          "@id": url,
        },
        author: {
          "@id": getLegalServiceId(),
        },
        publisher: {
          "@id": getOrganizationId(),
        },
        url,
      },
      buildBreadcrumbStructuredData(path, [
        { name: "\ud648", path: "/" },
        { name: "\uc218\ud589\uc0ac\ub840", path: "/cases" },
        { name: caseStudy.title, path },
      ]),
    ],
  };
}
