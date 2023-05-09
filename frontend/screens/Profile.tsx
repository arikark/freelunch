import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  Text,
  VStack,
} from 'native-base'

import { ProfileMenuItem } from '../components/ProfileMenuItem'
import { ProfileStackScreenProps } from '../types'

function EditModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (value: boolean) => void
}) {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Contact Us</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false)
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setShowModal(false)
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

type EpisodeProps = {
  image: string
}
const episode: EpisodeProps = {
  image:
    'https://avatoon.net/wp-content/uploads/2022/07/Cartoon-Avatar-White-Background-300x300.png',
}

export default function Profile({
  navigation,
}: ProfileStackScreenProps<'Profile'>) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Box
        h="100%"
        paddingX={4}
        safeAreaTop
        safeAreaX
        variant="layout"
        alignItems="center"
        justifyContent="flex-start"
      >
        <HStack mb={5}>
          <Box flex={0.3} />
          <Box flex={1.6} alignItems="center" justifyContent="center">
            <Heading>My Profile</Heading>
          </Box>
          <Box flex={0.3} alignItems="flex-end">
            <IconButton
              icon={<AntDesign name="edit" size={24} color="white" />}
              onPress={() => setShowModal(true)}
            />
          </Box>
        </HStack>
        <VStack
          alignItems="center"
          minH="60%"
          justifyContent="space-around"
          w="100%"
        >
          <Box alignItems="center">
            <Image
              borderRadius={400}
              source={{
                uri: episode.image,
              }}
              alt="Avatar"
              size={190}
            />
            <Box marginTop={3} alignItems="center">
              <Heading>Tommy Thomanson</Heading>
              <Text>tomthom@gmail.com</Text>
            </Box>
          </Box>
          <HStack
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            p={4}
          >
            <Box
              bgColor="white"
              width={120}
              height={120}
              alignItems="center"
              alignContent="flex-start"
              padding={2}
              borderRadius={400}
              borderLeftWidth={5}
              borderLeftColor="purple.500"
            >
              <Text color="purple.900" fontSize="3xl">
                18
              </Text>
              <Text color="purple.900" fontSize="md" textAlign="center">
                Completed Courses
              </Text>
            </Box>

            <Box
              bgColor="white"
              width={120}
              height={120}
              alignItems="center"
              alignContent="flex-start"
              padding={2}
              borderRadius={400}
              borderLeftWidth={5}
              borderLeftColor="purple.500"
            >
              <Text color="purple.900" fontSize="3xl">
                613
              </Text>
              <Text color="purple.900" fontSize="md" textAlign="center">
                Points Earned
              </Text>
            </Box>
          </HStack>
          <Box h="180px" w="100%">
            <VStack justifyContent="space-evenly">
              <ProfileMenuItem
                label="Your Favourites"
                iconName="hearto"
                onPress={() => navigation.navigate('Favourites')}
              />
              <ProfileMenuItem
                label="Payment"
                iconName="creditcard"
                onPress={() => navigation.navigate('Favourites')}
              />
              <ProfileMenuItem
                label="Tell a Friend"
                iconName="team"
                onPress={() => navigation.navigate('Favourites')}
              />
              <ProfileMenuItem
                label="Settings"
                iconName="setting"
                onPress={() => navigation.navigate('Favourites')}
              />
            </VStack>
          </Box>
        </VStack>
      </Box>
      <EditModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
