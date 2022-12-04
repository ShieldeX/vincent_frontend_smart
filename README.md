#### Member Role Assignment

This project comprises two folders.

```
.
├── contracts
├── frontend
└── README.md

2 directories, 1 file
```

`contracts` - Consists the `MemberRole` S.C (smart contract) and `scripts/deploy.ts` script to deploy the smart contract

`frontend` - contains the UI code written in `React NextJS`

### Tech Stack / Tools Used

#### Contracts

- [Hardhat Typescript Framework](https://hardhat.org/)
- Solidity
- VScode

#### Frontend

- React NextJs
- [Material UI](https://mui.com) for the components
- EthersJs - for web3 interactions
- VScode

### Install and Setup

Clone or download and unzip the project

and change directory into the root folder

`cd  assignment`

#### Contracts

    Install Contracts dependencies

    cd contracts

    yarn install

    # start a new network instance
    yarn chain

    # on a new terminal tab; deploy smart contract to the network instance

    yarn deploy:local

    # copy the  contract address, it will be needed on the frontend

#### Frontend

    Install Frontend dependencies

    cd frontend

    yarn install

    # open .env.local
    Set `NEXT_PUBLIC_CONTRACT_ADDRESS` value to the contract address you copied in the deployment step from contracts
    # start frontend
    yarn dev

Visit frontend at [Localhost:3000](http://localhost:3000)

#### Metamask Account Setup

Ensure you have metamask installed
On the network instance you created, copy the first account private Key and import it to metamask

**#Note**

Connect to localhost network on frontend

Change account to the one you imported

### Misc

Here is how a complete setup looks like on vscode

[Overview](images/Image%201.png)

[Localhost Server](images/Localhost%20Server.png)

[Frontend .env.local](images/dotenv.png)

[Frontend Server](images/Frontend%20Server.png)

[Metamask Wallet](images/metamask%20wallet.png)

[Account 1](images/Account%201.png)
