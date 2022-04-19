const { exec } = require("child_process");
const { languageToCompiler } = require('../languageMaps');

const executeProgram = async (filepath) => {
    return new Promise((resolve, reject) => {
        let viz_path = __dirname + "/test.native";
        exec(
          `python3 ${filepath}`,
        // `${viz_path} ${filepath}`,
          (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            resolve(stdout);
            }
        );
    });
}

module.exports = {
    executeProgram
}