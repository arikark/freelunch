import React from 'react'
import { Heading, SectionList } from 'native-base'
import { z } from 'zod'

import { Layout } from '../components/Layout'
import { PodcastMenuItem } from '../components/PodcastMenuItem'
import { useGetContent } from '../hooks/useGetContent'
import { PodcastStackScreenProps } from '../types'

const query = `*[_type == "podcast"]{
  name,
  _id,
  description,
  "imageURL": image.asset->url,
  "latestEpisodeDurationInSeconds": *[_type == "episode" && references(^._id, "episode") ] | order(_createdAt desc)[0].durationInSeconds,
  "latestEpisodeDateCreated": *[_type == "episode" && references(^._id, "episode") ] | order(_createdAt desc)[0]._createdAt,
}
`
export const podcastsZ = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    imageURL: z.string(),
    latestEpisodeDurationInSeconds: z.number(),
    latestEpisodeDateCreated: z.string(),
  })
)

export default function Podcasts({
  navigation,
}: PodcastStackScreenProps<'Podcasts'>) {
  const {
    isLoading,
    error,
    data: podcasts,
  } = useGetContent<typeof podcastsZ>('podcasts', podcastsZ, query)

  // convert PodcastsZ data to the format that SectionList expects
  const sections = [
    {
      data:
        podcasts?.map(
          ({
            name,
            _id,
            description,
            imageURL,
            latestEpisodeDurationInSeconds,
            latestEpisodeDateCreated,
          }) => ({
            title: name,
            id: _id,
            description,
            image: imageURL,
            category: 'News',
            latestEpisodeDurationInSeconds,
            latestEpisodeDateCreated,
          })
        ) ?? [],
    },
  ]

  return (
    <Layout isLoading={isLoading} error={error}>
      <Heading>Podcasts</Heading>

      <SectionList
        sections={sections}
        // ListHeaderComponent={() => <PodcastGallery />}
        data={sections}
        renderItem={({ item, index }) => (
          <PodcastMenuItem
            {...item}
            mb={index === sections[0].data.length - 1 ? '30%' : 0}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title.toString()}
      />
    </Layout>
  )
}
