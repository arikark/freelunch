import { Container, Heading, Image, Text } from 'native-base'

export function PlayerBar({
  image,
  title,
  series,
}: {
  image: string
  title: string
  series: string
}) {
  return (
    <Container
      width="100%"
      flexDir="row"
      position="absolute"
      bottom={81}
      left={0}
      right={0}
      zIndex={1000}
      bgColor="red.100"
      h="40px"
      w="900px"
    >
      <Image source={{ uri: image }} />
      <Heading size="xs">{series}</Heading>
      <Text>{title}</Text>
    </Container>
  )
}
