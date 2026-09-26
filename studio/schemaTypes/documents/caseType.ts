import {defineField, defineType} from 'sanity'

export const caseType = defineType({
  name: 'caseType',
  title: '사건 유형',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '사건 유형',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title ?? '제목 없음',
      }
    },
  },
  orderings: [
    {
      name: 'titleAsc',
      title: '가나다순',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
