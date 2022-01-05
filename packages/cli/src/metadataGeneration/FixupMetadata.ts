import { Tsoa } from '@tsoa/runtime';
const humps = require('humps');

export function munge(metadata: Tsoa.Metadata) {
  for (const controller of metadata.controllers) {
    for (const method of controller.methods) {
      for (const parameter of method.parameters) {
        fixupProperties(parameter.type);
      }

      for (const response of method.responses) {
        fixupProperties(response.schema);
      }

      if (method.type) {
        fixupProperties(method.type);
      }
    }
  }

  for (const referenceType in metadata.referenceTypeMap) {
    fixupProperties(metadata.referenceTypeMap[referenceType]);

    const newReferenceType = camelToSnake(referenceType);

    if (newReferenceType !== referenceType) {
      metadata.referenceTypeMap[newReferenceType] = metadata.referenceTypeMap[referenceType];
      delete metadata.referenceTypeMap[referenceType];
    }
  }
}

function fixupProperties(container) {
  if (container && container.properties && typeof container.properties[Symbol.iterator] === 'function') {
    for (const property of container.properties) {
      property.name = camelToSnake(property.name);

      if (property.type && property.type.properties) {
        fixupProperties(property.type);
      }
    }
  }

  if (container.refName) {
    container.refName = camelToSnake(container.refName);
  }
}

function camelToSnake(value: string): string {
  return humps.decamelize(value);
}
