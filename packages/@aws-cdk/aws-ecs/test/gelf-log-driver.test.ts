import '@aws-cdk/assert-internal/jest';
import * as cdk from '@aws-cdk/core';
import * as ecs from '../lib';

let stack: cdk.Stack;
let td: ecs.TaskDefinition;
const image = ecs.ContainerImage.fromRegistry('test-image');

describe('gelf log driver', () => {
  beforeEach(() => {
    stack = new cdk.Stack();
    td = new ecs.Ec2TaskDefinition(stack, 'TaskDefinition');


  });

  test('create a gelf log driver with minimum options', () => {
    // WHEN
    td.addContainer('Container', {
      image,
      logging: new ecs.GelfLogDriver({
        address: 'my-gelf-address',
      }),
      memoryLimitMiB: 128,
    });

    // THEN
    expect(stack).toHaveResourceLike('AWS::ECS::TaskDefinition', {
      ContainerDefinitions: [
        {
          LogConfiguration: {
            LogDriver: 'gelf',
            Options: {
              'gelf-address': 'my-gelf-address',
            },
          },
        },
      ],
    });


  });

  test('create a gelf log driver using gelf with minimum options', () => {
    // WHEN
    td.addContainer('Container', {
      image,
      logging: ecs.LogDrivers.gelf({
        address: 'my-gelf-address',
      }),
      memoryLimitMiB: 128,
    });

    // THEN
    expect(stack).toHaveResourceLike('AWS::ECS::TaskDefinition', {
      ContainerDefinitions: [
        {
          LogConfiguration: {
            LogDriver: 'gelf',
            Options: {
              'gelf-address': 'my-gelf-address',
            },
          },
        },
      ],
    });


  });
});
