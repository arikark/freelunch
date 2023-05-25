import { useState } from 'react'
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
  ScrollView,
  Text,
  VStack,
} from 'native-base'

import { ProfileMenuItem } from './ProfileMenuItem'

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

export function Account({ navigate }: { navigate: any }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <EditModal showModal={showModal} setShowModal={setShowModal} />

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
      <ScrollView>
        <Box alignItems="center" justifyContent="space-around" w="100%" mb={8}>
          <Image
            borderRadius={400}
            source={{
              uri: 'https://avatoon.net/wp-content/uploads/2022/07/Cartoon-Avatar-White-Background-300x300.png',
            }}
            alt="Avatar"
            size={190}
          />
          <Box marginTop={3} alignItems="center">
            <Heading>Tommy Thomanson</Heading>
            <Text>tomthom@gmail.com</Text>
          </Box>
        </Box>
        <Box h="180px" w="100%">
          <VStack justifyContent="space-evenly">
            <ProfileMenuItem
              label="Your Favourites"
              iconName="hearto"
              onPress={() => console.log('Favourites')}
            />
            <ProfileMenuItem
              label="Payment"
              iconName="creditcard"
              onPress={() => console.log('Favourites')}
            />
            <ProfileMenuItem
              label="Tell a Friend"
              iconName="team"
              onPress={() => console.log('Favourites')}
            />
            <ProfileMenuItem
              label="Settings"
              iconName="setting"
              onPress={() => console.log('Favourites')}
            />
          </VStack>
        </Box>
      </ScrollView>
    </>
  )
}
