import { IFeedback } from "../domain/IFeedback";
import { BaseService } from "./BaseService";

export class FeedbackService extends BaseService<IFeedback>{
    constructor() {
        super("feedbacks");
    }
}
