
import IconButton from "@mui/material/IconButton";
import type { ExternalIcon } from "./types";

export const ExternalIconLink = ({
    href,
    ariaLabel,
    children,
}: ExternalIcon) => {
    return (
        <IconButton
            aria-label={ariaLabel}
            component="a"
            href={href}
            target="_blank"
            rel="noreferrer"
            sx={{
                width: 36,
                height: 36,
                border: "1px solid rgba(15, 23, 42, 0.08)",
                color: "#0f172a",
            }}
        >
        {children}
        </IconButton>
    );
};
