import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./providers/theme-provider";

import { cn } from "../../libs/utils";

export const ThemeToggle = () => {
  const whiteCircle = useAnimationControls();
  const blackCircle = useAnimationControls();
  const { isDarkTheme, toggleThemeHandler } = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      whiteCircle.start({
        x: "20px",
        transition: { duration: 0.3 },
      });
      blackCircle.start({
        x: "-20px",
        transition: { duration: 0.3 },
      });
    } else {
      whiteCircle.start({
        x: "40px",
        transition: { duration: 0.3 },
      });
      blackCircle.start({
        x: "0px",
        transition: { duration: 0.3 },
      });
    }
  }, [isDarkTheme, blackCircle, whiteCircle]);

  const handleTheme = () => {
    toggleThemeHandler();
    if (isDarkTheme) {
      whiteCircle.start({
        x: "23px",
        transition: { duration: 0.3 },
      });
      blackCircle.start({
        x: "-23px",
        transition: { duration: 0.3 },
      });
    } else {
      whiteCircle.start({
        x: "5px",
        transition: { duration: 0.3 },
      });
      blackCircle.start({
        x: "5px",
        transition: { duration: 0.3 },
      });
    }
  };

  return (
    <div
      onClick={handleTheme}
      className="group px-10 relative flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={whiteCircle}
        className={cn(
          "absolute right-8 opacity-0 text-gray-200 dark:group-hover:text-gray-300 dark:group-hover:text-gray-300/80 transition",
          isDarkTheme && "z-10 opacity-100"
        )}
      >
        <Moon className="w-9 h-9" />
      </motion.div>
      <motion.div
        animate={blackCircle}
        className={cn(
          "absolute left-8 opacity-0 text-yellow-400 group-hover:text-yellow-500/80 transition",
          !isDarkTheme && "z-10 opacity-100"
        )}
      >
        <Sun className="w-9 h-9" />
      </motion.div>
    </div>
  );
};
