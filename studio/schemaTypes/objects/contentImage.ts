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
