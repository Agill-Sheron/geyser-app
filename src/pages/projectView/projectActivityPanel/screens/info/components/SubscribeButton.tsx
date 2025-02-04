import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PiWarningCircleFill } from 'react-icons/pi'

import { SubscribeIcon } from '../../../../../../components/icons'
import { CardLayout } from '../../../../../../components/layouts'
import { Body2 } from '../../../../../../components/typography'
import { BetaBox } from '../../../../../../components/ui'
import {
  FlashsubscribeUrl,
  projectFlashIds,
  projectsWithSubscription,
  subscriptionFeedbackUrl,
} from '../../../../../../constants'
import { useModal } from '../../../../../../hooks'
import { useCustomTheme } from '../../../../../../utils'

interface SubscribeButtonProps extends ButtonProps {
  projectName: string
  projectTitle: string
  noIcon?: boolean
}

export const SubscribeButton = ({ projectName, projectTitle, noIcon, ...props }: SubscribeButtonProps) => {
  const { t } = useTranslation()
  const subscribeModal = useModal()
  const { colors } = useCustomTheme()

  const [renderIframe, setRenderIframe] = useState(false)

  const handleClose = () => {
    subscribeModal.onClose()
    setRenderIframe(false)
  }

  const isSubscriptionEnabled = projectsWithSubscription.includes(projectName)

  if (!isSubscriptionEnabled) {
    return null
  }

  const flashId = projectFlashIds[projectName]

  const handleSubscribeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    subscribeModal.onOpen()
  }

  return (
    <>
      <Button
        variant="primary"
        backgroundColor={'secondary.orange'}
        leftIcon={!noIcon ? <SubscribeIcon /> : undefined}
        onClick={handleSubscribeClick}
        {...props}
      >
        {t('Subscribe')}
      </Button>
      <Modal isCentered size="lg" {...subscribeModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={0}>
          <Box borderRadius="8px" bg="neutral.0">
            {!renderIframe && (
              <ModalHeader pb={2}>
                {`${t('Subscribe to')} ${projectTitle}`} <BetaBox />
              </ModalHeader>
            )}
            <ModalCloseButton />
            <ModalBody height={renderIframe ? '800px' : 'auto'} p={renderIframe ? '0' : '20px'}>
              {renderIframe ? (
                <iframe
                  src={`${FlashsubscribeUrl}?flashId=${flashId}`}
                  width="100%"
                  height="100%"
                  title="Geyser Subscribe"
                />
              ) : (
                <VStack alignItems={'start'} spacing="20px">
                  <CardLayout p="10px 20px" direction="row">
                    <PiWarningCircleFill color={colors.primary[500]} size="30px" />
                    <VStack flex="1">
                      <Body2>
                        {t(
                          "This feature is in beta, it's important to note that contributions will not be recorded with your Geyser account but will instead be recorded with your Flash account. ",
                        )}
                      </Body2>
                      <Body2>
                        {t(
                          'Currently, this feature is only compatible with NWC wallets, which include Alby, Mutinity, and the Umbrel node wallets.',
                        )}
                      </Body2>
                      <Body2>
                        <Trans i18nKey="For more information and to drop your feedback please follow this  <1>link</1>.">
                          For more information and to drop your feedback please follow this{' '}
                          <Link isExternal href={subscriptionFeedbackUrl} fontWeight={700} textDecoration={'none'}>
                            link
                          </Link>
                          .
                        </Trans>
                      </Body2>
                    </VStack>
                  </CardLayout>
                  <Body2>
                    <Trans
                      i18nKey="Subscribe to the <1>{{PROJECT_NAME}}</1> with recurring payments to ensure your continuous support for the project. By choosing a subscription model, you'll automatically contribute to the project on a regular basis."
                      values={{ PROJECT_NAME: projectTitle }}
                    >
                      {'Subscribe to the '}
                      <strong>{'{{PROJECT_NAME}}'}</strong>
                      {
                        " with recurring payments to ensure your continuous support for the project. By choosing a subscription model, you'll automatically contribute to the project on a regular basis."
                      }
                    </Trans>
                  </Body2>
                  <HStack w="full">
                    <Button flex={1} variant="primaryNeutral" onClick={handleClose}>
                      {t('Cancel')}
                    </Button>
                    <Button flex={1} variant="primary" onClick={() => setRenderIframe(true)}>
                      {t('Continue')}
                    </Button>
                  </HStack>
                </VStack>
              )}
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
