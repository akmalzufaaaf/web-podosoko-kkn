import { defineType } from 'sanity'

export const customBlock = defineType({
  title: 'Block',
  name: 'customBlock',
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 2', value: 'h2' },
    { title: 'Heading 3', value: 'h3' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [{ title: 'Strong', value: 'strong' }],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'URL',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url',
          },
        ],
      },
    ],
  },
})
