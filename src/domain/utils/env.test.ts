import { describe, expect, test } from 'vitest';
import { getEnv } from './env';

describe('[UNIT] ENV UTILS', () => {
    test('getEnv', () => {
        process.env = {
            TEST: 'VALUE'
        };

        expect(getEnv('TEST')).toBe('VALUE');
    });
});
