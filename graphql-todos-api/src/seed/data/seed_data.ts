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
  {
    title: 'Study Next 14',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Angular',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study UIKit',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Flutter',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Jetpack Compose',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study GaphQl',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study TypeScript',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study AWS',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Kotlin',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Java',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Dart',
    description: 'Its necessary to get a job',
  },
  {
    title: 'Study Spring boot with kotlin',
    description: 'Its necessary to get a job',
  },
];
