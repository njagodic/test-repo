# test-repo


This webhook is used to send email to specifed mail in "MAILING_LIST" for file changes which are specifed in variable FILE_PATH_LIST.

Useful links:
https://lodash.com/docs/4.17.4 - helper library
http://blog.backand.com/github-webhook-node/
https://nodemailer.com/about/
https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75


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
npm install

How to run application locally?
run ngork http port
copy this url to webhook/path
run npm start

if everything is ok, it should look like this:
> babel-node src/index --presets env

listening for hook events on 0.0.0.0:9898
POST /path 127.0.0.1
received 9851 bytes from 127.0.0.1
got push event on nj-test:refs/heads/master from 127.0.0.1
Message <9265c719-814e-7657-31c1-40a649ecf94a@Natalijas.local> sent: 250 2.0.0 OK 1496862011 o65sm2887569wmo.19 - gsmtp



