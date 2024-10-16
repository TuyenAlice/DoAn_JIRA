import { useEffect, useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Row, Col, Card, Typography } from 'antd';
import { getAllStatus } from '../services/status-service';
import { TaskDetail, TaskStatus } from '../interfaces/TaskInterface';
import { getProjectDetail, updateTaskStatus } from '../services/project-service';

const { Title } = Typography;


const KanbanDashboard = () => {
    let projectId: any = {};
    const [columns, setColumns] = useState<any>([]);

    useEffect(() => {

        projectId = JSON.parse(localStorage.getItem("project-id") || "") as number;
        console.log(projectId);

        let tasksByStatus: any = {};

        getProjectDetail(projectId).then((response) => {
            tasksByStatus = response.data.lstTask.reduce((acc: any, item: any) => {
                acc[item.statusName] = item.lstTaskDeTail;
                return acc;
            }, {});

            getAllStatus().then((response) => {
                const updatedColumns: TaskStatus[] = [];
                response.data.forEach((status) => {
                    updatedColumns.push(status);
                });

                const tmp = updatedColumns.reduce((acc: any, status) => {
                    acc[status.statusId] = { title: status.statusName, tasks: tasksByStatus[status.statusName] };
                    return acc;
                }, {});
                console.log(tmp);
                setColumns(tmp);
            });
        });



    }, []);

    const handleDragEnd = ({ active, over }: any) => {
        if (!over) return; // Drop outside any column

        const fromColumn = active.data.current.task.statusId;
        const toColumn = over.id;

        if (fromColumn !== toColumn) {
            const draggedTask: TaskDetail = active.data.current.task;

            setColumns((prevColumns: any) => {
                const updatedFromColumn: any = prevColumns[fromColumn];
                const updatedToColumn: any = prevColumns[toColumn];

                updatedFromColumn.tasks = updatedFromColumn.tasks?.filter((t: any) => t.taskId !== draggedTask.taskId);
                draggedTask.statusId = toColumn;
                updatedToColumn.tasks.push(draggedTask);

                // Update task status
                updateStatus(draggedTask);

                return {
                    ...prevColumns,
                    [fromColumn]: updatedFromColumn,
                    [toColumn]: updatedToColumn,
                };
            });
        }
    };


    const DraggableCard = ({ task }: any) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: task.taskId.toString(),
            data: { task },
        });

        return (
            <div
                ref={setNodeRef}
                style={{ transform: CSS.Translate.toString(transform), marginBottom: '8px' }}
                {...listeners}
                {...attributes}
            >
                <Card className='abc' title={task.taskName} bordered={true}>
                    {task.description}
                    <br />
                    {task.priorityTask.priority}
                    <br />
                    {task.taskTypeDetail.taskType}
                    <br />
                    <ul>
                        {renderTaskAssignee(task.assigness)}
                    </ul>
                </Card>
            </div>
        );
    };

    const renderTaskAssignee = (assignees: any) => {
        return assignees.map((assignee: any) => (
            <li key={assignee.id}>
                {assignee.name}
                <br />
                <img src={assignee.avatar} alt="" />
            </li>
        ));
    };

    const updateStatus = async (task: TaskDetail) => {
        await updateTaskStatus(task).then((response) => {
            console.log(response);
        }).catch();
    };

    const DroppableColumn = ({ id, children }: any) => {
        const { setNodeRef } = useDroppable({ id });

        return (
            <Col span={6}>
                <Title level={4}>{columns[id].title}</Title>
                <div
                    ref={setNodeRef}
                    style={{
                        minHeight: '800px',
                        padding: '10px',
                        backgroundColor: '#d9d9d91c',
                        borderRadius: '8px',
                        zIndex: 10,
                        position: "relative"
                    }}
                >
                    {children}
                </div>
            </Col>
        );
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Row gutter={16}>
                {
                    Object.entries(columns).map((item: any) => (
                        <DroppableColumn key={item[0]} id={item[0]}>
                            {item[1].tasks?.map((task: any) => (
                                <DraggableCard key={task.taskId} task={task} />
                            ))}
                        </DroppableColumn>
                    ))
                }
            </Row>
        </DndContext>
    );
};

export default KanbanDashboard;
