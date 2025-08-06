import { Button, type ButtonProps } from "@chakra-ui/react/button";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EyeButtonProps = ButtonProps & {
  handleClick: () => void;
};

export function EyeButton({ handleClick, ...props }: EyeButtonProps) {
  return (
    <Button
      bg="primary.500"
      {...props}
      onClick={handleClick}
      borderRadius={"full"}
    >
      <FontAwesomeIcon icon={faEye} />
    </Button>
  );
}
