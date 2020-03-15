import nodemailer from 'nodemailer';
// Importação do Express Handlebars (TEMPLATE HTML)
import exphbs from 'express-handlebars';
// Importação do Nodemailer Handlebars (TEMPLATE HTML)
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configTemplates();
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  // Definindo configuração dos templates
  configTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }
}

export default new Mail();
