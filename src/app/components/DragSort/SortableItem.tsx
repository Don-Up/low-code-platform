import React, {JSX} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

type PropsType = {
    id: string
    children: JSX.Element
}

/**
 * A draggable and sortable UI item used in a list to enable reordering via drag-and-drop.
 *
 * @component
 * @props {Object} PropsType
 * @param {string} id - Unique identifier for the item, used by the DnD (Drag and Drop) system.
 * @param {JSX.Element} children - The content or child element to be rendered inside the sortable item.
 *
 * @returns {JSX.Element} A wrapped div element that supports drag-and-drop functionality,
 *                       maintains visual feedback during dragging, and preserves transition effects.
 */
const SortableItem: React.FC<PropsType> = ({id, children}) => {

    const {
        attributes, // Attributes for the draggable item.
        listeners, // Event listeners for the draggable item.
        setNodeRef, // Reference to the draggable item's DOM node.
        transform, // Transformation styles for the draggable item.
        transition// Transition styles for the draggable item.
    } = useSortable({id})

    const style = {
        transform: CSS.Transform.toString(transform), // Apply transformation styles.
        transition, // Apply transition styles.
    }

    return (<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
    </div>)
}

export default SortableItem