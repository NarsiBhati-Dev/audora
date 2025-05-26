import chalk from "chalk";

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(chalk.blue("[INFO]"), message, ...args);
  },

  warn: (message: string, ...args: any[]) => {
    console.warn(chalk.yellow("[WARN]"), message, ...args);
  },

  error: (message: string, ...args: any[]) => {
    console.error(chalk.red("[ERROR]"), message, ...args);
  },

  debug: (message: string, ...args: any[]) => {
    if (process.env.DEBUG === "true") {
      console.log(chalk.magenta("[DEBUG]"), message, ...args);
    }
  },
};
