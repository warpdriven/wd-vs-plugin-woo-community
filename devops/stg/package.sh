git pull

cp devops/stg/env.php ../wd-ai-php-sdk/src/

npm install
npm run build

mkdir ./target/stg
rm ./target/prod/*
zip -r  ./target/stg/wd-vs-woo-stg.zip . -x "devops/**" "target/**" ".*"