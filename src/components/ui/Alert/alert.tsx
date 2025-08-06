import { Alert } from "@chakra-ui/react/alert";
import { Box } from "@chakra-ui/react/box";

type AlertCustomProp = {
  description: string;
  title: string;
};

export function AlertCustom({ description, title }: AlertCustomProp) {
  return (
    <Box p={4}>
      <Alert.Root status="error" variant="subtle">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{title}</Alert.Title>
          <Alert.Description>{description}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </Box>
  );
}
