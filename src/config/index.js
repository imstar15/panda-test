const config = {
  parse: {
    serverURL: 'http://localhost:1338/parse',
    appId: 'oak-parse',
  },
  polkadot: {
    oak: {
      endpoint: 'ws://localhost:9944',
      types: {
        ProjectIndex: 'u32',
        ProjectOf: 'Project',
        RoundIndex: 'u32',
        RoundOf: 'Round',
        BlockNumberFor: 'BlockNumber',
        Round: {
          start: 'BlockNumber',
          end: 'BlockNumber',
          matching_fund: 'Balance',
          grants: 'Vec<Grant>',
          is_canceled: 'bool',
          is_finalized: 'bool',
        },
        Grant: {
          project_index: 'ProjectIndex',
          contributions: 'Vec<Contribution>',
          is_approved: 'bool',
          is_canceled: 'bool',
          is_withdrawn: 'bool',
          withdrawal_expiration: 'BlockNumber',
          matching_fund: 'Balance',
        },
        Contribution: {
          account_id: 'AccountId',
          value: 'Balance',
        },
        Project: {
          name: 'Vec<u8>',
          logo: 'Vec<u8>',
          description: 'Vec<u8>',
          website: 'Vec<u8>',
          owner: 'AccountId',
          create_block_number: 'BlockNumber',
        },
      },
    },
    kusama: {
      endpoint: 'wss://node-6885733281073889280.jm.onfinality.io/ws?apikey=e99d53fb-7158-41e5-950b-e8e0bb7ac4e2',
    },
  }
};

export default config;
