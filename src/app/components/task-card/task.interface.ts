export interface ITask {
    id: string;
    title: string;
    description: string | null;
    status?: ITaskStatusEnum | null;
    priority?: ITaskPriorityEnum | null;
    due_date?: Date | null;
    created_at?: Date ;
    updated_at?: Date | null;
    subTasks?: ITask[];
}

export interface IProjectTask extends ITask {
    projectIndex: number;
}

export enum ITaskStatusEnum {
    BACKLOG = 'BACKLOG',
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export enum ITaskPriorityEnum {
    MINIMAL = 'MINIMAL',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}
