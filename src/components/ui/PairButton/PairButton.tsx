import { Box } from '@chakra-ui/react/box';
import { Button } from '@chakra-ui/react/button';
import { Flex } from '@chakra-ui/react/flex';

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
          color="blue.800"
          borderColor={'blue.800'}
          bg="transparent"
          onClick={primary.onClick}
        >
          {primary.title}
        </Button>

        <Button bg="blue.800" onClick={secondary.onClick}>
          {secondary.title}
        </Button>
      </Flex>
    </Box>
  );
}
