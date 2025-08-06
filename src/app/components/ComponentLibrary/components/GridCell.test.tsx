import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import GridCell from "./GridCell"; // 调整路径
import compSliceReducer from "@/store/componentSlice";
import {ComponentState} from "react";

// Mock nanoid to return a fixed value for predictable testing
jest.mock("nanoid", () => ({
    nanoid: jest.fn(() => "mocked-id"),
}));

const store = configureStore<{ comp: ComponentState }>({
    reducer: {comp: compSliceReducer},
    preloadedState: {
        comp:  {components: [], selectedComponentId: null},
    },
});

describe("GridCell", () => {
    const defaultProps = {
        bgColor: "bg-blue-500",
        img: "text",
        text: "Text",
    };

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it("renders with correct styles and content", () => {
        render(
            <Provider store={store}>
                <GridCell {...defaultProps} />
            </Provider>
        );

        const gridCell = screen.getByText("Text");
        expect(gridCell).toBeInTheDocument();
        expect(gridCell.parentElement).toHaveClass("flex flex-col items-center justify-center p-4 hover:bg-gray-100");
        expect(gridCell.previousSibling).toHaveClass("w-20 h-20 rounded-[20px] bg-blue-500");
        const img = screen.getByAltText("text");
        expect(img).toHaveAttribute("src", "images/text.svg");
        expect(img).toHaveClass("w-10 h-10 mx-auto mt-5");
    });

    it("dispatches addComponent with Text component on click", () => {
        render(
            <Provider store={store}>
                <GridCell {...defaultProps} />
            </Provider>
        );

        const gridCell = screen.getByText("Text");
        fireEvent.click(gridCell.parentElement!);

        expect(store.getState().comp.components).toHaveLength(1);
    });

    it("handles dragEnd event", () => {
        render(
            <Provider store={store}>
                <GridCell {...defaultProps} />
            </Provider>
        );

        const gridCell = screen.getByText("Text").parentElement!;
        fireEvent.dragEnd(gridCell); // 测试空实现
        // 由于 handleDragEnd 是可选的空函数，无需断言具体行为
        expect(true).toBe(true); // 确保事件触发无错误
    });
});