set +e 
tar --exclude='./node_modules' --exclude='./.git' -zcvf app.tgz .
exitcode=$?

if [ "$exitcode" != "1" ] && [ "$exitcode" != "0" ]; then
    exit $exitcode
fi
set -e
