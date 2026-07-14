import {defineField, defineType} from 'sanity'

export const contentImage = defineType({
  name: 'contentImage',
  title: '이미지',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: '이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('이미지를 선택해주세요.'),
    }),
    defineField({
      name: 'alt',
      title: '대체 텍스트',
      type: 'string',
      description:
        '이미지를 볼 수 없는 사용자에게 전달할 의미 있는 시각 정보를 설명해주세요. 키워드 나열은 피해주세요.',
      validation: (Rule) =>
        Rule.required()
          .custom((value) => {
            if (typeof value !== 'string' || !value.trim()) {
              return '대체 텍스트를 입력해주세요.'
            }

            return true
          })
          .max(180)
          .error('대체 텍스트는 180자 이내로 입력해주세요.'),
    }),
    defineField({
      name: 'caption',
      title: '캡션',
      type: 'text',
      rows: 2,
      description: '이미지 아래에 표시할 짧은 설명입니다. 필요한 경우에만 입력해주세요.',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'alt',
      subtitle: 'caption',
    },
    prepare({media, title, subtitle}) {
      return {
        media,
        title: title || '대체 텍스트 없음',
        subtitle: subtitle || '캡션 없음',
      }
    },
  },
})
