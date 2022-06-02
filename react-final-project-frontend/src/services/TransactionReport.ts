import { ISpecification } from "../domain/ISpecification";
import { ITransactionReport } from "../domain/ITransactionReport";
import { BaseService } from "./BaseService";

export class TransactionReportService extends BaseService<ITransactionReport>{
    constructor() {
        super("transactionreports");
    }
}