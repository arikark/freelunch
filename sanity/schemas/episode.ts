import {defineType} from 'sanity'

const episode = defineType({
  name: 'episode',
  type: 'document',
  title: 'Episode',
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
      name: 'podcast',
      type: 'reference',
      title: 'Podcast',
      to: [
        {
          type: 'podcast',
        },
      ],
    },
    {
      name: 'audio',
      type: 'file',
      title: 'Audio',
    },
    {
      name: 'durationInSeconds',
      type: 'number',
      title: 'Duration In Seconds',
    },
  ],
})

export default episode
