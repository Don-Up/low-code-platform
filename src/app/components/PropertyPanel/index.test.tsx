import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import PropertyPanel from "../PropertyPanel"; // Adjust path
import compReducer from "@/store/componentSlice";
import {ComponentState} from "react";

// Mock useTranslation
jest.mock("@/hooks/useTranslation", () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Mock translation to return key as string
    }),
}));

// Mock child PropComp components to avoid deep rendering
jest.mock("@/app/components/Canvas/components/Text/TextPropComp", () => ({
    __esModule: true,
    default: ({ text }: { text?: string }) => <div data-testid="text-prop-comp">{text}</div>,
}));

jest.mock("@/app/components/Canvas/components/Image/ImagePropComp", () => ({
    __esModule: true,
    default: ({ src }: { src?: string }) => <div data-testid="image-prop-comp">{src}</div>,
}));

jest.mock("@/app/components/Canvas/components/Button/ButtonPropComp", () => ({
    __esModule: true,
    default: ({ text }: { text?: string }) => <div data-testid="button-prop-comp">{text}</div>,
}));

jest.mock("@/app/components/Canvas/components/Input/InputPropComp", () => ({
    __esModule: true,
    default: ({ value }: { value?: string }) => <div data-testid="input-prop-comp">{value}</div>,
}));

jest.mock("@/app/components/Canvas/components/Card/CardPropComp", () => ({
    __esModule: true,
    default: () => <div data-testid="card-prop-comp">Card</div>,
}));

const store = configureStore<{comp: ComponentState}>({
    reducer: { comp: compReducer },
    preloadedState: {
        comp: {
            present: {
                components: [],
                selectedComponentId: null,
                isPreviewMode: false,
            },
        },
    },
});

describe("PropertyPanel", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch({ type: "" }); // Reset state for each test
    });

    it("renders null in preview mode", () => {
        const preloadedStore = configureStore<{comp: ComponentState}>({
            reducer: { comp: compReducer },
            preloadedState: {
                comp: {
                    present: { components: [], selectedComponentId: null, isPreviewMode: true },
                },
            },
        });

        const { container } = render(
            <Provider store={preloadedStore}>
                <PropertyPanel />
            </Provider>
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders no component selected message when selectedComponentId is null", () => {
        render(
            <Provider store={store}>
                <PropertyPanel />
            </Provider>
        );

        expect(screen.getByText("property")).toBeInTheDocument();
        expect(screen.getByText("noComponentSelected")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
    });

    it("renders selected component properties when selectedComponentId is set", () => {
        const testComponent = { id: "test-id", type: "text", text: "Test Text" };
        const preloadedStore = configureStore<{comp: ComponentState}>({
            reducer: { comp: compReducer },
            preloadedState: {
                comp: {
                    present: { components: [testComponent], selectedComponentId: "test-id", isPreviewMode: false },
                },
            },
        });

        render(
            <Provider store={preloadedStore}>
                <PropertyPanel />
            </Provider>
        );

        expect(screen.getByText("property")).toBeInTheDocument();
        expect(screen.getByTestId("text-prop-comp")).toHaveTextContent("Test Text");
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });

    it("renders correct property panel for different component types", () => {
        const testComponents = [
            { id: "text-id", type: "text", text: "Text" },
            { id: "image-id", type: "image", src: "test.jpg" },
            { id: "button-id", type: "button", text: "Button" },
            { id: "input-id", type: "input", value: "Input" },
            { id: "card-id", type: "card" },
        ];

        testComponents.forEach((component) => {
            const preloadedStore = configureStore<{comp: ComponentState}>({
                reducer: { comp: compReducer },
                preloadedState: {
                    comp: {
                        present: { components: [component], selectedComponentId: component.id, isPreviewMode: false },
                    },
                },
            });

            render(
                <Provider store={preloadedStore}>
                    <PropertyPanel />
                </Provider>
            );

            switch (component.type) {
                case "text":
                    expect(screen.getByTestId("text-prop-comp")).toHaveTextContent("Text");
                    break;
                case "image":
                    expect(screen.getByTestId("image-prop-comp")).toHaveTextContent("test.jpg");
                    break;
                case "button":
                    expect(screen.getByTestId("button-prop-comp")).toHaveTextContent("Button");
                    break;
                case "input":
                    expect(screen.getByTestId("input-prop-comp")).toHaveTextContent("Input");
                    break;
                case "card":
                    expect(screen.getByTestId("card-prop-comp")).toBeInTheDocument();
                    break;
            }
        });
    });
});