import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import type { JSX } from 'react'
import type { BaseStepperProps, ItemFrameProps, ListItemContent, ListSection, ListSectionStepperProps, ResourceLinksProps, SectionShellProps, StepDetailCardProps, StepNavigationProps, StepperStep } from './types'
import { sectionContainerSx, transparentItemFrameSx, stepOverlineSx, stepDescriptionSx, contentCardSx, stepTitleSx, StyledConnector, sharedStepperSx } from './styles'

function SectionShell({
  title,
  subtitle,
  children,
  gap = 2,
}: SectionShellProps): JSX.Element {
  return (
    <Box sx={{ ...sectionContainerSx, gap }}>
      <Box sx={{ display: 'grid', gap: 0.5 }}>
        <Typography variant="h5">{title}</Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>

      {children}
    </Box>
  )
}

function ItemFrame({ title, description, children }: ItemFrameProps): JSX.Element {
  return (
    <Box sx={transparentItemFrameSx}>
      <Box sx={{ display: 'grid', gap: 0.5 }}>
        <Typography variant="overline" sx={stepOverlineSx}>
          {title}
        </Typography>

        {description ? <Typography sx={stepDescriptionSx}>{description}</Typography> : null}
      </Box>

      {children}
    </Box>
  )
}



function StepDetailCard({
  overline,
  title,
  description,
  children,
}: StepDetailCardProps): JSX.Element {
  return (
    <Box sx={contentCardSx}>
      {overline ? (
        <Typography variant="overline" sx={stepOverlineSx}>
          {overline}
        </Typography>
      ) : null}

      <Typography variant="h6" sx={stepTitleSx}>
        {title}
      </Typography>

      {description ? <Typography sx={stepDescriptionSx}>{description}</Typography> : null}

      {children}
    </Box>
  )
}



function StepNavigation({
  activeStep,
  isLastStep,
  onBack,
  onNext,
  onReset,
}: StepNavigationProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={activeStep === 0}
        sx={{
          borderColor: 'var(--green-strong)',
          color: 'var(--green-strong)',
          borderRadius: '999px',
          textTransform: 'none',
        }}
      >
        Back
      </Button>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="text"
          onClick={onReset}
          sx={{
            color: 'var(--green-strong)',
            textTransform: 'none',
          }}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          onClick={onNext}
          sx={{
            borderRadius: '999px',
            textTransform: 'none',
            backgroundColor: 'var(--blue-strong)',
            color: 'var(--white)',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'var(--blue-strong)',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--peach-strong)',
              color: 'var(--color-text-secondary)',
            },
          }}
        >
          {isLastStep ? 'Complete' : 'Next'}
        </Button>
      </Box>
    </Box>
  )
}



function BaseStepper<TStep>({
  steps,
  initialStep = 0,
  getStepId,
  getStepLabel,
  renderStepPanel,
  showCompletedMessage = false,
}: BaseStepperProps<TStep>): JSX.Element {
  const [activeStep, setActiveStep] = useState(initialStep)
  const [completedStepIds, setCompletedStepIds] = useState<Array<string>>([])

  const activeStepContent = steps[activeStep]
  const isLastStep = activeStep === steps.length - 1
  const completedLookup = useMemo(() => new Set(completedStepIds), [completedStepIds])

  const markCurrentStepComplete = (): void => {
    const currentStep = steps[activeStep]

    if (!currentStep) return

    const currentStepId = getStepId(currentStep)

    if (completedLookup.has(currentStepId)) return

    setCompletedStepIds((previousIds) => [...previousIds, currentStepId])
  }

  const handleStepSelect = (stepIndex: number): void => {
    setActiveStep(stepIndex)
  }

  const handleNext = (): void => {
    markCurrentStepComplete()

    if (!isLastStep)  setActiveStep((previousStep) => previousStep + 1)
  }

  const handleBack = (): void => {
    setActiveStep((previousStep) => Math.max(previousStep - 1, 0))
  }

  const handleReset = (): void => {
    setCompletedStepIds([])
    setActiveStep(0)
  }

  const allStepsCompleted = steps.length > 0 && completedStepIds.length === steps.length

  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        alternativeLabel
        connector={<StyledConnector />}
        sx={sharedStepperSx}
      >
        {steps.map((step, stepIndex) => {
          const stepId = getStepId(step)
          const isCompleted = completedLookup.has(stepId)

          return (
            <Step key={stepId} completed={isCompleted}>
              <StepButton color="inherit" onClick={() => handleStepSelect(stepIndex)}>
                <StepLabel>{getStepLabel(step)}</StepLabel>
              </StepButton>
            </Step>
          )
        })}
      </Stepper>

      <Collapse in mountOnEnter unmountOnExit timeout={320}>
        {activeStepContent ? renderStepPanel(activeStepContent, activeStep) : null}
      </Collapse>

      <StepNavigation
        activeStep={activeStep}
        isLastStep={isLastStep}
        onBack={handleBack}
        onNext={handleNext}
        onReset={handleReset}
      />

      {showCompletedMessage && allStepsCompleted ? (
        <Typography
  sx={{
    color: 'var(--green-strong)',
    fontWeight: 500,
    textAlign: 'center',
  }}
>
          Good work!
        </Typography>
      ) : null}
    </Box>
  )
}


function ResourceLinks({ links }: ResourceLinksProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      {links.map((link) => (
        <Button
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 0,
            py: 0,
            minWidth: 0,
            color: '#2ba6bf97',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
              color: '#2ba6bf97',
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  )
}

type WiringSectionStepperProps = {
  section: ListSection
}

export function WiringSectionStepper({
  section,
}: WiringSectionStepperProps): JSX.Element {
  return (
    <SectionShell title={section.title} subtitle={section.subtitle} gap={2.5}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {section.items.map((item) => (
          <ItemFrame
            key={item.id}
            title={item.title ?? ""}
            description={item.description}
          >
{item.stepperSteps && item.stepperSteps.length > 0 ? (
  <BaseStepper<StepperStep>
    steps={item.stepperSteps}
    getStepId={(step) => step.id}
    getStepLabel={(step) => step.label}
    renderStepPanel={(step, stepIndex) => (
      <StepDetailCard
        overline={`Step ${stepIndex + 1}`}
        title={step.label}
        description={step.description}
      >
        {step.content ? (
          <Box sx={{ color: 'var(--color-text-primary)' }}>{step.content}</Box>
        ) : null}
      </StepDetailCard>
    )}
    showCompletedMessage
  />
) : null}
          </ItemFrame>
        ))}
      </Box>
    </SectionShell>
  )
}

export function ListSectionStepper({
  section,
  initialStep = 0,
}: ListSectionStepperProps): JSX.Element {
  return (
    <SectionShell title={section.title} subtitle={section.subtitle}>
      <BaseStepper<ListItemContent>
        steps={section.items}
        initialStep={initialStep}
        getStepId={(step) => step.id}
        getStepLabel={(step) => step.title ?? ""}
        renderStepPanel={(step, stepIndex) => (
          <StepDetailCard
            overline={`Step ${step.number ?? stepIndex + 1}`}
            title={step.title ?? ""}
            description={step.description}
          >
            {step.links && step.links.length > 0 ? <ResourceLinks links={step.links} /> : null}
          </StepDetailCard>
        )}
        showCompletedMessage
      />
    </SectionShell>
  )
}