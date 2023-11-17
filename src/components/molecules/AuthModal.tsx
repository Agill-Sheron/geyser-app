import { Box, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../context'
import { ConnectWithFacebook } from '../../pages/auth/ConnectWithFacebook'
import { ConnectWithGithub } from '../../pages/auth/ConnectWithGithub'
import { ConnectWithGoogle } from '../../pages/auth/ConnectWithGoogle'
// import { ConnectWithEmail } from '../../pages/auth/ConnectWithEmail'
import { ConnectWithLightning } from '../../pages/auth/ConnectWithLightning'
import { ConnectWithNostr } from '../../pages/auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../../pages/auth/ConnectWithTwitter'
import {
  hasFacebookAccount,
  hasGithubAccount,
  hasGoogleAccount,
  hasNostrAccount,
  hasTwitterAccount,
  useMobileMode,
} from '../../utils'
import { Caption } from '../typography'
import { ButtonComponent } from '../ui'

interface IAuthModal {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  showTwitter?: boolean
  showNostr?: boolean
  showLightning?: boolean
  showFacebook?: boolean
  showGoogle?: boolean
  showGithub?: boolean
  privateRoute?: boolean
}

const ConnectAccounts = ({
  onClose,
  showTwitter,
  showFacebook,
  showNostr,
  showLightning,
  showGoogle,
  showGithub,
}: any) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  return (
    <VStack justifyContent="center" alignItems="center">
      <Text color="neutral.6002" fontSize="12px" marginBottom={5}>
        {t(
          'Connecting with Twitter or Lightning allows you to keep track of your favorite projects and to launch your own projects.',
        )}
      </Text>
      <Stack width="100%">
        {!hasGithubAccount(user) && showGithub && (
          <ConnectWithGithub onClose={onClose} />
        )}
        {!hasGoogleAccount(user) && showGoogle && (
          <ConnectWithGoogle onClose={onClose} />
        )}
        {!hasFacebookAccount(user) && showFacebook && (
          <ConnectWithFacebook onClose={onClose} />
        )}
        {!hasTwitterAccount(user) && showTwitter && (
          <ConnectWithTwitter onClose={onClose} />
        )}
        {!hasNostrAccount(user) && showNostr && (
          <ConnectWithNostr onClose={onClose} />
        )}
        {showLightning && <ConnectWithLightning onClose={onClose} />}
        {/* <ConnectWithEmail onClose={onClose} /> */}
      </Stack>
      <Caption paddingTop="5px">
        {t(
          "If you're having trouble connecting with Twitter on Mobile, first try logging in on Twitter.com on your browser, then try again.",
        )}
      </Caption>
    </VStack>
  )
}

export const AuthModal = (authModalProps: IAuthModal) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const {
    isOpen,
    onClose,
    title,
    description,
    showTwitter = true,
    showNostr = true,
    showLightning = true,
    showFacebook = true,
    showGoogle = true,
    showGithub = true,
    privateRoute = false,
  } = authModalProps

  const navigate = useNavigate()
  const location = useLocation()

  const handlePrivateRouteModalClose = () => {
    if (privateRoute) {
      if (location.key) {
        navigate(-1)
      } else {
        navigate('/')
      }
    }
  }

  const modalTitle = title || t('Connect')
  const modalDescription = description || t('Connect to launch')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!privateRoute}
      closeOnEsc={!privateRoute}
      onOverlayClick={handlePrivateRouteModalClose}
      onEsc={handlePrivateRouteModalClose}
    >
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            {modalTitle}
          </Text>
        </ModalHeader>
        {privateRoute || <ModalCloseButton />}
        <ModalBody width="100%">
          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginLeft={2}
            marginRight={2}
          >
            {modalDescription && (
              <Text marginBottom={5}>{modalDescription}</Text>
            )}
            <ConnectAccounts
              onClose={onClose}
              showNostr={showNostr && !isMobile}
              showTwitter={showTwitter}
              showLightning={showLightning}
              showFacebook={showFacebook}
              showGoogle={showGoogle}
              showGithub={showGithub}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={5}
          >
            {privateRoute && (
              <ButtonComponent onClick={handlePrivateRouteModalClose}>
                {t(location.key ? 'Go back' : 'Go home')}
              </ButtonComponent>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
