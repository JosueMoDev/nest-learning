import { ValidRole } from 'src/authentication/enums/valid-role.enum';
import { Todo } from 'src/todo/entities/todo.entity';

export const SEED_ACCOUNTS = [
  {
    name: 'account',
    lastname: 'admin',
    email: 'adminaccount@google.com',
    password: '123456789',
    role: ValidRole.admin,
    isActive: true,
  },
  {
    name: 'account',
    lastname: 'super',
    email: 'superaccount@google.com',
    password: '123456789',
    role: ValidRole.superuser,
    isActive: true,
  },
  {
    name: 'account',
    lastname: 'user',
    email: 'useraccount@google.com',
    password: '123456789',
    role: ValidRole.user,
    isActive: true,
  },
];

export const SEED_TODOS = [
  {
    title: 'Study Nest Framework',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study React JS',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Spring Boot Framework',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study SwiftUi',
    description: 'Its necessary to get a job',
  },
];
