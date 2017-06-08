import githubHook from 'githubhook';
import * as _ from 'lodash';

import { PushInfoChecker } from './helpers/PushInfoChecker';
import { MailerWrapper } from './helpers/MailerWrapper';
import { InitHelper } from './helpers/InitHelper';

// http://blog.backand.com/github-webhook-node/
// Check for environment varibales, if not found error is shown
const err = InitHelper.checkConfig();
if (err) {
    process.stderr.write('Server not properly configured!\n');
    process.stderr.write(`Missing ENV variable/s:  ${err}\n`);
    process.stderr.write('Shutting down...\n');
    process.exit();
}

// initialze github hook library
// add path for better security of URL
const github = githubHook({
    host: '0.0.0.0',
    port: process.env.PORT || 9898,
    path: '/nj-hook',
    secret: process.env.GITHUB_WEBHOOK_SECRET
});

// application conig, mail title.
// Mailing & path list is converted from csv to array
const appConfig = {
    mailTitle: 'GitHub WebHook - Changes',
    mailingList: process.env.MAILING_LIST.split(','),
    pathList: process.env.FILE_PATH_LIST.split(',')
};

// settings for mail client
const mailerConfig = {
    hostname: process.env.SMTP_HOSTNAME,
    port: 465,
    username: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
};

// process.stdout.write(`MAILING LIST: ${appConfig.mailingList}`);
// process.stdout.write(`PATH LIST: ${appConfig.pathList}`);
// process.stdout.write(`SMTP HOSTNAME: ${mailerConfig.hostname}`);
// process.stdout.write(`SMTP USER: ${mailerConfig.username}`);

// initialization of mail client helper
const mailerWrapper = new MailerWrapper(mailerConfig, appConfig.mailTitle, appConfig.mailingList);

// register webhook listener for push event
github.on('push', (repo, ref, data) => {
    // create path for repo
    const branchNameObject = _.chain(ref.split('/')).last();
    const branchName = branchNameObject.value();
    const fullNameRepository = data.repository.full_name;
    const fileData = data.head_commit;
    const pushInfo = {
        repoName: fullNameRepository,
        branchName: branchName,
        removedFilesArray: fileData.removed,
        addedFilesArray: fileData.added,
        modifiedFilesArray: fileData.modified
    };
    // check if mail needs to be send (true / false)
    if (PushInfoChecker.sendMailCheck(appConfig, pushInfo)) {
        mailerWrapper.sendMail(pushInfo);
    }
});

// run application
github.listen();
