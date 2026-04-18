import { Box } from "@mui/material";
import type { Tab } from "./types";

export default function TabSection(props: Tab) {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`solution-details-tabpanel-${index}`}
      aria-labelledby={`solution-details-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </Box>
  );
}
