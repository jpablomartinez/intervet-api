class Log {
    log_id?: string;
    auth_id?: string;
    reason!: string;

    constructor(
        log_id: string,
        auth_id: string,
        reason: string
    ) {
        this.log_id = log_id;
        this.auth_id = auth_id;
        this.reason = reason;
    }

}

export default Log;