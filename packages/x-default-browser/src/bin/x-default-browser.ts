import detect from "../index";

(await detect)((err, res) => {
    if (err) {
        process.stderr.write(err);
        process.exit(1);
    }

    process.stdout.write(res.commonName + '\r\n');
});
