import { Box } from "@chakra-ui/react/box";
import { Spinner } from "@chakra-ui/react/spinner";

export const Loading = () => (
  <Box p={4} display="flex" alignItems="center" justifyContent="center">
    <Spinner size="lg" />
  </Box>
);
