import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }
  async sendMailWithText(email: string, subject: string, content: string, token?: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    console.log('param...', email, subject, content)
    try {
      await this.mailerService.sendMail({
        to: email,
        from: '"Support Team" <support@example.com>', // override default from
        subject: subject || 'Welcome to Nice App! Confirm your Email',
        text: content,
        // context: { // ✏️ filling curly brackets with content
        //   name: email,
        //   url,
        // },
      });
    } catch (error) {
      console.log('error when send mail...', error)
      throw new HttpException('Failure send Mail', HttpStatus.PRECONDITION_FAILED)
    }
  }
}