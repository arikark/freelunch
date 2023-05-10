import {defineType} from 'sanity'

const podcast = defineType({
  name: 'podcast',
  type: 'document',
  title: 'Podcast',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },

    {
      name: 'episodes',
      type: 'array',
      title: 'Episodes',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'episode',
            },
          ],
        },
      ],
    },
  ],
})

export default podcast
