export const ALIAS = [
    {
      header: 'Alias',
      content: 'Service alias operation',
    },
    {
      header: 'Document',
      content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md',
    },
    {
      header: 'Usage',
      content: '$ s alias <sub-command>',
    },
    {
      header: 'SubCommand List',
      content: [
        { desc: 'get', example: 'Get alias details; help command [s alias get -h]' },
        { desc: 'list', example: 'View the list of alias; help command [s alias list -h]' },
        { desc: 'publish', example: 'Publish alias; help command [s alias publish -h]' },
        { desc: 'rollback', example: 'Rollback alias versionId; help command [s alias rollback -h]' },
      ],
    },
  ];