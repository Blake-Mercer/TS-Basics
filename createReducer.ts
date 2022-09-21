
interface Action<T extends string> {
    type: T;
}
interface ActionWithPayload<T extends string, P> {
    type: T
    payload?: P;
}

type ActionCreator<T extends string, P> = (...args: any) => ActionWithPayload<T, P>;

type ActionsCreators<T extends string, P> = {
    [creator: string]: ActionCreator<T, P>;
};

type ActionsUnion<T extends string, U extends any, P extends ActionsCreators<T, U>> = ReturnType<P[keyof P]>;

type ActionHandlers<T extends string, U extends any, P extends ActionsCreators<T, U>, State> = {
    [K in ReturnType<P[keyof P]>["type"]]: (
        state: State,
        action: ReturnType<P[K]>
    ) => State
};

function createAction<T extends string>(type: T): Action<T>;
function createAction<T extends string, P>(
    type: T,
    payload: P
): ActionWithPayload<T, P>;
function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}

function createReducer<P extends string, U extends string, T extends ActionsCreators<P, U>, State>(
    handlers: ActionHandlers<P, U, T, State>,
    initialState: State
) {
    return (state: State = initialState, action: ActionsUnion<P, U, T>): State => {

        if (action.type in handlers) {
            const f = handlers[action.type];
            return f(state, action);
        }

        return state;
    };
}


const SET_TOKEN_TYPE = "setToken";

const setTokenHandler: ActionHandlers<string, string, ActionsCreators<string, string>, State> = {
    [SET_TOKEN_TYPE]: ({ loginError, ...state }, action) => ({
        ...state,
        token: action.payload,
        loading: true,
        loginError: loginError
    })
}
const Actions: ActionsCreators<string, string> = {
    setToken: (token: string) => createAction(SET_TOKEN_TYPE, token)
};


type State = Readonly<{
    token?: string;
    loading: boolean;
    loginError?: string;
}>;

const initialState: State = {
    token: '',
    loading: false,
    loginError: ''

}

const tokenAction: ActionWithPayload<string, string> = {
    type: 'setToken',
    payload: 'blakesToken'
}

const reducer = createReducer(setTokenHandler, initialState)

const state = reducer(initialState, tokenAction)

console.log(state)