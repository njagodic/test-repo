import * as _ from 'lodash';
import * as nodemailer from 'nodemailer';

// https://nodemailer.com/about/
// initialization for mailerWrapper
export class MailerWrapper {
    constructor(smtpConfig, mailTitle, mailingList) {
        this.initTransporter(smtpConfig);
        this.mailingList = mailingList;
        this.mailTitle = mailTitle;
    }

    // set up mail data
    initTransporter(smtpConfig) {
        this.transporter = nodemailer.createTransport({
            host: smtpConfig.hostname,
            port: smtpConfig.port,
            secure: true,
            auth: {
                user: smtpConfig.username,
                pass: smtpConfig.pass
            }
        });
    }

    // function that's builds and sends mail
    sendMail(pushInfo) {
        const mailOptions = {
            to: this.mailingList.join(','),
            subject: this.mailTitle,
            html: this.createHtmlBody(pushInfo)
        };

        // the actual method that sends the email
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                process.stderr.write(error.response);
            }
            else {
                process.stdout.write(`Message ${info.messageId} sent: ${info.response}\n`);
            }
        });
    }

    // genterate html of email body (title, file change lists) 
    createHtmlBody(pushInfo) {
        let htmlBody = `<h2>${this.mailTitle}</h2><br>`;

        if (!_.isEmpty(pushInfo.removedFilesArray)) {
            htmlBody += MailerWrapper.createHtmlList('Removed Files', pushInfo.removedFilesArray, pushInfo.repoName, pushInfo.branchName);
        }
        if (!_.isEmpty(pushInfo.addedFilesArray)) {
            htmlBody += MailerWrapper.createHtmlList('Added Files', pushInfo.addedFilesArray, pushInfo.repoName, pushInfo.branchName);
        }
        if (!_.isEmpty(pushInfo.modifiedFilesArray)) {
            htmlBody += MailerWrapper.createHtmlList('Modified Files', pushInfo.modifiedFilesArray, pushInfo.repoName, pushInfo.branchName);
        }

        return htmlBody;
    }

    // generate links for whole file change list, so that it can be opened in git
    static createHtmlList(title, collection, repoName, branchName) {
        let html = `<h3>${title}:</h3><br>`;
        html += '<ul>';
        _.forEach(collection, (filePath) => {
            const anchor = `<a target="_blank" href="https://github.com/${repoName}/blob/${branchName}/${filePath}">${filePath}</a>`;
            html += `<li>${anchor}</li><br>`;
        });
        html += '</ul><br>';

        return html;
    }
}
