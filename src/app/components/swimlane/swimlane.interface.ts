import { IIssue, IIssueStatusEnum } from "../../project/components/issue-card/issue.interface";

export interface ISwimlane {
    id: string;
    title: string;
    criteria: IIssueStatusEnum;
    issues?: IIssue[];
}