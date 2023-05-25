import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Input,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import * as yup from 'yup'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter a valid email address'),
  password: yup.string().required('Senha é obrigatória'),
})

export function LoginScreen() {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log(values)
    setIsLoading(true)
    // const result = await signIn(values)
    setIsLoading(false)
    // if (!result.success) Alert.alert('', result.message)
  }

  return (
    <Center height="full">
      <VStack width="full" p={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(e) => handleSubmit(e)}
        >
          {({
            handleChange,
            handleBlur,
            errors,
            touched,
            handleSubmit,
            values,
            submitCount,
          }) => (
            <Box width="full">
              <Heading size="lg" color="black" mb="10">
                Login
              </Heading>
              <FormControl isInvalid={Boolean(errors.email && touched.email)}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  color="black"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="E-mail"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml={2}
                      color="muted.400"
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.password && touched.password)}
              >
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  color="black"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  type={visiblePassword ? 'text' : 'password'}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml={2}
                      color="muted.400"
                    />
                  }
                  InputRightElement={
                    <IconButton
                      icon={
                        <Icon
                          as={
                            <MaterialIcons
                              name={
                                visiblePassword
                                  ? 'visibility-off'
                                  : 'visibility'
                              }
                              onPress={() =>
                                setVisiblePassword(!visiblePassword)
                              }
                            />
                          }
                          size={5}
                          ml={2}
                        />
                      }
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                mt="7"
                colorScheme="indigo"
                onPress={() => handleSubmit()}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" animating size="small" />
                ) : (
                  'Submit'
                )}
              </Button>
            </Box>
          )}
        </Formik>
      </VStack>
    </Center>
  )
}
