#! /bin/sh

rm -r data
rm -r web/public/build

cd web
npm run build
cd ..
cp -r web/public data