import PieChart from 'react-native-pie-chart'
import { Box, Center, Divider, HStack, Text, VStack } from 'native-base'

const widthAndHeight = 200
const series = [13, 13, 24, 50]
const sliceColor = ['#ffb300', '#ff9100', '#ff6c00', 'transparent']

const TableData = [
  {
    category: 'Substantive Law',
    completed: 1,
    applied: 2,
    remaining: 3,
  },
  {
    category: 'Professional Skills',
    completed: 1,
    applied: 2,
    remaining: 3,
  },
  {
    category: 'Ethics & Professional Responsibility',
    completed: 1,
    applied: 2,
    remaining: 3,
  },
  {
    category: 'Practice Management & Business Skills',
    completed: 1,
    applied: 2,
    remaining: 3,
  },
]

export function Overview() {
  return (
    <Center h="100%">
      {/* fill center of pie chart with text */}
      <Center mb={8}>
        <Box
          position="absolute"
          zIndex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="2xl">Completed</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {(50 / 100) * 100}%
          </Text>
        </Box>

        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.8}
          coverFill={null}
        />
      </Center>

      <VStack space={3} divider={<Divider />} w="100%">
        {TableData.map((data, index) => (
          <HStack justifyContent="space-between" key={data.category}>
            <VStack alignItems="start" flex={2}>
              <Text>{data.category}</Text>
            </VStack>

            <VStack alignItems="center" flex={1}>
              <Text>{data.completed}</Text>
            </VStack>

            <VStack alignItems="center" flex={1}>
              <Text>{data.applied}</Text>
            </VStack>

            <VStack alignItems="center" flex={1}>
              <Text>4</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Center>
  )
}
