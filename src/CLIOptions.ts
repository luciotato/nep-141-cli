export const options = {

    accountId: {
        shortName: "acc",
        valueType: "string",
        value: "",
        helpText: `signer accountId`
    },

    masterAccount: {
        shortName: "ma",
        valueType: "string",
        value: "",
        helpText: `master account`
    },

    help: {
        shortName: "h",
        value: false
    },

    info: {
        shortName: "i",
        value: false,
        helpText: 'show configured contract account, default user accountId'
    },

    verbose: {
        shortName: "v",
        helpText: 'Prints out verbose output',
        name: "verbose"
    },

    amount: {
        shortName: "am",
        valueType: "NEAR",
        value: "",
        helpText: `attach NEAR tokens to this call. Example: --amount 100N`
    },

    gas: {
        shortName: "g",
        valueType: "YOCTOS",
        value: "",
        helpText: `Gas assigned to the call`
    },

    networkId: {
        shortName: "net",
        valueType: "string",
        value: "",
        helpText: 'NEAR network ID (default is NODE_ENV)'
    },

    contractName: {
        shortName: "c",
        valueType: "string",
        value: "",
        helpText: `Sets default contract account when used with --cliconfig`
    },

    cliconfig: {
        shortName: "cliconf",
        value: false,
        helpText: `config this cli, add --accountId yy and/or --c contract_id to set default user and contract accountId`
    },
}
// # sourceMappingURL=CLIOptions.js.map
