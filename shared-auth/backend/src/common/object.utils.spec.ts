
import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ObjectUtils } from './object.utils';

describe('Util', () => {

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      // controllers: [CatsController],
      providers: [ObjectUtils],
    }).compile();

  });

  describe('sign', () => {
    Logger.log('UTIL !!!!!!', 'util.spec.ts');
    it('should ', async () => {
      //   const result = ['test'];
    //   jest.spyOn(jwtService, 'sign').mockImplementation(() => 'tokenstring');

      expect(ObjectUtils.isEmpty(null)).toBe(true);
    });
  });
});