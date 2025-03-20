import pino from 'pino';
import { trace } from '@opentelemetry/api';

export const Logger = () =>
    pino({
        level: 'debug',
        enabled: process.env.NODE_ENV === 'test' ? false : true,
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
        mixin() {
            const currentSpan = trace.getActiveSpan();
            const traceId = currentSpan?.spanContext().traceId;

            if (!traceId) return {};

            return {
                traceID: traceId,
                spanID: currentSpan.spanContext().spanId
            };
        }
    });
