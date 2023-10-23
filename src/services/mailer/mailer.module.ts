import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        // service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL_ADDR || 'haigolong@gmail.com',
          pass: process.env.ADMIN_EMAIL_PSW || 'ojnqxhaeygeftfv',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}