const exec = require('child_process').exec;

function execute(cmd) {
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.error(error);
        } else {
            //console.log("success", stdout, stderr);
            if (stdout) {
                console.log(stdout.trim());
            } else if (stderr) {
                console.log(stderr.trim());
            }
        }
    });
}
execute("git status")