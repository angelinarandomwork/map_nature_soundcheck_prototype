import { useState, type JSX } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { AccordionItemProps } from './types';
import './accordion-section.css'

export const AccordionItem = ({
    title,
    children,
    defaultOpen = false,
    disabled = false,
}: AccordionItemProps): JSX.Element => {
    const [open, setOpen] = useState(defaultOpen)

    const toggleOpen = () => {
        if (disabled) return
        setOpen((previousOpen) => !previousOpen)
    }

    return (
        <div className={`accordionItem ${open ? 'accordionItem-open' : ''} ${disabled ? 'accordionItem-disabled' : ''}`}>
            <button
                type="button"
                className="accordionTrigger"
                onClick={toggleOpen}
                aria-expanded={open}
                disabled={disabled}
            >
            <span className="accordionTriggerTitle">{title}</span>

            <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="accordionTriggerIcon"
            >
                <KeyboardArrowDownIcon />
            </motion.span>
            </button>

        <AnimatePresence initial={false}>
            {open && (
            <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{height: { duration: 0.24 }, opacity: { duration: 0.18 }}}
                className="accordionContentWrapper"
            >
                <div className="accordionContent">{children}</div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    )
}