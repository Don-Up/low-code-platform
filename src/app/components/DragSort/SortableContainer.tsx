import React, {JSX} from "react";
import {closestCenter, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Comp} from "@/app/components/Canvas/components/type";

type PropsType = {
    children: JSX.Element | JSX.Element[]
    items: Array<Comp>
    onDragEnd: (oldIndex: number, newIndex: number) => void
}

/**
 * SortableContainer is a React component that provides drag-and-drop functionality for its children.
 * It uses the DndContext and SortableContext from a drag-and-drop library to manage drag operations.
 *
 * @param {React.ReactNode} children - The child components of SortableContainer, typically items to be dragged.
 * @param {Item[]} items - An array of items that can be dragged, used to track the state of the items.
 * @param {(oldIndex: number, newIndex: number) => void} onDragEnd - A callback function called when a drag ends, receives the start and end indices of the drag.
 * @returns {JSX.Element} - Renders the drag-and-drop context and strategy for the items.
 */
const SortableContainer: React.FC<PropsType> = ({
                                                    children,
                                                    items,
                                                    onDragEnd}) =>
{

    // Initializes drag-and-drop sensors, including mouse and touch sensors, with mouse sensor settings here.
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8, // Minimum distance to trigger a drag
            },
        }),
    )

    /**
     * Handles the end of a drag operation, updating the order of items based on the drag result.
     * @param {DragEndEvent} event - Event object containing information about the drag.
     */
    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event
        // Checks if the dragged item's position has changed.
        if (active.id !== over?.id) {
            // Finds the original and new indices of the item, and notifies the parent component of the change.
            const oldIndex = items.findIndex(item => item.id === active.id)
            const newIndex = items.findIndex(item => item.id === over?.id)
            onDragEnd(oldIndex, newIndex)
        }
    }

    // Renders the drag-and-drop context, including sensors, drag end event handling, and collision detection strategy.
    // Also renders the sortable item context and the actual child components.
    return (<DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    </DndContext>)
}


export default SortableContainer