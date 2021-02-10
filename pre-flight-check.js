class PreFlightCheck {
    constructor() {
        this.procedures = [];
    }
    addProcedure(procedureFcn) {
        const wrapperFcn = () => {
            return new Promise((resolve, reject) => {
                return procedureFcn(resolve, reject);
            });
        }
        this.procedures = [...this.procedures, wrapperFcn];
    }
    execute(successCallback, errorCallback) {
        let promiseChain = Promise.resolve();
        for (const fcn of this.procedures) {
            promiseChain = promiseChain.then(fcn);
        }
        promiseChain.then(() => {
            return successCallback();
        }).catch((error) => {
            return errorCallback(error);
        });
    }
    /* Alternative using async/await and try/catch
    async execute(successCallback, errorCallback) {
        for (const fcn of this.procedures) {
            try {
                await fcn();
            } catch(error) {
                return errorCallback(error);
            }
        }
        successCallback()
    } 
    */
}

module.exports = PreFlightCheck;