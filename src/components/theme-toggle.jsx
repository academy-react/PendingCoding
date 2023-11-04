import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

import { useTheme } from "./providers/theme-provider";

import { cn } from "../../libs/utils";

export const ThemeToggle = () => {
  const whiteCircle = useAnimationControls();
  const blackCircle = useAnimationControls();
  const { isDarkTheme, toggleThemeHandler } = useTheme();

  useEffect(() => {
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
  }, [isDarkTheme]);

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
          "absolute right-8 w-10 h-10 rounded-full bg-gray-200 group-hover:bg-gray-50 border-2 border-gray-400 group-hover:border-gray-500 transition",
          !isDarkTheme && "z-10"
        )}
      />
      <motion.div
        animate={blackCircle}
        className={cn(
          "absolute left-8 w-10 h-10 rounded-full bg-gray-600 group-hover:bg-gray-700 transition",
          isDarkTheme && "z-10"
        )}
      />
    </div>
  );
};
