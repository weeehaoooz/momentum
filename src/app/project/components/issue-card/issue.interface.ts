export interface IIssue {
    id: string;
    title: string;
    description: string | null;
    status?: IIssueStatusEnum | null;
    priority?: IIssuePriorityEnum | null;
    due_date?: Date | null;
    created_at?: Date ;
    updated_at?: Date | null;
    subTasks?: IIssue[];
}

export interface IProjectTask extends IIssue {
    projectIndex: number;
}

export enum IIssueStatusEnum {
    BACKLOG = 'BACKLOG',
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export enum IIssuePriorityEnum {
    NONE = 'NONE',
    MINIMAL = 'MINIMAL',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}
