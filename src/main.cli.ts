import { CLIApplication, HelpCommand, VersionCommand, ImportCommand, } from './cli/index.js';

const bootstrap = (): void => {
    const cliApplication = new CLIApplication();
    cliApplication.registerCommands([
        new HelpCommand(),
        new VersionCommand(),
        new ImportCommand(),
    ]);

    cliApplication.processCommand(process.argv);
};

bootstrap();