import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import Toolbar from "../Toolbar"; // Adjust path
import compReducer from "@/store/componentSlice";
import {ActionCreators} from "redux-undo";
import {ComponentState} from "react";

// Mock useTranslation
jest.mock("@/hooks/useTranslation", () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Mock translation to return key as string
    }),
}));

// Mock LanguageSwitcher
jest.mock("@/app/components/LanguageSwitcher", () => ({
    __esModule: true,
    default: () => <div data-testid="language-switcher">LanguageSwitcher</div>,
}));

// Mock localStorage
const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => (store[key] = value)),
        clear: jest.fn(() => (store = {})),
        removeItem: jest.fn((key) => delete store[key]),
    };
})();
Object.defineProperty(window, "localStorage", {value: localStorageMock});

const store = configureStore<{ comp: ComponentState }>({
    reducer: {comp: compReducer},
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

describe("Toolbar", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch({type: ""}); // Reset state for each test
        localStorageMock.clear(); // Reset localStorage mock
    });

    it("renders toolbar with correct content", () => {
        render(
            <Provider store={store}>
                <Toolbar/>
            </Provider>
        );

        expect(screen.getByAltText("logo")).toHaveAttribute("src", "images/logo.svg");
        expect(screen.getByText("Low Code Editor")).toBeInTheDocument();
        expect(screen.getByText("start design by dragging components")).toBeInTheDocument();
        expect(screen.getByAltText("undo")).toHaveAttribute("src", "images/undo.svg");
        expect(screen.getByText("undo")).toBeInTheDocument();
        expect(screen.getByAltText("redo")).toHaveAttribute("src", "images/redo.svg");
        expect(screen.getByText("redo")).toBeInTheDocument();
        expect(screen.getByAltText("save")).toHaveAttribute("src", "images/save.svg");
        expect(screen.getByText("save")).toBeInTheDocument();
        expect(screen.getByTestId("preview-button")).toBeInTheDocument();
        expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
    });

    it("saves state to localStorage on save click", () => {
        render(
            <Provider store={store}>
                <Toolbar/>
            </Provider>
        );

        fireEvent.click(screen.getByText("save"));

        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            "canvasState",
            JSON.stringify([])
        );
    });

    // In your test setup
    const mockStore = {
        ...store,
        dispatch: jest.fn(),
    };

    // Then in your test
    it("dispatches undo action on undo click", () => {
        mockStore.dispatch.mockClear(); // Clear previous calls

        render(
            <Provider store={mockStore}>
                <Toolbar/>
            </Provider>
        );

        fireEvent.click(screen.getByText("undo"));

        expect(mockStore.dispatch).toHaveBeenCalledWith(ActionCreators.undo());
    });


    it("dispatches redo action on redo click", () => {
        mockStore.dispatch.mockClear(); // Clear previous calls

        render(
            <Provider store={mockStore}>
                <Toolbar/>
            </Provider>
        );

        fireEvent.click(screen.getByText("redo"));

        expect(mockStore.dispatch).toHaveBeenCalledWith(ActionCreators.redo());
    });

});