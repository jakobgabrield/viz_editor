const { exec } = require("child_process");
const { languageToCompiler } = require('../languageMaps');

const executeProgram = async (filepath, args) => {
    return new Promise((resolve, reject) => {
        exec(
          `eval $(opam config env) && cd ./functions/viz && dune exec -- vc ${filepath} ${args}`,
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