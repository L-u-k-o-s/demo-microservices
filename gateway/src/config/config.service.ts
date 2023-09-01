import { TcpClientOptions, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
    constructor(private readonly configService: ConfigService) {
    }

    get<T>(key: string): T | undefined {
        return this.configService.get<T>(key);
    }

    getGatewayPort(): number {
        return parseInt(this.configService.get('API_GATEWAY_PORT', '3000'), 10);
    }

    getUserServiceConfig(): TcpClientOptions {
        return {
            options: {
                port: parseInt(this.configService.get('USER_SERVICE_PORT', '3001'), 10),
                host: this.configService.get<string>('USER_SERVICE_HOST', 'localhost'),
            },
            transport: Transport.TCP,
        };
    }

    getMeetupServiceConfig(): TcpClientOptions {
        return {
            options: {
                port: parseInt(this.configService.get('MEETUP_SERVICE_PORT', '3002'), 10),
                host: this.configService.get('MEETUP_SERVICE_HOST', 'localhost'),
            },
            transport: Transport.TCP,
        };
    }
}
