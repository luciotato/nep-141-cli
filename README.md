# chedder-cli

## CLI tool for CHEDDER 

### Prerequisites:

* nodejs >= v14

To install prerequisites:

check your node version

```
> node -v
v14.x.y
```

If your version is < v12.17, you must install nodejs from [nodejs.org](nodejs.org) (windows/linux), 
or use [nvm](https://github.com/nvm-sh/nvm) (linux) to install node stable

`> nvm install stable`

### Installing this cli:

`> npm install -g chedder`

### Usage example

`> chedder get_supply`

```
total supply 1,000,000,000.00000
```

`> chedder transfer luciotato.testnet 100`

```
receiver_id:luciotato.testnet, Token Balance:0.00000 CHDR, Native Balance:700.09849 N
transferred to luciotato.testnet 100.00000 tokens
```

`> chedder --help`

```
------------------------------------------------------------
command: balance

       Returns token balance for an account 
     
      usage:
      > chedder balance account_id
      
------------------------------------------------------------
command: get_metadata

       Returns token metadata 
     
      usage:
      > chedder get_metadata
      
------------------------------------------------------------
command: get_owner

       Returns account ID of the token owner.
     
      usage:
      > chedder get_owner 
      
------------------------------------------------------------
command: get_supply

       Returns token supply 
     
      usage:
      > chedder get_supply 
      
------------------------------------------------------------
command: hm

    How much? 
        converts an amount in Yoctos into a more readable format. 
    Example: 
    >chedder hm 30037100000000000000000000
    
------------------------------------------------------------
command: mint

       Mints more tokens in the owner account
      
      usage:
      > chedder mint amount
      
------------------------------------------------------------
command: set_icon

       sets metadata icon as an optimized SVG. Use https://petercollingridge.appspot.com/svg-optimiser to create the file
     
      usage:
      > chedder set_icon file.svg
    
------------------------------------------------------------
command: state

    Get account 
    
    Usage:
    >chedder state account_id
    
------------------------------------------------------------
command: transfer

       Transfer amount from signer to receiver with optional memo
      
      usage:
      > chedder transfer receiverId amount memo
      
------------------------------------------------------------
command: where

    Where is the contract? 
    show contract accountId
    Example extension, gives the same information as: chedder --info
    
    Usage:
    >chedder where [are] [you]
    

------------------------------------------------------------
Options:
  --accountId string, -acc string                 signer accountId
  --masterAccount string, -ma string              master account
  --help, -h                                      
  --info, -i                                      show configured contract account, default user accountId
  --verbose, -v                                   Prints out verbose output
  --amount NEAR, -am NEAR                         attach NEAR tokens to this call. Example: --amount 100N
  --gas YOCTOS, -g YOCTOS                         Gas assigned to the call
  --networkId string, -net string                 NEAR network ID (default is NODE_ENV)
  --contractName string, -c string                Sets default contract account when used with --cliconfig. Otherwise, sets --contractName argument for the near call
  --cliConfig, -cliconfig                         config this cli, add --contractName xx and --accountId yy to set default contract accountId and user
------------------------------------------------------------

```

