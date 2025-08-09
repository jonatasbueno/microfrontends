import { Button, type ButtonProps } from '@chakra-ui/react/button';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors } from '@/styles';

type EyeButtonProps = ButtonProps & {
  handleClick: () => void;
};

export function EyeButton({ handleClick, ...props }: EyeButtonProps) {
  return (
    <Button bg={colors.backgroundPrimary} {...props} onClick={handleClick}>
      Ver detalhes <FontAwesomeIcon icon={faEye} />
    </Button>
  );
}
