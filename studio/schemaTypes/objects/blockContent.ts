import {defineArrayMember, defineField, defineType} from 'sanity'

const allowedAbsoluteUrlPattern = /^https?:\/\/[^\s]+$/i
const allowedMailtoPattern = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i
const allowedInternalPathPattern = /^\/(?!\/)[^\s]*$/

export function isAllowedLinkHref(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false
  }

  const href = value.trim()

  if (!href || href !== value) {
    return false
  }

  return (
    allowedAbsoluteUrlPattern.test(href) ||
    allowedMailtoPattern.test(href) ||
    allowedInternalPathPattern.test(href)
  )
}

const linkValidationMessage =
  'https://, http://, mailto:, 또는 /로 시작하는 내부 경로만 입력해주세요.'

export const blockContent = defineType({
  name: 'blockContent',
  title: '본문',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [{title: 'Bold', value: 'strong'}],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: '링크',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: '링크 주소',
                type: 'string',
                description:
                  'https://, http://, mailto:, 또는 /로 시작하는 내부 경로를 입력해주세요.',
                validation: (Rule) =>
                  Rule.required()
                    .custom((value) => isAllowedLinkHref(value) || linkValidationMessage)
                    .error(linkValidationMessage),
              }),
              defineField({
                name: 'openInNewTab',
                title: '새 창에서 열기',
                type: 'boolean',
                description:
                  '활성화하면 웹사이트 렌더러에서 target="_blank"와 rel="noopener noreferrer"를 적용해야 합니다.',
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
  ],
})
