import { ITaskPriorityEnum, ITaskStatusEnum } from "../project/components/issue-card/issue.interface";

export const sampleProjects = [
    {
        name: 'Project 1',
        code: 'P1',
        description: 'Project 1 description',
        progress: 0,
        swimlanes: [
            {
                id: '1',
                title: 'To Do',
                criteria: ITaskStatusEnum.TODO,
            },
            {
                id: '2',
                title: 'In Progress',
                criteria: ITaskStatusEnum.IN_PROGRESS,
            },
            {
                id: '3',
                title: 'Done',
                criteria: ITaskStatusEnum.DONE,
            }
        ],
        tasks: [
            {
                id: '1',
                title: 'Task 1',
                description: 'Complete Development Task',
                status: ITaskStatusEnum.TODO,
                priority: ITaskPriorityEnum.LOW,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '2',
                title: 'Task 2',
                description: 'Task 2 description',
                status: ITaskStatusEnum.IN_PROGRESS,
                priority: ITaskPriorityEnum.MEDIUM,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '3',
                title: 'Task 3',
                description: 'Task 3 description',
                status: ITaskStatusEnum.DONE,
                priority: ITaskPriorityEnum.HIGH,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '4',
                title: 'Task 4',
                description: 'Task 4 description',
                status: ITaskStatusEnum.TODO,
                priority: ITaskPriorityEnum.CRITICAL,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '5',
                title: 'Task 5',
                description: 'Task 5 description',
                status: ITaskStatusEnum.IN_PROGRESS,
                priority: ITaskPriorityEnum.MINIMAL,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '6',
                title: 'Task 6',
                description: 'Task 6 description',
                status: ITaskStatusEnum.DONE,
                priority: ITaskPriorityEnum.LOW,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '7',
                title: 'Task 7',
                description: 'Task 7 description',
                status: ITaskStatusEnum.TODO,
                priority: ITaskPriorityEnum.MEDIUM,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '8',
                title: 'Task 8',
                description: 'Task 8 description',
                status: ITaskStatusEnum.IN_PROGRESS,
                priority: ITaskPriorityEnum.HIGH,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            }
        ]
    },
    {
        name: 'Project 2',
        code: 'P2',
        description: 'Project 2 description',
        progress: 0,
        swimlanes: [
            {
                id: '1',
                title: 'To Do',
                criteria: ITaskStatusEnum.TODO,
            },
            {
                id: '2',
                title: 'In Progress',
                criteria: ITaskStatusEnum.IN_PROGRESS,
            },
        ],
        tasks: [
            {
                id: '1',
                title: 'Task 1',
                description: 'Complete Development Task',
                status: ITaskStatusEnum.TODO,
                priority: ITaskPriorityEnum.LOW,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
            {
                id: '2',
                title: 'Task 2',
                description: 'Task 2 description',
                status: ITaskStatusEnum.IN_PROGRESS,
                priority: ITaskPriorityEnum.MEDIUM,
                due_date: new Date(),
                created_at: new Date(),
                updated_at: null
            },
        ]
    }
];


