import * as fs from "fs"
import * as util from "util"

import { CommandLineArgs } from "./util/CommandLineArgs.js"
import { options } from "./CLIOptions.js"
import { cliConfig } from "./CLIConfig.js"
import { chedder } from "./contracts/chedder.js"
import { queryAccount } from "./near-api/near-rpc.js"
import { yton } from "./util/conversion.js"

// name of this script
export const nickname = "chedder"

// one function for each pub fn in the contract
// get parameters by consuming from CommandLineParser
export class CommandsAPI {


  mint_HELP() {
    return `
       Mints more tokens in the owner account
      
      usage:
      > chedder mint amount
      `};

  async mint(a: CommandLineArgs) /*:void*/ {

    //--these are some examples on how to consume arguments
    //const toAccount = a.consumeString("to Account")
    //const argumentJson = a.consumeJSON("{ account:userAccount, amount:xxN }")

    //get fn arguments as JSON
    const amount = a.consumeAmount("amount", 'Y'); // get amount converted to Yoctos

    a.noMoreArgs() // no more positional args should remain

    await chedder.mint(amount);

    console.log("minted " + yton(amount))

  }


  get_owner_HELP() {
    return `
       Returns account ID of the token owner.
     
      usage:
      > chedder get_owner 
      `};

  async get_owner(a: CommandLineArgs) {
    a.noMoreArgs() // no more positional args should remain
    let owner = await chedder.get_owner_id()
    console.log(owner)
  }


  transfer_HELP() {
    return `
       Transfer amount from signer to receiver with optional memo
      
      usage:
      > chedder transfer receiverId amount memo
      `};

  async transfer(a: CommandLineArgs) /*:void*/ {

    const receiverId = a.consumeString("receiverId");

    let state = await queryAccount(receiverId);
    let tokenBalance = await chedder.ft_balance_of(receiverId);
    console.log(`receiver_id:${receiverId}, Token Balance:${yton(tokenBalance)} CHDR, Native Balance:${yton(state.amount)} N` )

    const amount = a.consumeAmount("amount", 'Y'); // get amount converted to Yoctos

    let memo = undefined
    if (a.moreArgs()) memo = a.consumeString("memo");

    a.noMoreArgs() // no more positional args should remain

    await chedder.ft_transfer(receiverId, amount, memo)

    console.log(`transferred to ${receiverId} ${yton(amount)} tokens`)

  }

  get_supply_HELP() {
    return `
       Returns token supply 
     
      usage:
      > chedder get_supply 
      `};

  async get_supply(a: CommandLineArgs) {

    a.noMoreArgs() // no more positional args should remain

    let supply = await chedder.ft_total_supply()

    console.log(`total supply ${yton(supply)}`)
  }

  balance_HELP() {
    return `
       Returns token balance for an account 
     
      usage:
      > chedder balance account_id
      `};

  async balance(a: CommandLineArgs) {

    const account = a.consumeString("account")

    a.noMoreArgs() // no more positional args should remain

    let balance = await chedder.ft_balance_of(account)

    console.log(`${account} balance: ${yton(balance)}`)
  }

  get_metadata_HELP() {
    return `
       Returns token metadata 
     
      usage:
      > chedder get_metadata
      `};

  async get_metadata(a: CommandLineArgs) {

    a.noMoreArgs() // no more positional args should remain

    let metadata = await chedder.ft_metadata()

    console.log(util.inspect(metadata));

  }

  set_icon_HELP() {
    return `
       sets metadata icon as an optimized SVG. Use https://petercollingridge.appspot.com/svg-optimiser to create the file
     
      usage:
      > chedder set_icon file.svg
    `};

  async set_icon(a: CommandLineArgs) {
    const filename = a.consumeString("filename")
    a.noMoreArgs() // no more positional args should remain
    const svgData = fs.readFileSync(filename);
    await chedder.set_metadata_icon(svgData.toString())
  }

  /* commented, not available, we have to process contract state to get accounts
  get_number_of_accounts_HELP() {
    return `
   Returns the number of accounts
  
  usage:
  > chedder get_number_of_accounts 
  `};
  get_number_of_accounts(a ) {
    a.noMoreArgs() // no more positional args should remain
    return this._view("get_number_of_accounts")
  }
  */

}
