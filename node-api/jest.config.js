/****************************
 * FilePath: jest.config.js
 * 2023-05-14 14:42:30
 * Description: 
 * 		 This file is implement
 * Copyright 2023 JNaruto, All Rights Reserved.
 *  
 */
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src'],
};
