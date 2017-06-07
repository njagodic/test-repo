# test-repo


This webhook is used to send email to specifed mail in "MAILING_LIST" for file changes which are specifed in variable FILE_PATH_LIST.


Add this to your .bash_profile or .zshrc for local testing:
export MAILING_LIST="YourEmail@gmail.com"
export FILE_PATH_LIST="correctFolder/*,folerwithpath/test.js"  > make sure there is no whitespaces
export GITHUB_WEBHOOK_SECRET="*****"  > run ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'
export SMTP_HOSTNAME="smtp.gmail.com"
export SMTP_USERNAME="YourEmail"
export SMTP_PASSWORD="password" > generate App password for Mail on https://myaccount.google.com/security

You can use https://ngrok.com/, for local testing since ngrok allows you to expose a web server running on your local machine to the internet. Just tell ngrok what port your web server is listening on.

For use in Heroku, the same parameters needs to be specifed in Heroku app.


Requirements:
Node.js v6+
npm install nodemailer --save
npm install githubhook
npm install lodash
npm install -g babel-cli
npm install --save-dev babel-cli ????



