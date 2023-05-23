import React from 'react'
import { Heading, SectionList, useColorMode } from 'native-base'
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
  episodes[]->{
    "audioURL": audio.asset->url,
    _createdAt,
    name,
    description,
    _id,
  },
}
`
export const podcastsZ = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    imageURL: z.string(),
  })
)

// function PodcastGallery() {
//   const { navigate } = useNavigation()
//   const { isLoading, error, data, refetch } = useGetContent<typeof PodcastsZ>(
//     'podcasts',
//     PodcastsZ,
//     query
//   )
//   return (
//     <VStack alignItems="center">
//       <HStack justifyContent="space-between">
//         {podcasts.sections[0].data.map((value) => (
//           <Pressable
//             key={value.title}
//             onPress={() => navigate('Episodes', { title: value.title })}
//           >
//             {({ isHovered, isFocused, isPressed }) => (
//               <Image
//                 accessibilityLabel={`Go to ${value.title}`}
//                 marginTop={2}
//                 borderRadius={8}
//                 source={{
//                   uri: value.image,
//                 }}
//                 alt="Alternate Text"
//                 size="md"
//                 margin={1}
//                 style={{
//                   transform: [
//                     {
//                       scale: isPressed ? 0.86 : 1,
//                     },
//                   ],
//                 }}
//               />
//             )}
//           </Pressable>
//         ))}
//       </HStack>
//       <HStack justifyContent="space-between">
//         {podcasts.sections[0].data.map((value) => (
//           <Pressable
//             key={value.title}
//             onPress={() => navigate('Episodes', { title: value.title })}
//           >
//             {({ isHovered, isFocused, isPressed }) => (
//               <Image
//                 accessibilityLabel={`Go to ${value.title}`}
//                 marginTop={2}
//                 borderRadius={8}
//                 source={{
//                   uri: value.image,
//                 }}
//                 alt="Alternate Text"
//                 size="md"
//                 margin={1}
//                 style={{
//                   transform: [
//                     {
//                       scale: isPressed ? 0.86 : 1,
//                     },
//                   ],
//                 }}
//               />
//             )}
//           </Pressable>
//         ))}
//       </HStack>
//     </VStack>
//   )
// }

export default function Podcasts({
  navigation,
}: PodcastStackScreenProps<'Podcasts'>) {
  const {
    isLoading,
    error,
    data: podcasts,
  } = useGetContent<typeof podcastsZ>('podcasts', podcastsZ, query)
  const { toggleColorMode } = useColorMode()

  // convert PodcastsZ data to the format that SectionList expects
  const sections = [
    {
      data:
        podcasts?.map(({ name, _id, description, imageURL }) => ({
          title: name,
          id: _id,
          description,
          image: imageURL,
          category: 'News',
          latestEpisodeDurationInSeconds: 820,
          latestEpisodeDateCreated: '2020-01-01',
        })) ?? [],
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
