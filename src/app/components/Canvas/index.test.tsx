import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import Canvas from "../Canvas"; // Adjust path
import compReducer from "@/store/componentSlice";
import {Comp} from "@/app/components/Canvas/components/type";
import {TextPropCompDefaultProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {ImagePropCompDefaultProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import {ComponentState} from "react";

// Mock nanoid to return a fixed value for predictable testing
jest.mock("nanoid", () => ({
    nanoid: jest.fn(() => "mocked-id"),
}));

// Mock useTranslation
jest.mock("@/hooks/useTranslation", () => ({
    useTranslation: () => ({t: (key: string) => key}), // Mock translation to return key as string
}));

// Mock custom Sortable components
jest.mock("@/app/components/DragSort/SortableContainer", () => ({
    __esModule: true,
    default: ({children}: { children: React.ReactNode }) => <div data-testid="sortable-container">{children}</div>,
}));

jest.mock("@/app/components/DragSort/SortableItem", () => ({
    __esModule: true,
    default: ({children}: { children: React.ReactNode }) => <div data-testid="sortable-item">{children}</div>,
}));

// Mock child components (TextComp, ImageComp, etc.) to avoid deep rendering
jest.mock("@/app/components/Canvas/components/Text", () => ({
    __esModule: true,
    default: ({text}: { text?: string }) => <div data-testid="text-comp">{text}</div>,
}));

jest.mock("@/app/components/Canvas/components/Image", () => ({
    __esModule: true,
    default: ({src}: { src?: string }) => <div data-testid="image-comp">{src}</div>,
}));

jest.mock("@/app/components/Canvas/components/Button", () => ({
    __esModule: true,
    default: ({text}: { text?: string }) => <div data-testid="button-comp">{text}</div>,
}));

jest.mock("@/app/components/Canvas/components/Input", () => ({
    __esModule: true,
    default: ({value}: { value?: string }) => <div data-testid="input-comp">{value}</div>,
}));

jest.mock("@/app/components/Canvas/components/Card", () => ({
    __esModule: true,
    default: () => <div data-testid="card-comp">Card</div>,
}));

const store = configureStore<{ comp: ComponentState }>({
    reducer: {comp: compReducer},
    preloadedState: {
        comp: {present: {components: [], selectedComponentId: null, isPreviewMode: false}},
    },
});

describe("Canvas", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch({type: ""}); // Reset state for each test
    });

    it("clears components on mount", () => {
        render(
            <Provider store={store}>
                <Canvas/>
            </Provider>
        );
        expect(store.getState().comp.present.components).toHaveLength(0);
    });

    it("renders canvas title with translation", () => {
        render(
            <Provider store={store}>
                <Canvas/>
            </Provider>
        );
        expect(screen.getByText("canvas")).toBeInTheDocument();
    });

    it("renders components based on state", () => {
        const testComponents: Comp[] = [
            {...TextPropCompDefaultProp, id: "text-id", text: "Test Text"},
            {...ImagePropCompDefaultProp, id: "image-id", src: "test.jpg"},
        ];
        const preloadedStore = configureStore<{ comp: ComponentState }>({
            reducer: {comp: compReducer},
            preloadedState: {
                comp: {present: {components: testComponents, selectedComponentId: null, isPreviewMode: false}},
            },
        });

        render(
            <Provider store={preloadedStore}>
                <Canvas/>
            </Provider>
        );

        expect(screen.getByTestId("text-comp")).toHaveTextContent("Test Text");
        expect(screen.getByTestId("image-comp")).toHaveTextContent("test.jpg");
        expect(screen.getAllByTestId("sortable-item")).toHaveLength(2);
    });

    it("does not dispatch swapComponent in preview mode", () => {
        const preloadedStore = configureStore<{ comp: ComponentState }>({
            reducer: {comp: compReducer},
            preloadedState: {
                comp: {present: {components: [], selectedComponentId: null, isPreviewMode: true}},
            },
        });

        // Spy on the real dispatch function
        const dispatchSpy = jest.spyOn(preloadedStore, 'dispatch').mockClear();

        render(
            <Provider store={preloadedStore}>
                <Canvas/>
            </Provider>
        );

        const dragEvent = new Event("dragend") as unknown as React.DragEvent<HTMLDivElement>;
        fireEvent.dragEnd(screen.getByTestId("sortable-container"), dragEvent);

        expect(dispatchSpy).not.toHaveBeenCalledWith(
            expect.objectContaining({
                type: "comp/swapComponent",
            })
        );

        // Clean up spy
        dispatchSpy.mockRestore();
    });


    it("does not prevent default on dragOver in preview mode", () => {
        const preloadedStore = configureStore<{ comp: ComponentState }>({
            reducer: {comp: compReducer},
            preloadedState: {
                comp: {present: {components: [], selectedComponentId: null, isPreviewMode: true}},
            },
        });

        render(
            <Provider store={preloadedStore}>
                <Canvas/>
            </Provider>
        );

        const dragEvent = new Event("dragover") as unknown as React.DragEvent<HTMLDivElement>;
        Object.defineProperty(dragEvent, "preventDefault", {value: jest.fn(), writable: true});

        fireEvent.dragOver(screen.getByTestId("sortable-container"), dragEvent);

        expect(dragEvent.preventDefault).not.toHaveBeenCalled();
    });
});