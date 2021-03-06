
const Command = require("../prototypes/command.js");
const CommandData = require("../prototypes/command_data.js");
const commandPermissions = require("../command_permissions.js");

const commandData = new CommandData("UNSUBSCRIBE_FROM_GAME");

module.exports = UnsubscribeFromGameCommand;

function UnsubscribeFromGameCommand()
{
    const unsubscribeFromGameCommand = new Command(commandData);

    unsubscribeFromGameCommand.addBehaviour(_behaviour);

    unsubscribeFromGameCommand.addRequirements(
        commandPermissions.assertMemberIsTrusted,
        commandPermissions.assertCommandIsUsedInGameChannel
    );

    return unsubscribeFromGameCommand;
}

function _behaviour(commandContext)
{
    const gameObject = commandContext.getGameTargetedByCommand();
    const discordEnvironment = gameObject.getDiscordEnvironment();
    const gameRole = discordEnvironment.getDiscordJsRole();
    const guildMemberWrapper = commandContext.getSenderGuildMemberWrapper();

    return guildMemberWrapper.removeRole(gameRole)
    .then(() => commandContext.respondToCommand(`The game's role has been removed from you.`));
}