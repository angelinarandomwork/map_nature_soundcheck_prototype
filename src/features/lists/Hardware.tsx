import type { FC } from 'react'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import type { HardwareItemProps, HardwareListProps, ResourceLink, SectionHeaderProps } from './types'

export const HardwareList: FC<HardwareListProps> = ({ section }) => {
  return (
    <Stack spacing={1}>
      <SectionHeader title={section.title} subtitle={section.subtitle} />

      <Box component="ul" sx={{ pl: 3, m: 0 }}>
        <Stack spacing={1}>
          {section.items.map((item) => (
            <HardwareItem key={item.id} item={item} />
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h5">{title}</Typography>
      {subtitle ? (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
  )
}



const HardwareItem: FC<HardwareItemProps> = ({ item }) => {
  return (
    <Box component="li">
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {item.number ? `${item.number}. ` : ''}
            {item.title}
          </Typography>

          {item.badge ? <Chip label={item.badge} size="small" color="primary" /> : null}
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>

        {item.links && item.links.length > 0 ? <ResourceLinks links={item.links} /> : null}
      </Stack>
    </Box>
  )
}

type ResourceLinksProps = {
  links: Array<ResourceLink>
}

const ResourceLinks: FC<ResourceLinksProps> = ({ links }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
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
    </Stack>
  )
}