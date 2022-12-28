import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="0"
      right="0"
      m="1rem"
    >
      {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default ToggleColorMode;
