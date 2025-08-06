import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Flex } from "@chakra-ui/react/flex";

type ButtonProps = {
  title: string;
  onClick: () => void;
};

type PairButtonProps = {
  primary: ButtonProps;
  secondary: ButtonProps;
};

export function PairButton({ primary, secondary }: PairButtonProps) {
  return (
    <Box bg="bg.surface" p={4} borderRadius="md" boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          variant="outline"
          color="primary.500"
          borderColor="primary.500"
          onClick={primary.onClick}
        >
          {primary.title}
        </Button>
        <Button bg="primary.500" onClick={secondary.onClick}>
          {secondary.title}
        </Button>
      </Flex>
    </Box>
  );
}
