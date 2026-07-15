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
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({media}) {
      return {
        media,
        title: '판결문 이미지',
      }
    },
  },
})
