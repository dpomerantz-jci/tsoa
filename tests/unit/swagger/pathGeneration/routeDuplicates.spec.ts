import { expect } from 'chai';
import { MetadataGenerator } from '@tsoa/cli/metadataGeneration/metadataGenerator';

describe('reject when something duplicate', () => {
  it('should reject methods with same routes', () => {
    expect(() => {
      new MetadataGenerator('./fixtures/controllers/duplicateMethodsController.ts').Generate();
    }).to.throw(`Duplicate method signature @get(GetTest/Complex) found in controllers: DuplicateMethodsTestController#getModel, DuplicateMethodsTestController#duplicateGetModel\n`);
  });

  it('should reject methods with multiple first path parameter', () => {
    expect(() => {
      new MetadataGenerator('./fixtures/controllers/duplicatePathParamController.ts').Generate();
    }).to.throw(`Duplicate path parameter definition signature found in methods pathParamTest, pathParamTest2 in controller DuplicatePathParamTestController\n`);
  });
});
