export interface IIssue {
    id: string;
    title: string;
    description: string | null;
    status?: IIssueStatusEnum | null;
    priority?: IIssuePriorityEnum | null;
    dueDate?: Date | null;
    createdTs?: Date ;
    updatedTs?: Date | null;
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
