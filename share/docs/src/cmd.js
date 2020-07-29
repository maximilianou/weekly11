const { append, remove } = require('./readmes.js');

console.log('createing README.md');

const fileOut = '../../../README.md';
const filesIn = [
  { path: '../../../app01/Makefile', mark: '\n```\n' },
  { path: '../../../app01/docker-compose.dev.yml', mark: '\n```\n' },
  { path: '../../../app01/frontend/Dockerfile.dev', mark: '\n```\n' },
  {
    path: '../../../app01/frontend/package.json',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/app.module.ts',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/app.component.ts',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/app.component.html',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/dish.ts',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/mock-dishes.ts',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/menu/menu.component.ts',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/menu/menu.component.html',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/dish-detail/dish-detail.component.ts',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/dish-detail/dish-detail.component.html',
    mark: '\n```\n',
  },
  {
    path: '../../../app02/frontend/src/app/dish.service.ts',
    mark: '\n```\n',
  },
];
const publish = (cmd) => {
  remove({ fileOut: cmd.fileOut });
  console.log('removed.');
  cmd.filesIn.forEach((file) => {
    console.log('each file.');
    append({ fileIn: file.path, fileOut, mark: file.mark });
  });
};

publish({ fileOut, filesIn });

console.log('created README.md');
