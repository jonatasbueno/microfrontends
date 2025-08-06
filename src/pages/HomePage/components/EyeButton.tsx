import { Button } from "@chakra-ui/react/button";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EyeButtonProps = {
  handleClick: () => void;
};

export function EyeButton({ handleClick }: EyeButtonProps) {
  return (
    <Button bg="primary" onClick={handleClick} borderRadius={"full"}>
      <FontAwesomeIcon icon={faEye} />
    </Button>
  );
}
