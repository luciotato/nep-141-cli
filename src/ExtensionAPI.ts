#!/bin/node
import { cliConfig } from "./CLIConfig.js"
import { nickname, CommandsAPI } from "./CommandsAPI.js"
import { options } from "./CLIOptions.js"
import { CommandLineArgs } from "./util/CommandLineArgs.js"
import * as color from "./util/color.js"
import { ONE_NEAR, queryAccount } from "./near-api/near-rpc.js"
import { yton } from "./util/conversion.js"

import * as util from 'util'
import { chedder } from "./contracts/chedder.js"

// -------------------------
// Commands API extensions
// -------------------------
export class ExtensionAPI extends CommandsAPI {

    constructor(){super()};

    // hm handy extension example
    hm_HELP(){return `
    How much? 
	converts an amount in Yoctos into a more readable format. 
    Example: 
    >${nickname} hm 30037100000000000000000000
    `
    }

    hm(a: CommandLineArgs): void {
        const str = a.consumeString("amount")
        console.log(color.green,a.convertAmount(str + "Y", "N", "amount"),color.normal)
    }

    // where extension example
    where_HELP(){ return `
    Where is the contract? 
    show contract accountId
    Example extension, gives the same information as: ${nickname} --info
    
    Usage:
    >${nickname} where [are] [you]
    `
    }

    where(a: CommandLineArgs): void {
        a.optionalString("are")
        a.optionalString("you")
        a.noMoreArgs()
        console.log("Contract is at ",color.green,cliConfig.contractAccount,color.normal)
        console.log("Default user is ",color.green,cliConfig.userAccount,color.normal)
    }

    // balance extension example
    state_HELP(){ return `
    Get account 
    
    Usage:
    >${nickname} state account_id
    `}

    async state(a: CommandLineArgs) {

        const receiverId = a.consumeString("receiverId");

        let state = await queryAccount(receiverId);
        let tokenBalance = await chedder.ft_balance_of(receiverId);
        console.log(`Account:${receiverId}, Token Balance:${yton(tokenBalance)} CHDR,  Native Balance:${yton(state.amount)} N` )

    }


    // -----------------------------------------------
    // -----------------------------------------------
    // You can add more extension commands here
    // -----------------------------------------------
    // -----------------------------------------------

    // -----------------------------------------------
    // info Example extension
    // -----------------------------------------------
    /*
    myFn_help = `This is a command extension example with variable args. 
	Handy commands you can create composing fn calls to this contract or others

	Usage:
	>${nickname} myFn [account]+
    `
    myFn(a: CommandLineArgs) {
        if (a.positional.length == 0) {
            this.view("myFn", {}) // call myFn on this contract
        } else {
            while (a.positional.length) {
                const account = a.consumeString("another account")
                nearCli.view(account, "myFn", {}, options) // call myFn on one or mode accounts
            }
        }
        process.exit(0)
    }
    */

    // -----------------------------------------------
    // NEP21 Example extension
    // -----------------------------------------------
    /*
    nep21_help = `Call functions on NEP21 contracts.
    Examples:
    >>${nickname} nep21 balance gold.nep21.near         -> get how much gold this contract has
    >>${nickname} nep21 balance my gold.nep21.near      -> get how much gold you have
    >>${nickname} nep21 mint myToken.near               -> (dev) calls myToken.near.mint(), minting tokens for you

    >${nickname} nep21 transfer 50 gold.near to lucio.testnet  -> transfer 50e24 gold.near tokens to account lucio.testnet

`
    nep21(a: CommandLineArgs) {
        const subCommand = a.consumeString("sub-command")

        if (subCommand == "balance") {
            let tokenOwner = cliConfig.contractAccount
            if (a.optionalString("my")) tokenOwner = cliConfig.userAccount

            while (a.positional.length) {
                const token = a.consumeString("nep21-contract")
                nearCli.view(token, "get_balance", { owner_id: tokenOwner }, options)
            }
        } else if (subCommand == "mint") {
            const token = a.consumeString("nep21-contract")
            nearCli.call(token, "mint_1e3", {}, options)
        }

        // nearSwap nep21 transfer 50000 gold to lucio.testnet
        else if (subCommand == "transfer") {
            const tokAmount = a.consumeAmount("token amount", "Y")

            const token = a.consumeString("nep21-contract")

            a.optionalString("to")

            let toAcc = a.consumeString("to account")
            if (toAcc == "contract") toAcc = cliConfig.contractAccount // this contract

            nearCli.call(token, "transfer", { new_owner_id: toAcc, amount: tokAmount }, options)
        } else {
            console.log("nep21 UNK subCommand " + color.red + subCommand + color.normal)
            process.exit(1)
        }

        process.exit(0)
    }
    */

    /*
    // function depo: example manually coded composed/alternative command
    depo_help: string = `
    shortcut for deposit

    usage:
    > ${nickname} depo amountN [and] [stake]

    example:
    > ${nickname} depo 40N 
    will deposit 40N on into ${nickname}'s pool
    > ${nickname} depo 40N and stake
    will deposit 40N into ${nickname}'s pool and stake it in the same transaction

    `;

    depo(a: CommandLineArgs) {
        options.amount.value = a.consumeAmount("amount to deposit", "N")

        // check if [and] [stake] is next in the command line
        a.optionalString("and")
        const stake = a.optionalString("stake")

        const fnToCall = stake ? "deposit_and_stake" : "deposit"

        a.noMoreArgs()

        return this.call(fnToCall)
    }
    */

    // function info: example manually coded composed command
    /*
    info_help = "get_owner_id, get_staking_key & get_total_staked_balance"

    info(a: CommandLineArgs) {
        this.get_owner_id(a)
        this.get_staking_key(a)
        this.get_total_staked_balance(a)
    }
    */

}
